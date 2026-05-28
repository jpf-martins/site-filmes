import { useState } from "react";
import { loginUsuario, cadastrarUsuario } from "../services/api";
import { NOME_APP } from "../config/app";

function LoginPage({ aoLogar }) {
  const [modoCadastro, setModoCadastro] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [idade, setIdade] = useState("");

  async function entrar(event) {
    event.preventDefault();

    const resposta = await loginUsuario({
      email: email,
      senha: senha
    });

    if (resposta.erro) {
      alert(resposta.erro);
      return;
    }

    aoLogar(resposta.usuario);
  }

  async function criarConta(event) {
    event.preventDefault();

    const novoUsuario = {
      nome: nome,
      email: email,
      senha: senha,
      idade: Number(idade)
    };

    const resposta = await cadastrarUsuario(novoUsuario);

    if (resposta.erro) {
      alert(resposta.erro);
      return;
    }

    alert("Usuário cadastrado com sucesso. Agora faça login.");

    setModoCadastro(false);
    setNome("");
    setEmail("");
    setSenha("");
    setIdade("");
  }

  return (
    <div className="app-bg login-page">
      <div className="container py-5">
        <div className="login-card mx-auto">
          <h1 className="titulo-principal text-center">{NOME_APP}</h1>

          <p className="subtitulo text-center mb-4">
            {modoCadastro
              ? "Crie sua conta para acessar o catálogo"
              : "Entre para acessar o catálogo cinematográfico"}
          </p>

          <form onSubmit={modoCadastro ? criarConta : entrar} className="row g-3">
            {modoCadastro && (
              <>
                <div className="col-md-12">
                  <input
                    className="form-control campo-app"
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>

                <div className="col-md-12">
                  <input
                    className="form-control campo-app"
                    type="number"
                    placeholder="Idade"
                    value={idade}
                    onChange={(e) => setIdade(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="col-md-12">
              <input
                className="form-control campo-app"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="col-md-12">
              <input
                className="form-control campo-app"
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <div className="col-md-12">
              <button className="btn btn-destaque w-100" type="submit">
                {modoCadastro ? "Criar Conta" : "Entrar"}
              </button>
            </div>
          </form>

          <button
            className="btn btn-link link-login w-100 mt-3"
            onClick={() => setModoCadastro(!modoCadastro)}
          >
            {modoCadastro
              ? "Já tenho conta"
              : "Ainda não tenho conta"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
