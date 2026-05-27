import { useEffect, useState } from "react";
import {
  listarGeneros,
  cadastrarGenero,
  atualizarGenero,
  deletarGenero
} from "../services/api";
import GeneroForm from "../components/GeneroForm";
import GeneroLista from "../components/GeneroLista";

function GeneroPage() {
  const [generos, setGeneros] = useState([]);

  const [nomeGenero, setNomeGenero] = useState("");
  const [descricaoGenero, setDescricaoGenero] = useState("");
  const [generoEditandoId, setGeneroEditandoId] = useState(null);

  async function carregarGeneros() {
    const dadosGeneros = await listarGeneros();
    setGeneros(dadosGeneros.generos);
  }

  useEffect(() => {
    carregarGeneros();
  }, []);

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

    carregarGeneros();
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

    carregarGeneros();
  }

  return (
    <>
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
    </>
  );
}

export default GeneroPage;