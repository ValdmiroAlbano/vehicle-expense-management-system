import React from 'react';
import './PageError.css'
import Image from '../../assets/constr.jpg'


const PageError = () => {
    return (
        <div>
            <div className="main-content error" style={{background: '#fff'}}>
                <h1>Página em manuntenção</h1>
                <p>Por favor verifique o link</p>
            </div>
        </div>
    );
}

export default PageError;
