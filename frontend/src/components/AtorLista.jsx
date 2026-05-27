function AtorLista({ atores, editarAtor, excluirAtor }) {
  return (
    <section className="painel-app mb-4">
      <h2>Atores cadastrados</h2>

      {atores.length === 0 ? (
        <p className="texto-secundario">Nenhum ator cadastrado.</p>
      ) : (
        <ul className="list-group">
          {atores.map((ator) => (
            <li
              key={ator.id}
              className="list-group-item item-app d-flex justify-content-between align-items-center gap-3"
            >
              <span>
                {ator.nome} - {ator.nacionalidade} - {ator.idade} anos
              </span>

              <div className="d-flex gap-2">
                <button className="btn btn-outline-light btn-sm" onClick={() => editarAtor(ator)}>
                  Editar
                </button>

                <button className="btn btn-outline-danger btn-sm" onClick={() => excluirAtor(ator.id)}>
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

export default AtorLista;