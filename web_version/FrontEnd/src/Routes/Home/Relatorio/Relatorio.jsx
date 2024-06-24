import { useState } from 'react';
import RelatorioAbast from './RelatorioAbast/RelatorioAbast';
import RelatorioGeral from './RelatorioGeral/RelatorioGeral';
import RelatorioManu from './RelatorioManut/RelatorioManu';
import './Relatorio.css';

const Relatorio = () => {
    const token = localStorage.getItem('token');
    const [activeTab, setActiveTab] = useState('historico'); // Definindo 'abastecimento' como o estado inicial

    const renderTabContent = () => {
        switch (activeTab) {
          case 'abastecimento':
            return <RelatorioAbast/>;
          case 'manutencao':
            return <RelatorioManu/>;
          case 'historico':
            return <RelatorioGeral/>;
          default:
            return null;
        }
    };

    return (
        <div className="main-content">
            <div className="container">
                <div className="tab-wrapper">
                    <div className="tab-header">
                        <button onClick={() => setActiveTab('historico')} className={activeTab === 'historico' ? 'active' : ''}>Geral</button>
                        <button onClick={() => setActiveTab('abastecimento')} className={activeTab === 'abastecimento' ? 'active' : ''}>Abastecimento</button>
                        <button onClick={() => setActiveTab('manutencao')} className={activeTab === 'manutencao' ? 'active' : ''}>Manutenção</button>
                        <div className="underline"></div>
                    </div>
                    <div className="tab-body">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Relatorio;