import {useState} from 'react';
import { FiSearch } from "react-icons/fi"; 
import './styles.css';

import api from "./services/api";


function CepBox({cep}) {
  return (
    <main className="main">
      <h2> CEP: {cep.cep}</h2>

      <span>{cep.logradouro}</span>
      <span>Complemento: {cep.complemeto}</span>
      <span>Bairro: {cep.bairro} </span>
      <span>{cep.localidade} - {cep.uf}</span>

    </main>
  );
}

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState('');

  function validarCep(cep){
    const regex = /^[0-9]+$/;

    if (cep.length === 8 && regex.test(cep))
      return true;

    return false;
  }

  async function handleSearch(){
    //01310930
    if(input === ''){
      alert("Preencha algum CEP!");
      return;
    }

    if(!validarCep(input)){
      alert("CEP inválido");
      return;
    }


    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');

    }catch{
      alert("Ops erro ao buscar");
      setInput('');
    }

  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"/>
        </button>

      </div>

      {Object.keys(cep).length > 0 && ( // If
        <CepBox cep={cep}/>
      )}

    </div>
  );
}

export default App;
