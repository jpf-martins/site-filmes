function GeneroLista({ generos, editarGenero, excluirGenero }) {
  return (
    <section>
      <h2>Gêneros cadastrados</h2>

      {generos.length === 0 ? (
        <p>Nenhum gênero cadastrado.</p>
      ) : (
        <ul>
          {generos.map((genero) => (
            <li key={genero.id}>
              <span>
                {genero.nome} - {genero.descricao}
              </span>

              <div>
                <button onClick={() => editarGenero(genero)}>
                  Editar
                </button>

                <button onClick={() => excluirGenero(genero.id)}>
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

export default GeneroLista;