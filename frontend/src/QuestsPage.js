import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function QuestsPage() {
  const navigate = useNavigate();
  const [quests, setQuests] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [userAchievements, setUserAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('quests');

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
    const fetchData = async () => {
      try {
        const api = getApiInstance();
        
        // 獲取今日任務
        const questsResponse = await api.get('/quests/today');
        setQuests(questsResponse.data);
        
        // 獲取所有成就
        const achievementsResponse = await api.get('/achievements');
        setAchievements(achievementsResponse.data);
        
        // 獲取用戶已解鎖的成就
        const userAchievementsResponse = await api.get('/achievements/unlocked');
        setUserAchievements(userAchievementsResponse.data);
        
      } catch (err) {
        setError('無法載入任務和成就資料');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return '#9E9E9E';
      case 'rare': return '#2196F3';
      case 'epic': return '#9C27B0';
      case 'legendary': return '#FF9800';
      default: return '#9E9E9E';
    }
  };

  if (loading) {
    return <div className="loading">載入中...</div>;
  }

  return (
    <div className="quests-page">
      <div className="page-header">
        <div className="header-left">
          <button 
            className="back-button"
            onClick={() => navigate('/tasks')}
          >
            ← 回到任務行事曆
          </button>
          <h2>每日任務與成就</h2>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {/* 標籤切換 */}
      <div className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === 'quests' ? 'active' : ''}`}
          onClick={() => setActiveTab('quests')}
        >
          每日任務
        </button>
        <button 
          className={`tab-button ${activeTab === 'achievements' ? 'active' : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          成就系統
        </button>
      </div>

      {/* 每日任務 */}
      {activeTab === 'quests' && (
        <div className="quests-section">
          <h3>今日任務</h3>
          <div className="quests-grid">
            {quests.map(quest => (
              <div key={quest.id} className={`quest-card ${quest.isCompleted ? 'completed' : ''}`}>
                <div className="quest-header">
                  <h4>{quest.DailyQuest.title}</h4>
                  <span className="reward-points">+{quest.DailyQuest.rewardPoints} 點</span>
                </div>
                <p className="quest-description">{quest.DailyQuest.description}</p>
                
                <div className="progress-section">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${getProgressPercentage(quest.currentProgress, quest.DailyQuest.targetCount)}%` 
                      }}
                    ></div>
                  </div>
                  <span className="progress-text">
                    {quest.currentProgress} / {quest.DailyQuest.targetCount}
                  </span>
                </div>
                
                {quest.isCompleted && (
                  <div className="completed-badge">✅ 已完成</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 成就系統 */}
      {activeTab === 'achievements' && (
        <div className="achievements-section">
          <h3>成就列表</h3>
          
          {/* 已解鎖的成就 */}
          {userAchievements.length > 0 && (
            <div className="unlocked-achievements">
              <h4>已解鎖成就</h4>
              <div className="achievements-grid">
                {userAchievements.map(userAchievement => (
                  <div key={userAchievement.id} className="achievement-card unlocked">
                    <div className="achievement-icon">
                      <img src={userAchievement.Achievement.iconUrl} alt={userAchievement.Achievement.title} />
                    </div>
                    <div className="achievement-info">
                      <h5 style={{ color: getRarityColor(userAchievement.Achievement.rarity) }}>
                        {userAchievement.Achievement.title}
                      </h5>
                      <p>{userAchievement.Achievement.description}</p>
                      <span className="reward">+{userAchievement.Achievement.rewardPoints} 點</span>
                      <span className="unlock-date">
                        解鎖於: {new Date(userAchievement.unlockedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 所有成就 */}
          <div className="all-achievements">
            <h4>所有成就</h4>
            <div className="achievements-grid">
              {achievements.map(achievement => {
                const userAchievement = achievement.UserAchievements?.[0];
                const isUnlocked = userAchievement?.isUnlocked || false;
                const progress = userAchievement?.currentProgress || 0;
                
                return (
                  <div key={achievement.id} className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}>
                    <div className="achievement-icon">
                      <img 
                        src={achievement.iconUrl} 
                        alt={achievement.title}
                        style={{ opacity: isUnlocked ? 1 : 0.5 }}
                      />
                    </div>
                    <div className="achievement-info">
                      <h5 style={{ color: getRarityColor(achievement.rarity) }}>
                        {achievement.title}
                      </h5>
                      <p>{achievement.description}</p>
                      <span className="reward">+{achievement.rewardPoints} 點</span>
                      
                      {!isUnlocked && (
                        <div className="progress-section">
                          <div className="progress-bar">
                            <div 
                              className="progress-fill"
                              style={{ 
                                width: `${getProgressPercentage(progress, achievement.targetValue)}%` 
                              }}
                            ></div>
                          </div>
                          <span className="progress-text">
                            {progress} / {achievement.targetValue}
                          </span>
                        </div>
                      )}
                      
                      {isUnlocked && (
                        <div className="completed-badge">🏆 已解鎖</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .quests-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .page-header {
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
        
        .tab-navigation {
          display: flex;
          margin-bottom: 30px;
          border-bottom: 1px solid #ddd;
        }
        
        .tab-button {
          background: none;
          border: none;
          padding: 15px 30px;
          cursor: pointer;
          font-size: 16px;
          border-bottom: 3px solid transparent;
          transition: all 0.3s;
        }
        
        .tab-button.active {
          border-bottom-color: #4CAF50;
          color: #4CAF50;
          font-weight: bold;
        }
        
        .tab-button:hover {
          background: #f5f5f5;
        }
        
        .quests-grid, .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        
        .quest-card, .achievement-card {
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 20px;
          transition: all 0.3s;
        }
        
        .quest-card:hover, .achievement-card:hover {
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .quest-card.completed {
          border-color: #4CAF50;
          background: #f8fff8;
        }
        
        .quest-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        
        .reward-points {
          background: #FF9800;
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: bold;
        }
        
        .quest-description {
          color: #666;
          margin-bottom: 15px;
        }
        
        .progress-section {
          margin: 15px 0;
        }
        
        .progress-bar {
          width: 100%;
          height: 8px;
          background: #eee;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 5px;
        }
        
        .progress-fill {
          height: 100%;
          background: #4CAF50;
          transition: width 0.3s;
        }
        
        .progress-text {
          font-size: 12px;
          color: #666;
        }
        
        .completed-badge {
          background: #4CAF50;
          color: white;
          padding: 5px 10px;
          border-radius: 15px;
          font-size: 12px;
          text-align: center;
          margin-top: 10px;
        }
        
        .achievement-card {
          display: flex;
          gap: 15px;
        }
        
        .achievement-card.locked {
          opacity: 0.7;
        }
        
        .achievement-card.unlocked {
          border-color: #FFD700;
          background: #fffdf0;
        }
        
        .achievement-icon img {
          width: 64px;
          height: 64px;
          border-radius: 50%;
        }
        
        .achievement-info {
          flex: 1;
        }
        
        .achievement-info h5 {
          margin: 0 0 5px 0;
          font-weight: bold;
        }
        
        .achievement-info p {
          color: #666;
          margin: 5px 0;
          font-size: 14px;
        }
        
        .reward {
          background: #4CAF50;
          color: white;
          padding: 2px 6px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: bold;
        }
        
        .unlock-date {
          display: block;
          font-size: 11px;
          color: #999;
          margin-top: 5px;
        }
        
        .unlocked-achievements {
          margin-bottom: 40px;
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

export default QuestsPage; 