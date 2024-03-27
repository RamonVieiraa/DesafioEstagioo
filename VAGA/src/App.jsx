import "./App.css";

import { useState,  } from "react";

import { useFetch } from "./hooks/useFetch";

const url = "http://localhost:3000/products";

function App() {

  const { data: items, httpConfig, loading, error } = useFetch(url);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [descricao, setDescricao] = useState("");



  // 2 - Adicionar Produtos
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
      descricao,
    };

    httpConfig(product, "POST");

    setName("");
    setPrice("");
    setDescricao("")
  };

  /* Função para remover item da lista */
  const handleRemove = (id) => {
    httpConfig(id, "DELETE");
  };

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}
      <ul>
        {items &&
          items.map((product) => (
            <li key={product.id}>
              {product.name} - R$: {product.price} {product.descricao}
              {/* Botão para excluir da lista */}
              <button onClick={() => handleRemove(product.id)}>Excluir</button>
            </li>
          ))}
      </ul>

      <div className="add-product">
        <p>Adicionar produto:</p>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o produto"
            />
          </label>
          <label>
            Preço:
            <input
              type="number"
              value={price}
              name="price"
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Digite o preço"
            />
          </label>
          <label>
            Descrição:<br></br>
            <textarea
              type="text"
              value={descricao}
              name="descricao"
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Digite a descrição"
            />
          </label>
          {loading ? <p>Aguarde!</p> : <input type="submit" value="Criar" />}
        </form>
      </div>
    </div>
  );
}

export default App;
