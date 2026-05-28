import { useEffect, useState } from "react";
import {
  listarFilmes,
  cadastrarFilme,
  atualizarFilme,
  deletarFilme,
  listarGeneros,
  listarAtores,
  listarAvaliacoes
} from "../services/api";
import FilmeForm from "../components/FilmeForm";
import FilmeLista from "../components/FilmeLista";

function FilmePage() {
  const [filmes, setFilmes] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [atores, setAtores] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [anoLancamento, setAnoLancamento] = useState("");
  const [duracaoMinutos, setDuracaoMinutos] = useState("");
  const [generoId, setGeneroId] = useState("");
  const [atorIds, setAtorIds] = useState([]);
  const [filmeEditandoId, setFilmeEditandoId] = useState(null);

  const [buscaTitulo, setBuscaTitulo] = useState("");
  const [filtroGeneroId, setFiltroGeneroId] = useState("");
  const [filtroAtorId, setFiltroAtorId] = useState("");
  const [filtroAno, setFiltroAno] = useState("");

  const [filtrosAplicados, setFiltrosAplicados] = useState({
    titulo: "",
    generoId: "",
    atorId: "",
    ano: ""
  });

  async function carregarDados() {
    const dadosFilmes = await listarFilmes();
    const dadosGeneros = await listarGeneros();
    const dadosAtores = await listarAtores();
    const dadosAvaliacoes = await listarAvaliacoes();

    setFilmes(dadosFilmes.filmes);
    setGeneros(dadosGeneros.generos);
    setAtores(dadosAtores.atores);
    setAvaliacoes(dadosAvaliacoes.avaliacoes);
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

  function pesquisarFilmes(event) {
    event.preventDefault();

    setFiltrosAplicados({
      titulo: buscaTitulo,
      generoId: filtroGeneroId,
      atorId: filtroAtorId,
      ano: filtroAno
    });
  }

  function limparFiltros() {
    setBuscaTitulo("");
    setFiltroGeneroId("");
    setFiltroAtorId("");
    setFiltroAno("");

    setFiltrosAplicados({
      titulo: "",
      generoId: "",
      atorId: "",
      ano: ""
    });
  }

  const anosDisponiveis = [...new Set(filmes.map((filme) => filme.ano_lancamento))]
    .sort((a, b) => b - a);

  const filmesFiltrados = filmes.filter((filme) => {
    const tituloConfere = filme.titulo
      .toLowerCase()
      .includes(filtrosAplicados.titulo.toLowerCase());

    const generoConfere =
      filtrosAplicados.generoId === "" ||
      filme.genero_id === Number(filtrosAplicados.generoId);

    const atorConfere =
      filtrosAplicados.atorId === "" ||
      filme.ator_ids.includes(Number(filtrosAplicados.atorId));

    const anoConfere =
      filtrosAplicados.ano === "" ||
      filme.ano_lancamento === Number(filtrosAplicados.ano);

    return tituloConfere && generoConfere && atorConfere && anoConfere;
  });

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
        filmes={filmesFiltrados}
        generos={generos}
        atores={atores}
        avaliacoes={avaliacoes}
        anosDisponiveis={anosDisponiveis}
        buscaTitulo={buscaTitulo}
        setBuscaTitulo={setBuscaTitulo}
        filtroGeneroId={filtroGeneroId}
        setFiltroGeneroId={setFiltroGeneroId}
        filtroAtorId={filtroAtorId}
        setFiltroAtorId={setFiltroAtorId}
        filtroAno={filtroAno}
        setFiltroAno={setFiltroAno}
        pesquisarFilmes={pesquisarFilmes}
        limparFiltros={limparFiltros}
        excluirFilme={excluirFilme}
        editarFilme={editarFilme}
      />
    </>
  );
}

export default FilmePage;