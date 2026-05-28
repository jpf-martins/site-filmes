import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import GeneroPage from "./pages/GeneroPage";
import AtorPage from "./pages/AtorPage";
import FilmePage from "./pages/FilmePage";
import AvaliacaoPage from "./pages/AvaliacaoPage";
import { NOME_APP, SUBTITULO_APP } from "./config/app";
import "./App.css";

function App() {
  const [paginaAtual, setPaginaAtual] = useState("filmes");

  const [usuarioLogado, setUsuarioLogado] = useState(() => {
    const usuarioSalvo = localStorage.getItem("usuarioLogado");

    if (!usuarioSalvo) {
      return null;
    }

    try {
      return JSON.parse(usuarioSalvo);
    } catch {
      localStorage.removeItem("usuarioLogado");
      return null;
    }
  });

  function entrar(usuario) {
    setUsuarioLogado(usuario);
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    setPaginaAtual("filmes");
  }

  function sair() {
    setUsuarioLogado(null);
    localStorage.removeItem("usuarioLogado");
    setPaginaAtual("filmes");
  }

  function renderizarPagina() {
    if (paginaAtual === "generos") {
      return <GeneroPage />;
    }

    if (paginaAtual === "atores") {
      return <AtorPage />;
    }

    if (paginaAtual === "avaliacoes") {
      return <AvaliacaoPage usuarioLogado={usuarioLogado} />;
    }

    return <FilmePage />;
  }

  function classeBotao(pagina) {
    if (pagina === "filmes") {
      return paginaAtual === pagina
        ? "btn btn-filmes-principal ativo"
        : "btn btn-filmes-principal";
    }

    return paginaAtual === pagina
      ? "btn btn-light"
      : "btn btn-outline-light";
  }

  if (!usuarioLogado) {
    return <LoginPage aoLogar={entrar} />;
  }

  return (
    <div className="app-bg">
      <nav className="navbar-app">
        <h1 className="navbar-titulo">{NOME_APP}</h1>

        <div className="usuario-logado">
          <span>
            Logado como <strong>{usuarioLogado.nome}</strong>
          </span>

          <button className="btn btn-outline-light btn-sm" onClick={sair}>
            Sair
          </button>
        </div>
      </nav>

      <div className="container conteudo-app">
        <header className="text-center mb-4">
          <p className="subtitulo">{SUBTITULO_APP}</p>
        </header>

        <nav className="mb-4">
          <div className="d-flex justify-content-center mb-3">
            <button
              className={`${classeBotao("filmes")} btn-filmes-destaque`}
              onClick={() => setPaginaAtual("filmes")}
            >
              Filmes
            </button>
          </div>

          <div className="d-flex justify-content-center gap-2 flex-wrap">
            <button
              className={classeBotao("atores")}
              onClick={() => setPaginaAtual("atores")}
            >
              Atores
            </button>

            <button
              className={classeBotao("generos")}
              onClick={() => setPaginaAtual("generos")}
            >
              Gêneros
            </button>

            <button
              className={classeBotao("avaliacoes")}
              onClick={() => setPaginaAtual("avaliacoes")}
            >
              Avaliações
            </button>
          </div>
        </nav>

        <main>{renderizarPagina()}</main>
      </div>
    </div>
  );
}

export default App;
