import { useEffect, useState } from "react";
import {
  listarAtores,
  cadastrarAtor,
  atualizarAtor,
  deletarAtor
} from "../services/api";
import AtorForm from "../components/AtorForm";
import AtorLista from "../components/AtorLista";

function AtorPage() {
  const [atores, setAtores] = useState([]);

  const [nomeAtor, setNomeAtor] = useState("");
  const [nacionalidadeAtor, setNacionalidadeAtor] = useState("");
  const [idadeAtor, setIdadeAtor] = useState("");
  const [atorEditandoId, setAtorEditandoId] = useState(null);

  async function carregarAtores() {
    const dadosAtores = await listarAtores();
    setAtores(dadosAtores.atores);
  }

  useEffect(() => {
    carregarAtores();
  }, []);

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

    carregarAtores();
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

    carregarAtores();
  }

  return (
    <>
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
    </>
  );
}

export default AtorPage;