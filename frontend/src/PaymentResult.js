import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function PaymentResult() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const points = searchParams.get('points');
    const error = searchParams.get('message');
    
    if (points) {
      setIsSuccess(true);
      setMessage(`恭喜！您已成功購買 ${points} 點數！`);
    } else if (error) {
      setIsSuccess(false);
      setMessage(`支付失敗：${error}`);
    } else {
      setIsSuccess(false);
      setMessage('支付已取消');
    }
  }, [searchParams]);

  const handleGoBack = () => {
    navigate('/store');
  };

  const handleGoToTasks = () => {
    navigate('/tasks');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div style={{
        background: isSuccess ? '#4CAF50' : '#f44336',
        color: 'white',
        padding: '40px',
        borderRadius: '10px',
        maxWidth: '500px',
        width: '100%'
      }}>
        <h2>{isSuccess ? '✅ 支付成功' : '❌ 支付失敗'}</h2>
        <p style={{ fontSize: '18px', margin: '20px 0' }}>{message}</p>
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={handleGoBack}
            style={{
              background: 'white',
              color: isSuccess ? '#4CAF50' : '#f44336',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            返回商店
          </button>
          
          <button 
            onClick={handleGoToTasks}
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '2px solid white',
              padding: '12px 24px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            回到任務
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentResult; 