import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PointsStore() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 創建動態 API 實例
  const getApiInstance = () => {
    return axios.create({
      baseURL: 'http://localhost:5001/api',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const api = getApiInstance();
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (err) {
        setError('無法載入商品列表');
      }
    };

    const fetchUserPoints = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }
        
        const api = getApiInstance();
        const response = await api.get('/auth/me');
        setUserPoints(response.data.user.points);
      } catch (err) {
        console.error('無法載入用戶點數:', err);
        setError('無法載入用戶資訊');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    fetchUserPoints();
  }, []);

  const handleRedeem = async (productId, pointsRequired) => {
    if (userPoints < pointsRequired) {
      setError('點數不足！');
      return;
    }

    try {
      setError('');
      setSuccess('');
      
      const api = getApiInstance();
      const response = await api.post('/products/redeem', { productId });
      
      setSuccess(response.data.message);
      setUserPoints(response.data.remainingPoints);
      
      // 更新商品庫存
      setProducts(products.map(product => 
        product.id === productId 
          ? { ...product, stock: product.stock - 1 }
          : product
      ));
      
    } catch (err) {
      setError(err.response?.data?.message || '兌換失敗');
    }
  };

  const handleBuyPoints = async (amount, points) => {
    try {
      setError('');
      const api = getApiInstance();
      const response = await api.post('/linepay/request', {
        amount: amount,
        pointsToAdd: points
      });
      
      if (response.data.success) {
        // 重導向到 Line Pay 支付頁面
        window.location.href = response.data.paymentUrl;
      } else {
        setError('支付請求失敗');
      }
    } catch (err) {
      setError(err.response?.data?.message || '支付請求失敗');
    }
  };

  if (loading) {
    return <div className="loading">載入中...</div>;
  }

  return (
    <div className="points-store">
      <div className="store-header">
        <div className="header-left">
          <button 
            className="back-button"
            onClick={() => navigate('/tasks')}
          >
            ← 回到任務行事曆
          </button>
          <h2>點數商店</h2>
        </div>
        <div className="user-points">
          <span>我的點數: {userPoints} 點</span>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {/* 購買點數區域 */}
      <div className="buy-points-section">
        <h3>購買點數</h3>
        <div className="points-packages">
          <div className="package" onClick={() => handleBuyPoints(100, 100)}>
            <h4>100 點數</h4>
            <p>NT$ 100</p>
            <button>購買</button>
          </div>
          <div className="package" onClick={() => handleBuyPoints(500, 550)}>
            <h4>550 點數</h4>
            <p>NT$ 500 (贈送50點)</p>
            <button>購買</button>
          </div>
          <div className="package" onClick={() => handleBuyPoints(1000, 1200)}>
            <h4>1200 點數</h4>
            <p>NT$ 1000 (贈送200點)</p>
            <button>購買</button>
          </div>
        </div>
      </div>

      {/* 商品列表 */}
      <div className="products-section">
        <h3>兌換商品</h3>
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.imageUrl} alt={product.name} />
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <div className="product-info">
                <span className="points-required">{product.pointsRequired} 點</span>
                <span className="stock">庫存: {product.stock}</span>
              </div>
              <button 
                onClick={() => handleRedeem(product.id, product.pointsRequired)}
                disabled={userPoints < product.pointsRequired || product.stock === 0}
                className={userPoints < product.pointsRequired ? 'disabled' : ''}
              >
                {product.stock === 0 ? '已售完' : 
                 userPoints < product.pointsRequired ? '點數不足' : '兌換'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .points-store {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .store-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #eee;
        }
        
        .header-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        
        .back-button {
          background: #2196F3;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s;
        }
        
        .back-button:hover {
          background: #1976D2;
          transform: translateY(-1px);
        }
        
        .user-points {
          background: #4CAF50;
          color: white;
          padding: 10px 20px;
          border-radius: 20px;
          font-weight: bold;
        }
        
        .buy-points-section {
          margin-bottom: 40px;
        }
        
        .points-packages {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        
        .package {
          border: 2px solid #ddd;
          border-radius: 10px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .package:hover {
          border-color: #4CAF50;
          transform: translateY(-2px);
        }
        
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        
        .product-card {
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 20px;
          text-align: center;
          transition: all 0.3s;
        }
        
        .product-card:hover {
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .product-card img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 5px;
          margin-bottom: 10px;
        }
        
        .product-info {
          display: flex;
          justify-content: space-between;
          margin: 10px 0;
        }
        
        .points-required {
          color: #FF9800;
          font-weight: bold;
        }
        
        .stock {
          color: #666;
        }
        
        button {
          background: #4CAF50;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          width: 100%;
          margin-top: 10px;
        }
        
        button:hover {
          background: #45a049;
        }
        
        button.disabled, button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        
        .error-message {
          background: #f44336;
          color: white;
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 20px;
        }
        
        .success-message {
          background: #4CAF50;
          color: white;
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 20px;
        }
        
        .loading {
          text-align: center;
          padding: 50px;
          font-size: 18px;
        }
      `}</style>
    </div>
  );
}

export default PointsStore; 