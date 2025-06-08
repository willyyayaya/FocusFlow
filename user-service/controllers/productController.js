const { Product, Redemption, User } = require('../models');

// 取得所有商品
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { isActive: true },
      order: [['pointsRequired', 'ASC']]
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Fetch products failed', error: err.message });
  }
};

// 新增商品 (管理員功能)
exports.createProduct = async (req, res) => {
  const { name, description, pointsRequired, stock, imageUrl } = req.body;
  try {
    const product = await Product.create({
      name,
      description,
      pointsRequired,
      stock,
      imageUrl
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Create product failed', error: err.message });
  }
};

// 兌換商品
exports.redeemProduct = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;
  
  try {
    // 取得用戶和商品資訊
    const user = await User.findByPk(userId);
    const product = await Product.findByPk(productId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (!product || !product.isActive) {
      return res.status(404).json({ message: 'Product not found or inactive' });
    }
    
    // 檢查庫存
    if (product.stock <= 0) {
      return res.status(400).json({ message: 'Product out of stock' });
    }
    
    // 檢查用戶點數是否足夠
    if (user.points < product.pointsRequired) {
      return res.status(400).json({ 
        message: 'Insufficient points',
        required: product.pointsRequired,
        current: user.points
      });
    }
    
    // 執行兌換
    await user.update({ points: user.points - product.pointsRequired });
    await product.update({ stock: product.stock - 1 });
    
    // 建立兌換記錄
    const redemption = await Redemption.create({
      userId,
      productId,
      pointsUsed: product.pointsRequired,
      status: 'completed'
    });
    
    res.json({
      message: 'Product redeemed successfully',
      redemption,
      remainingPoints: user.points - product.pointsRequired
    });
    
  } catch (err) {
    res.status(500).json({ message: 'Redemption failed', error: err.message });
  }
};

// 取得用戶兌換記錄
exports.getUserRedemptions = async (req, res) => {
  const userId = req.user.id;
  
  try {
    const redemptions = await Redemption.findAll({
      where: { userId },
      include: [{
        model: Product,
        attributes: ['name', 'description', 'imageUrl']
      }],
      order: [['redemptionDate', 'DESC']]
    });
    
    res.json(redemptions);
  } catch (err) {
    res.status(500).json({ message: 'Fetch redemptions failed', error: err.message });
  }
};

// 取得所有兌換記錄 (管理員功能)
exports.getAllRedemptions = async (req, res) => {
  try {
    const redemptions = await Redemption.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Product,
          attributes: ['name', 'description']
        }
      ],
      order: [['redemptionDate', 'DESC']]
    });
    
    res.json(redemptions);
  } catch (err) {
    res.status(500).json({ message: 'Fetch all redemptions failed', error: err.message });
  }
}; 