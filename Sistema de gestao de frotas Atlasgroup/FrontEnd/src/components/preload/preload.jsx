import { useState, useEffect } from 'react';
import './preload.css';
import LoadingImage from '../../../public/Loading_2.gif'; 

const Preload = () => {
  const [exibirImagem, setExibirTexto] = useState(true);

  useEffect(() => {
    
    const timeoutId = setTimeout(() => {
      setExibirTexto(false);
      document.getElementById("preload").style.display = "none";
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []); 

  return (
    <div className="preload" id='preload'>
      <div className="preload-container">
        {exibirImagem && <img src={LoadingImage} width={70} alt='Carregando' />}
      </div>
    </div>
  );
};

export default Preload;
