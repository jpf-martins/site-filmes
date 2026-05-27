function FilmeLista({ filmes = [], excluirFilme, editarFilme }) {
  return (
    <section className="painel-app mb-4">
      <h2>Filmes cadastrados</h2>

      {filmes.length === 0 ? (
        <p className="texto-secundario">Nenhum filme cadastrado.</p>
      ) : (
        <ul className="list-group">
          {filmes.map((filme) => (
            <li
              key={filme.id}
              className="list-group-item item-app d-flex justify-content-between align-items-center gap-3"
            >
              <span>
                {filme.titulo} - {filme.ano_lancamento}
              </span>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={() => editarFilme(filme)}
                >
                  Editar
                </button>

                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => excluirFilme(filme.id)}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default FilmeLista;