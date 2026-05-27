import { useEffect, useState } from "react";
import {
  listarFilmes,
  cadastrarFilme,
  atualizarFilme,
  deletarFilme,
  listarGeneros,
  listarAtores
} from "../services/api";
import FilmeForm from "../components/FilmeForm";
import FilmeLista from "../components/FilmeLista";

function FilmePage() {
  const [filmes, setFilmes] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [atores, setAtores] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [anoLancamento, setAnoLancamento] = useState("");
  const [duracaoMinutos, setDuracaoMinutos] = useState("");
  const [generoId, setGeneroId] = useState("");
  const [atorIds, setAtorIds] = useState([]);
  const [filmeEditandoId, setFilmeEditandoId] = useState(null);

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

    let resposta;

    if (filmeEditandoId) {
      resposta = await atualizarFilme(filmeEditandoId, novoFilme);
    } else {
      resposta = await cadastrarFilme(novoFilme);
    }

    if (resposta.erro) {
      alert(resposta.erro);
      return;
    }

    setTitulo("");
    setAnoLancamento("");
    setDuracaoMinutos("");
    setGeneroId("");
    setAtorIds([]);
    setFilmeEditandoId(null);

    carregarDados();
  }

  function editarFilme(filme) {
    setFilmeEditandoId(filme.id);
    setTitulo(filme.titulo);
    setAnoLancamento(filme.ano_lancamento);
    setDuracaoMinutos(filme.duracao_minutos);
    setGeneroId(filme.genero_id);
    setAtorIds(filme.ator_ids);
  }

  async function excluirFilme(id) {
    const resposta = await deletarFilme(id);

    if (resposta.erro) {
      alert(resposta.erro);
      return;
    }

    carregarDados();
  }

  return (
    <>
      <FilmeForm
        titulo={titulo}
        setTitulo={setTitulo}
        anoLancamento={anoLancamento}
        setAnoLancamento={setAnoLancamento}
        duracaoMinutos={duracaoMinutos}
        setDuracaoMinutos={setDuracaoMinutos}
        generoId={generoId}
        setGeneroId={setGeneroId}
        atorIds={atorIds}
        generos={generos}
        atores={atores}
        alterarAtorSelecionado={alterarAtorSelecionado}
        salvarFilme={salvarFilme}
        filmeEditandoId={filmeEditandoId}
      />

      <FilmeLista
        filmes={filmes}
        excluirFilme={excluirFilme}
        editarFilme={editarFilme}
      />
    </>
  );
}

export default FilmePage;