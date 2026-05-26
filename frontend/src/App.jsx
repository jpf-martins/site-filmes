import { useEffect, useState } from "react";
import {
  listarFilmes,
  listarGeneros,
  listarAtores,
  cadastrarFilme
} from "./services/api";
import "./App.css";

function App() {
  const [filmes, setFilmes] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [atores, setAtores] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [anoLancamento, setAnoLancamento] = useState("");
  const [duracaoMinutos, setDuracaoMinutos] = useState("");
  const [generoId, setGeneroId] = useState("");
  const [atorIds, setAtorIds] = useState([]);

  async function carregarDados() {
    const dadosFilmes = await listarFilmes();
    const dadosGeneros = await listarGeneros();
    const dadosAtores = await listarAtores();

    setFilmes(dadosFilmes.filmes);
    setGeneros(dadosGeneros.generos);
    setAtores(dadosAtores.atores);
  }

  useEffect(() => {
    carregarDados();
  }, []);

  function alterarAtorSelecionado(id) {
    if (atorIds.includes(id)) {
      setAtorIds(atorIds.filter((atorId) => atorId !== id));
    } else {
      setAtorIds([...atorIds, id]);
    }
  }

  async function salvarFilme(event) {
    event.preventDefault();

    const novoFilme = {
      titulo: titulo,
      ano_lancamento: Number(anoLancamento),
      duracao_minutos: Number(duracaoMinutos),
      genero_id: Number(generoId),
      ator_ids: atorIds
    };

    await cadastrarFilme(novoFilme);

    setTitulo("");
    setAnoLancamento("");
    setDuracaoMinutos("");
    setGeneroId("");
    setAtorIds([]);

    carregarDados();
  }

  return (
    <div className="container">
      <h1>API de Filmes</h1>

      <section>
        <h2>Cadastrar Filme</h2>

        <form onSubmit={salvarFilme}>
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <input
            type="number"
            placeholder="Ano de lançamento"
            value={anoLancamento}
            onChange={(e) => setAnoLancamento(e.target.value)}
          />

          <input
            type="number"
            placeholder="Duração em minutos"
            value={duracaoMinutos}
            onChange={(e) => setDuracaoMinutos(e.target.value)}
          />

          <select value={generoId} onChange={(e) => setGeneroId(e.target.value)}>
            <option value="">Selecione um gênero</option>
            {generos.map((genero) => (
              <option key={genero.id} value={genero.id}>
                {genero.nome}
              </option>
            ))}
          </select>

          <div>
            <p>Atores:</p>

            {atores.map((ator) => (
              <label key={ator.id}>
                <input
                  type="checkbox"
                  checked={atorIds.includes(ator.id)}
                  onChange={() => alterarAtorSelecionado(ator.id)}
                />
                {ator.nome}
              </label>
            ))}
          </div>

          <button type="submit">Cadastrar Filme</button>
        </form>
      </section>

      <section>
        <h2>Filmes cadastrados</h2>

        {filmes.length === 0 ? (
          <p>Nenhum filme cadastrado.</p>
        ) : (
          <ul>
            {filmes.map((filme) => (
              <li key={filme.id}>
                {filme.titulo} - {filme.ano_lancamento}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;