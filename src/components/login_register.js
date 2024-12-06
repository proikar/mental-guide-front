import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login_register.css';
import googleIcon from '../images/google-icon.png';

function LogReg() {
    const navigate = useNavigate();

    const handleLogin = () => {
        // Здесь можно добавить логику для Google аутентификации
        navigate('/chat'); // Перенаправление на страницу Chat после аутентификации
    };

    return (
        <div className='mains'>
            <p>Welcome! Добро пожаловать в твой Mental Guide!</p>
            <div className='reg-btn' onClick={handleLogin}>
                <img src={googleIcon} alt='google-icon' />Continue with Google
            </div>
        </div>
    );
}

export default LogReg;
