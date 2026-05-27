function AvaliacaoLista({
  avaliacoes,
  usuarios,
  filmes,
  editarAvaliacao,
  excluirAvaliacao
}) {
  function buscarNomeUsuario(id) {
    const usuario = usuarios.find((usuario) => usuario.id === id);
    return usuario ? usuario.nome : "Usuário não encontrado";
  }

  function buscarTituloFilme(id) {
    const filme = filmes.find((filme) => filme.id === id);
    return filme ? filme.titulo : "Filme não encontrado";
  }

  return (
    <section>
      <h2>Avaliações cadastradas</h2>

      {avaliacoes.length === 0 ? (
        <p>Nenhuma avaliação cadastrada.</p>
      ) : (
        <ul>
          {avaliacoes.map((avaliacao) => (
            <li key={avaliacao.id}>
              <span>
                Nota {avaliacao.nota} - {avaliacao.comentario} |{" "}
                {buscarNomeUsuario(avaliacao.usuario_id)} avaliou{" "}
                {buscarTituloFilme(avaliacao.filme_id)}
              </span>

              <div>
                <button onClick={() => editarAvaliacao(avaliacao)}>
                  Editar
                </button>

                <button onClick={() => excluirAvaliacao(avaliacao.id)}>
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

export default AvaliacaoLista;