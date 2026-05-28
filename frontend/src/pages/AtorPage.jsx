import { useEffect, useState } from "react";
import {
  listarAtores,
  cadastrarAtor,
  atualizarAtor,
  deletarAtor
} from "../services/api";
import AtorForm from "../components/AtorForm";
import AtorLista from "../components/AtorLista";

function AtorPage({ mostrarToast }) {
  const [atores, setAtores] = useState([]);

  const [nomeAtor, setNomeAtor] = useState("");
  const [nacionalidadeAtor, setNacionalidadeAtor] = useState("");
  const [idadeAtor, setIdadeAtor] = useState("");
  const [atorEditandoId, setAtorEditandoId] = useState(null);

  async function carregarAtores() {
    // Mantém a lista de atores sincronizada com a API.
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

    const editando = Boolean(atorEditandoId);

    if (editando) {
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

    mostrarToast(editando ? "Ator atualizado com sucesso." : "Ator cadastrado com sucesso.");
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

    mostrarToast("Ator excluído com sucesso.");
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
