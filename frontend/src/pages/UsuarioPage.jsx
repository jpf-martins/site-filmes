import { useEffect, useState } from "react";
import {
  listarUsuarios,
  cadastrarUsuario,
  atualizarUsuario,
  deletarUsuario
} from "../services/api";
import UsuarioForm from "../components/UsuarioForm";
import UsuarioLista from "../components/UsuarioLista";

function UsuarioPage() {
  const [usuarios, setUsuarios] = useState([]);

  const [nomeUsuario, setNomeUsuario] = useState("");
  const [emailUsuario, setEmailUsuario] = useState("");
  const [idadeUsuario, setIdadeUsuario] = useState("");
  const [usuarioEditandoId, setUsuarioEditandoId] = useState(null);

  async function carregarUsuarios() {
    const dadosUsuarios = await listarUsuarios();
    setUsuarios(dadosUsuarios.usuarios);
  }

  useEffect(() => {
    carregarUsuarios();
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

    carregarUsuarios();
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

    carregarUsuarios();
  }

  return (
    <>
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
    </>
  );
}

export default UsuarioPage;