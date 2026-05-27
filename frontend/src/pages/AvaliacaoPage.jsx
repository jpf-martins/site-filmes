import { useEffect, useState } from "react";
import {
  listarAvaliacoes,
  cadastrarAvaliacao,
  atualizarAvaliacao,
  deletarAvaliacao,
  listarUsuarios,
  listarFilmes
} from "../services/api";
import AvaliacaoForm from "../components/AvaliacaoForm";
import AvaliacaoLista from "../components/AvaliacaoLista";

function AvaliacaoPage({ usuarioLogado }) {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [filmes, setFilmes] = useState([]);

  const [notaAvaliacao, setNotaAvaliacao] = useState("");
  const [comentarioAvaliacao, setComentarioAvaliacao] = useState("");
  const [filmeAvaliacaoId, setFilmeAvaliacaoId] = useState("");
  const [avaliacaoEditandoId, setAvaliacaoEditandoId] = useState(null);

  async function carregarDados() {
    const dadosAvaliacoes = await listarAvaliacoes();
    const dadosUsuarios = await listarUsuarios();
    const dadosFilmes = await listarFilmes();

    const avaliacoesDoUsuario = dadosAvaliacoes.avaliacoes.filter(
      (avaliacao) => avaliacao.usuario_id === usuarioLogado.id
    );

    setAvaliacoes(avaliacoesDoUsuario);
    setUsuarios(dadosUsuarios.usuarios);
    setFilmes(dadosFilmes.filmes);
  }

  useEffect(() => {
    carregarDados();
  }, []);

  async function salvarAvaliacao(event) {
    event.preventDefault();

    const notaConvertida = Number(notaAvaliacao);

    if (notaConvertida < 0 || notaConvertida > 10) {
      alert("A nota deve estar entre 0 e 10.");
      return;
    }

    const novaAvaliacao = {
      nota: notaConvertida,
      comentario: comentarioAvaliacao,
      usuario_id: usuarioLogado.id,
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
    setFilmeAvaliacaoId("");
    setAvaliacaoEditandoId(null);

    carregarDados();
  }

  function editarAvaliacao(avaliacao) {
    setAvaliacaoEditandoId(avaliacao.id);
    setNotaAvaliacao(avaliacao.nota);
    setComentarioAvaliacao(avaliacao.comentario);
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
    <>
      <AvaliacaoForm
        notaAvaliacao={notaAvaliacao}
        setNotaAvaliacao={setNotaAvaliacao}
        comentarioAvaliacao={comentarioAvaliacao}
        setComentarioAvaliacao={setComentarioAvaliacao}
        filmeAvaliacaoId={filmeAvaliacaoId}
        setFilmeAvaliacaoId={setFilmeAvaliacaoId}
        filmes={filmes}
        salvarAvaliacao={salvarAvaliacao}
        avaliacaoEditandoId={avaliacaoEditandoId}
        usuarioLogado={usuarioLogado}
      />

      <AvaliacaoLista
        avaliacoes={avaliacoes}
        usuarios={usuarios}
        filmes={filmes}
        editarAvaliacao={editarAvaliacao}
        excluirAvaliacao={excluirAvaliacao}
      />
    </>
  );
}

export default AvaliacaoPage;