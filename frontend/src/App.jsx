import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import GeneroPage from "./pages/GeneroPage";
import AtorPage from "./pages/AtorPage";
import FilmePage from "./pages/FilmePage";
import AvaliacaoPage from "./pages/AvaliacaoPage";
import "./App.css";

function App() {
  const [paginaAtual, setPaginaAtual] = useState("filmes");
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  function sair() {
    setUsuarioLogado(null);
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
    return <LoginPage aoLogar={setUsuarioLogado} />;
  }

  return (
    <div className="app-bg">
      <div className="container py-5">
        <header className="text-center mb-4">
          <h1 className="titulo-principal">API de Filmes</h1>

          <p className="subtitulo">
            Catálogo cinematográfico com Flask, MySQL e React
          </p>

          <div className="usuario-logado mt-3">
            <span>
              Logado como <strong>{usuarioLogado.nome}</strong>
            </span>

            <button className="btn btn-outline-light btn-sm" onClick={sair}>
              Sair
            </button>
          </div>
        </header>

        <nav className="d-flex justify-content-center gap-2 flex-wrap mb-4">
          <button
            className={classeBotao("filmes")}
            onClick={() => setPaginaAtual("filmes")}
          >
            Filmes
          </button>

          <button
            className={classeBotao("generos")}
            onClick={() => setPaginaAtual("generos")}
          >
            Gêneros
          </button>

          <button
            className={classeBotao("atores")}
            onClick={() => setPaginaAtual("atores")}
          >
            Atores
          </button>

          <button
            className={classeBotao("avaliacoes")}
            onClick={() => setPaginaAtual("avaliacoes")}
          >
            Avaliações
          </button>
        </nav>

        <main>{renderizarPagina()}</main>
      </div>
    </div>
  );
}

export default App;