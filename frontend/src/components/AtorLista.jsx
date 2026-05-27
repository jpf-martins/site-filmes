function AtorLista({ atores, editarAtor, excluirAtor }) {
  return (
    <section>
      <h2>Atores cadastrados</h2>

      {atores.length === 0 ? (
        <p>Nenhum ator cadastrado.</p>
      ) : (
        <ul>
          {atores.map((ator) => (
            <li key={ator.id}>
              <span>
                {ator.nome} - {ator.nacionalidade} - {ator.idade} anos
              </span>

              <div>
                <button onClick={() => editarAtor(ator)}>
                  Editar
                </button>

                <button onClick={() => excluirAtor(ator.id)}>
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