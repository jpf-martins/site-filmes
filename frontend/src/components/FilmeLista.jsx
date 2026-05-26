function FilmeLista({ filmes }) {
  return (
    <section>
      <h2>Filmes cadastrados</h2>

      {filmes.length === 0 ? (
        <p>Nenhum filme cadastrado.</p>
      ) : (
        <ul>
          {filmes.map((filme) => (
            <li key={filme.id}>
              {filme.titulo} - {filme.ano_lancamento}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default FilmeLista;