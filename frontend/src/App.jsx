import { useRef, useState } from "react";
import LoginPage from "./pages/LoginPage";
import GeneroPage from "./pages/GeneroPage";
import AtorPage from "./pages/AtorPage";
import FilmePage from "./pages/FilmePage";
import AvaliacaoPage from "./pages/AvaliacaoPage";
import Toast from "./components/Toast";
import { NOME_APP, SUBTITULO_APP } from "./config/app";
import "./App.css";

function App() {
  const [paginaAtual, setPaginaAtual] = useState("filmes");
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);

  // Recupera a sessão salva para manter o usuário logado ao recarregar a página.
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

  function mostrarToast(mensagem) {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    setToast(mensagem);

    toastTimer.current = setTimeout(() => {
      setToast("");
    }, 3000);
  }

  function entrar(usuario) {
    setUsuarioLogado(usuario);
    // Salva apenas os dados básicos do usuário logado no navegador.
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    setPaginaAtual("filmes");
    mostrarToast("Login realizado com sucesso.");
  }

  function sair() {
    setUsuarioLogado(null);
    localStorage.removeItem("usuarioLogado");
    setPaginaAtual("filmes");
    mostrarToast("Logout realizado com sucesso.");
  }

  function renderizarPagina() {
    if (paginaAtual === "generos") {
      return <GeneroPage mostrarToast={mostrarToast} />;
    }

    if (paginaAtual === "atores") {
      return <AtorPage mostrarToast={mostrarToast} />;
    }

    if (paginaAtual === "avaliacoes") {
      return (
        <AvaliacaoPage
          usuarioLogado={usuarioLogado}
          mostrarToast={mostrarToast}
        />
      );
    }

    return (
      <FilmePage
        usuarioLogado={usuarioLogado}
        mostrarToast={mostrarToast}
      />
    );
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
    return (
      <>
        <LoginPage aoLogar={entrar} mostrarToast={mostrarToast} />
        <Toast mensagem={toast} />
      </>
    );
  }

  return (
    <div className="app-bg">
      <nav className="navbar-app">
        <h1 className="navbar-titulo">{NOME_APP}</h1>

        <div className="usuario-logado">
          <span>
            Conectado como <strong>{usuarioLogado.nome}</strong>
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

      <Toast mensagem={toast} />
    </div>
  );
}

export default App;
