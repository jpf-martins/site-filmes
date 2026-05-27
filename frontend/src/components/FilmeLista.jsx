function FilmeLista({ filmes, excluirFilme, editarFilme }) {
  return (
    <section>
      <h2>Filmes cadastrados</h2>

      {filmes.length === 0 ? (
        <p>Nenhum filme cadastrado.</p>
      ) : (
        <ul>
          {filmes.map((filme) => (
            <li key={filme.id}>
              <span>
                {filme.titulo} - {filme.ano_lancamento}
              </span>

              <div>
                <button onClick={() => editarFilme(filme)}>
                  Editar
                </button>

                <button onClick={() => excluirFilme(filme.id)}>
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