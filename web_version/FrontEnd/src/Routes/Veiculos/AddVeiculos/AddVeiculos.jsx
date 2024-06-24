import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";
import "./AddVeiculos.css";

const AddVeiculos = ({ closeModal }) => {
  const token = localStorage.getItem('token');

  const [Marca, setMarca] = useState("");
  const [Modelo, setModelo] = useState("");
  const [DataUltimaManutencao, setDataManutencao] = useState("");
  const [Ano, setAno] = useState("");
  const [Placa, setPlaca] = useState("");
  const [QuilometragemAtual, setQuilometragem] = useState("");
  const [CombustivelAtual, setCombustivel] = useState("");
  const [Status, setStatus] = useState("");
  const [CapacidadeTanque, setCapacidadeTanque] = useState("");
  const [TipoCombustivel, setTipoCombustivel] = useState("");
  const [listaVeiculo, setListaVeiculo] = useState([]);

  //estado de erros
  const [erroMarca, setErrorMarca] = useState("");
  const [erroModelo, setErrorModelo] = useState("");
  const [erroDataManutencao, setErrorDataManutencao] = useState("");
  const [erroAno, setErrorAno] = useState("");
  const [erroPlaca, setErrorPlaca] = useState("");
  const [erroQuilometragem, setErrorQuilometragem] = useState("");
  const [erroCombustivel, setErrorCombustivel] = useState("");
  const [erroStatus, setErrorStatus] = useState("");
  const [erroCapacidadeTanque, setErrorCapacidadeTanque] = useState("");
  const [erroTipoCombustivel, setErrorTipoCombustivel] = useState("");

  function notificacao(tipo, message) {
    toast[tipo](message, {
      hideProgressBar: true,
      onClose: () => {
        window.location.reload();
        closeModal();
      },
    });
  }

  useEffect(() => {
    const pegarListaVeiculo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/ALL_veiculos", {headers: { 'Authorization': `Bearer ${token}`}}
        );
        setListaVeiculo(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    pegarListaVeiculo();
  }, []);

  const preencherFormulario = () => {
    const veiculo = listaVeiculo.find(
      (v) => v.marca === Marca && v.modelo === Modelo
    );
    if (veiculo) {
      setDataManutencao(veiculo.dataUltimaManutencao || "");
      setAno(veiculo.ano || "");
      setPlaca(veiculo.placa || "");
      setQuilometragem(veiculo.quilometragemPorLitro || "");
      setCombustivel(veiculo.combustivelAtual || "");
      setCapacidadeTanque(veiculo.capacidadeTanque || "");
      setTipoCombustivel(veiculo.tipoCombustivel || "");
    }
  };

  const marcaChange = (e) => {
    const selectMarca = e.target.value;
    setMarca(selectMarca);
    const selectModel = listaVeiculo
      .filter((veiculo) => veiculo.marca === selectMarca)
      .map((veiculo) => veiculo.modelo);
    if (selectModel.length > 0) {
      setModelo(selectModel[0]);
      preencherFormulario(); 
    }
  };

  const handleModeloChange = (e) => {
    setModelo(e.target.value);
    preencherFormulario(); 
  };

  async function addVeiculo(e) {
    e.preventDefault();

    setErrorMarca("");
    setErrorModelo("");
    setErrorDataManutencao("");
    setErrorAno("");
    setErrorPlaca("");
    setErrorQuilometragem("");
    setErrorCombustivel("");
    setErrorStatus("");
    setErrorCapacidadeTanque("");
    setErrorTipoCombustivel("");

    if (
      !Marca ||
      !Modelo ||
      !DataUltimaManutencao ||
      !Ano ||
      !Placa ||
      !QuilometragemAtual ||
      !CombustivelAtual ||
      !Status ||
      !CapacidadeTanque ||
      !TipoCombustivel
    ) {
      if (!Marca) setErrorMarca("Campo vazio!");
      if (!Modelo) setErrorModelo("Campo vazio!");
      if (!DataUltimaManutencao) setErrorDataManutencao("Campo vazio!");
      if (!Ano) setErrorAno("Campo vazio!");
      if (!Placa) setErrorPlaca("Campo vazio!");
      if (!QuilometragemAtual) setErrorQuilometragem("Campo vazio!");
      if (!CombustivelAtual) setErrorCombustivel("Campo vazio!");
      if (!Status) setErrorStatus("Campo vazio!");
      if (!CapacidadeTanque) setErrorCapacidadeTanque("Campo vazio!");
      if (!TipoCombustivel) setErrorTipoCombustivel("Campo vazio!");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/administrador/adicionar-veiculo",
        {
          Marca,
          Modelo,
          Ano,
          Placa,
          QuilometragemAtual,
          DataUltimaManutencao,
          Status,
          CombustivelAtual,
          TipoCombustivel,
          CapacidadeTanque,
        },
        {headers: { 'Authorization': `Bearer ${token}`}}
      );
      notificacao("success", "Veiculo cadastrado com sucesso");
    } catch (error) {
      console.error("Erro ao cadastrar Veiculo:", error);
      if (error.response && error.response.status === 422) {
        toast.error(error.response.data.msg);
      } else {
        toast.error("Erro na requisição:");
      }
    }
  }

  const handClear = () => {
    setMarca("");
    setModelo("");
    setDataManutencao("");
    setAno("");
    setPlaca("");
    setQuilometragem("");
    setCombustivel("");
    setStatus("");
    setCapacidadeTanque("");
    setTipoCombustivel("");
  };

  return (
    <div className="veiculo-drop">
      <div className="veiculo-drop-start">
        <div className="veiculo-card-name">
          <div className="text-card">
            <h3>Adicionar Veículos</h3>
          </div>
          <div className="usuario-icons-close">
            <IoClose onClick={() => closeModal(false)} />
          </div>
        </div>
        <form onSubmit={addVeiculo}>
          <div className="veiculo-card-component">
            <div className="veiculo-group-select">

              <div className="usuario-card-group">
                <label>Marca</label>
                <select value={Marca} name="Marca" onChange={marcaChange}>
                  <option value="Selecionar">Selecionar...</option>
                  {Array.from(
                    new Set(listaVeiculo.map((veiculo) => veiculo.marca))
                  ).map((marca) => (
                    <option key={marca} value={marca}>
                      {marca}
                    </option>
                  ))}
                </select>
                <label className="labelError">{erroMarca}</label>
              </div>

              <div className="usuario-card-group">
                <label>Modelo</label>
                <select
                  value={Modelo}
                  name="Modelo"
                  onChange={handleModeloChange}
                >
                  <option value="Selecionar">Selecionar...</option>
                  {listaVeiculo
                    .filter((veiculo) => veiculo.marca === Marca)
                    .map((veiculo) => (
                      <option key={veiculo.modelo} value={veiculo.modelo}>
                        {veiculo.modelo}
                      </option>
                    ))}
                </select>
                <label className="labelError">{erroModelo}</label>
              </div>
              <div className="usuario-card-group">
                <label>Status</label>
                <select
                  value={Status}
                  name="Status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Selecionar">Selecionar...</option>
                  <option value="Disponível">Disponível</option>
                  <option value="Em manutenção">Em manutenção</option>
                  <option value="Fora de serviço">Fora de serviço</option>
                </select>
                <label className="labelError">{erroStatus}</label>
              </div>
              
            </div>
            <div className="usuario-card-group">
                <label>Tipo Comb.</label>
                <input
                  value={TipoCombustivel}
                  name="TipoCombustivel"
                  onChange={(e) => setTipoCombustivel(e.target.value)}
                />
                <label className="labelError">{erroTipoCombustivel}</label>
              </div>

            <div className="veiculo-group-select">
              <div className="usuario-card-group">
                <label> Comb. Atual (L)</label>
                <input
                  type="number"
                  name="CombustivelAtual"
                  value={CombustivelAtual}
                  onChange={(e) => setCombustivel(e.target.value)}
                />
                <label className="labelError">{erroCombustivel}</label>
              </div>
              <div className="usuario-card-group">
                <label>(Km/L)</label>
                <input
                  type="number"
                  name="QuilometragemAtual"
                  value={QuilometragemAtual}
                  onChange={(e) => setQuilometragem(e.target.value)}
                />
                <label className="labelError">{erroQuilometragem}</label>
              </div>

              <div className="usuario-card-group">
                <label>Cap. Tanque</label>
                <input
                  type="number"
                  name="CapacidadeTanque"
                  value={CapacidadeTanque}
                  onChange={(e) => setCapacidadeTanque(e.target.value)}
                />
                <label className="labelError">{erroCapacidadeTanque}</label>
              </div>
            </div>
            <div className="veiculo-group-two ">
            <div className="usuario-card-group">
                <label>Ano</label>
                <input
                  type="text"
                  name="Ano"
                  placeholder="Digite o ano"
                  value={Ano}
                  onChange={(e) => setAno(e.target.value)}
                />
                <label className="labelError">{erroAno}</label>
              </div>
              <div className="usuario-card-group">
                <label> Últ. Manut.</label>
                <input
                  name="DataUltimaManutencao"
                  type="date"
                  value={DataUltimaManutencao}
                  onChange={(e) => setDataManutencao(e.target.value)}
                />
                <label className="labelError">{erroDataManutencao}</label>
              </div>
            </div>
            <div className="usuario-card-group">
                <label>Placa</label>
                <input
                  type="text"
                  name="Placa"
                  placeholder="Digite a placa"
                  value={Placa}
                  onChange={(e) => setPlaca(e.target.value)}
                />
                <label className="labelError">{erroPlaca}</label>
              </div>

            <div className="buttons usuariosbtn">
              <button type="button" onClick={handClear}>
                Limpar
              </button>
              <button type="submit">Adicionar</button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default AddVeiculos;
