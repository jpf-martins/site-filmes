function GeneroLista({ generos, editarGenero, excluirGenero }) {
  return (
    <section className="painel-app mb-4">
      <h2>Gêneros cadastrados</h2>

      {generos.length === 0 ? (
        <p className="texto-secundario">Nenhum gênero cadastrado.</p>
      ) : (
        <ul className="list-group">
          {generos.map((genero) => (
            <li
              key={genero.id}
              className="list-group-item item-app d-flex justify-content-between align-items-center gap-3"
            >
              <span>
                {genero.nome} - {genero.descricao}
              </span>

              <div className="d-flex gap-2">
                <button className="btn btn-outline-light btn-sm" onClick={() => editarGenero(genero)}>
                  Editar
                </button>

                <button className="btn btn-outline-danger btn-sm" onClick={() => excluirGenero(genero.id)}>
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