import { useEffect, useState } from "react";
import {
  listarUsuarios,
  cadastrarUsuario,
  atualizarUsuario,
  deletarUsuario,
  listarFilmes,
  cadastrarFilme,
  atualizarFilme,
  deletarFilme,
  listarGeneros,
  cadastrarGenero,
  atualizarGenero,
  deletarGenero,
  listarAtores,
  cadastrarAtor,
  atualizarAtor,
  deletarAtor,
  listarAvaliacoes,
  cadastrarAvaliacao,
  atualizarAvaliacao,
  deletarAvaliacao
} from "./services/api";

import UsuarioForm from "./components/UsuarioForm";
import UsuarioLista from "./components/UsuarioLista";
import GeneroForm from "./components/GeneroForm";
import GeneroLista from "./components/GeneroLista";
import AtorForm from "./components/AtorForm";
import AtorLista from "./components/AtorLista";
import FilmeForm from "./components/FilmeForm";
import FilmeLista from "./components/FilmeLista";
import AvaliacaoForm from "./components/AvaliacaoForm";
import AvaliacaoLista from "./components/AvaliacaoLista";

import "./App.css";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [filmes, setFilmes] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [atores, setAtores] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);

  const [nomeUsuario, setNomeUsuario] = useState("");
  const [emailUsuario, setEmailUsuario] = useState("");
  const [idadeUsuario, setIdadeUsuario] = useState("");
  const [usuarioEditandoId, setUsuarioEditandoId] = useState(null);

  const [nomeGenero, setNomeGenero] = useState("");
  const [descricaoGenero, setDescricaoGenero] = useState("");
  const [generoEditandoId, setGeneroEditandoId] = useState(null);

  const [nomeAtor, setNomeAtor] = useState("");
  const [nacionalidadeAtor, setNacionalidadeAtor] = useState("");
  const [idadeAtor, setIdadeAtor] = useState("");
  const [atorEditandoId, setAtorEditandoId] = useState(null);

  const [titulo, setTitulo] = useState("");
  const [anoLancamento, setAnoLancamento] = useState("");
  const [duracaoMinutos, setDuracaoMinutos] = useState("");
  const [generoId, setGeneroId] = useState("");
  const [atorIds, setAtorIds] = useState([]);
  const [filmeEditandoId, setFilmeEditandoId] = useState(null);

  const [notaAvaliacao, setNotaAvaliacao] = useState("");
  const [comentarioAvaliacao, setComentarioAvaliacao] = useState("");
  const [usuarioAvaliacaoId, setUsuarioAvaliacaoId] = useState("");
  const [filmeAvaliacaoId, setFilmeAvaliacaoId] = useState("");
  const [avaliacaoEditandoId, setAvaliacaoEditandoId] = useState(null);

  async function carregarDados() {
    const dadosUsuarios = await listarUsuarios();
    const dadosFilmes = await listarFilmes();
    const dadosGeneros = await listarGeneros();
    const dadosAtores = await listarAtores();
    const dadosAvaliacoes = await listarAvaliacoes();

    setUsuarios(dadosUsuarios.usuarios);
    setFilmes(dadosFilmes.filmes);
    setGeneros(dadosGeneros.generos);
    setAtores(dadosAtores.atores);
    setAvaliacoes(dadosAvaliacoes.avaliacoes);
  }

  useEffect(() => {
    carregarDados();
  }, []);

  async function salvarUsuario(event) {
    event.preventDefault();

    const novoUsuario = {
      nome: nomeUsuario,
      email: emailUsuario,
      idade: Number(idadeUsuario)
    };

    let resposta;

    if (usuarioEditandoId) {
      resposta = await atualizarUsuario(usuarioEditandoId, novoUsuario);
    } else {
      resposta = await cadastrarUsuario(novoUsuario);
    }

    if (resposta.erro) {
      alert(resposta.erro);
      return;
    }

    setNomeUsuario("");
    setEmailUsuario("");
    setIdadeUsuario("");
    setUsuarioEditandoId(null);

    carregarDados();
  }

  function editarUsuario(usuario) {
    setUsuarioEditandoId(usuario.id);
    setNomeUsuario(usuario.nome);
    setEmailUsuario(usuario.email);
    setIdadeUsuario(usuario.idade);
  }

  async function excluirUsuario(id) {
    const resposta = await deletarUsuario(id);

    if (resposta.erro) {
      alert(resposta.erro);
      return;
    }

    carregarDados();
  }

  async function salvarGenero(event) {
    event.preventDefault();

    const novoGenero = {
      nome: nomeGenero,
      descricao: descricaoGenero
    };

    let resposta;

    if (generoEditandoId) {
      resposta = await atualizarGenero(generoEditandoId, novoGenero);
    } else {
      resposta = await cadastrarGenero(novoGenero);
    }

    if (resposta.erro) {
      alert(resposta.erro);
      return;
    }

    setNomeGenero("");
    setDescricaoGenero("");
    setGeneroEditandoId(null);

    carregarDados();
  }

  function editarGenero(genero) {
    setGeneroEditandoId(genero.id);
    setNomeGenero(genero.nome);
    setDescricaoGenero(genero.descricao);
  }

  async function excluirGenero(id) {
    const resposta = await deletarGenero(id);

    if (resposta.erro) {
      alert(resposta.erro);
      return;
    }

    carregarDados();
  }

  async function salvarAtor(event) {
    event.preventDefault();

    const novoAtor = {
      nome: nomeAtor,
      nacionalidade: nacionalidadeAtor,
      idade: Number(idadeAtor)
    };

    let resposta;

    if (atorEditandoId) {
      resposta = await atualizarAtor(atorEditandoId, novoAtor);
    } else {
      resposta = await cadastrarAtor(novoAtor);
    }

    if (resposta.erro) {
      alert(resposta.erro);
      return;
    }

    setNomeAtor("");
    setNacionalidadeAtor("");
    setIdadeAtor("");
    setAtorEditandoId(null);

    carregarDados();
  }

  function editarAtor(ator) {
    setAtorEditandoId(ator.id);
    setNomeAtor(ator.nome);
    setNacionalidadeAtor(ator.nacionalidade);
    setIdadeAtor(ator.idade);
  }

  async function excluirAtor(id) {
    const resposta = await deletarAtor(id);

    if (resposta.erro) {
      alert(resposta.erro);
      return;
    }

    carregarDados();
  }

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

  async function salvarAvaliacao(event) {
    event.preventDefault();

    const novaAvaliacao = {
      nota: Number(notaAvaliacao),
      comentario: comentarioAvaliacao,
      usuario_id: Number(usuarioAvaliacaoId),
      filme_id: Number(filmeAvaliacaoId)
    };

    let resposta;

    if (avaliacaoEditandoId) {
      resposta = await atualizarAvaliacao(avaliacaoEditandoId, novaAvaliacao);
    } else {
      resposta = await cadastrarAvaliacao(novaAvaliacao);
    }

    if (resposta.erro) {
      alert(resposta.erro);
      return;
    }

    setNotaAvaliacao("");
    setComentarioAvaliacao("");
    setUsuarioAvaliacaoId("");
    setFilmeAvaliacaoId("");
    setAvaliacaoEditandoId(null);

    carregarDados();
  }

  function editarAvaliacao(avaliacao) {
    setAvaliacaoEditandoId(avaliacao.id);
    setNotaAvaliacao(avaliacao.nota);
    setComentarioAvaliacao(avaliacao.comentario);
    setUsuarioAvaliacaoId(avaliacao.usuario_id);
    setFilmeAvaliacaoId(avaliacao.filme_id);
  }

  async function excluirAvaliacao(id) {
    const resposta = await deletarAvaliacao(id);

    if (resposta.erro) {
      alert(resposta.erro);
      return;
    }

    carregarDados();
  }

  return (
    <div className="container">
      <h1>API de Filmes</h1>

      <UsuarioForm
        nomeUsuario={nomeUsuario}
        setNomeUsuario={setNomeUsuario}
        emailUsuario={emailUsuario}
        setEmailUsuario={setEmailUsuario}
        idadeUsuario={idadeUsuario}
        setIdadeUsuario={setIdadeUsuario}
        salvarUsuario={salvarUsuario}
        usuarioEditandoId={usuarioEditandoId}
      />

      <UsuarioLista
        usuarios={usuarios}
        editarUsuario={editarUsuario}
        excluirUsuario={excluirUsuario}
      />

      <GeneroForm
        nomeGenero={nomeGenero}
        setNomeGenero={setNomeGenero}
        descricaoGenero={descricaoGenero}
        setDescricaoGenero={setDescricaoGenero}
        salvarGenero={salvarGenero}
        generoEditandoId={generoEditandoId}
      />

      <GeneroLista
        generos={generos}
        editarGenero={editarGenero}
        excluirGenero={excluirGenero}
      />

      <AtorForm
        nomeAtor={nomeAtor}
        setNomeAtor={setNomeAtor}
        nacionalidadeAtor={nacionalidadeAtor}
        setNacionalidadeAtor={setNacionalidadeAtor}
        idadeAtor={idadeAtor}
        setIdadeAtor={setIdadeAtor}
        salvarAtor={salvarAtor}
        atorEditandoId={atorEditandoId}
      />

      <AtorLista
        atores={atores}
        editarAtor={editarAtor}
        excluirAtor={excluirAtor}
      />

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

      <AvaliacaoForm
        notaAvaliacao={notaAvaliacao}
        setNotaAvaliacao={setNotaAvaliacao}
        comentarioAvaliacao={comentarioAvaliacao}
        setComentarioAvaliacao={setComentarioAvaliacao}
        usuarioAvaliacaoId={usuarioAvaliacaoId}
        setUsuarioAvaliacaoId={setUsuarioAvaliacaoId}
        filmeAvaliacaoId={filmeAvaliacaoId}
        setFilmeAvaliacaoId={setFilmeAvaliacaoId}
        usuarios={usuarios}
        filmes={filmes}
        salvarAvaliacao={salvarAvaliacao}
        avaliacaoEditandoId={avaliacaoEditandoId}
      />

      <AvaliacaoLista
        avaliacoes={avaliacoes}
        usuarios={usuarios}
        filmes={filmes}
        editarAvaliacao={editarAvaliacao}
        excluirAvaliacao={excluirAvaliacao}
      />
    </div>
  );
}

export default App;