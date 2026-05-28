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
    <section className="painel-app mb-4">
      <h2>Avaliações</h2>

      {avaliacoes.length === 0 ? (
        <p className="texto-secundario">Nenhuma avaliação cadastrada.</p>
      ) : (
        <ul className="list-group">
          {avaliacoes.map((avaliacao) => (
            <li
              key={avaliacao.id}
              className="list-group-item item-app d-flex justify-content-between align-items-center gap-3"
            >
              <span>
                Nota {avaliacao.nota} - {avaliacao.comentario} |{" "}
                {buscarNomeUsuario(avaliacao.usuario_id)} avaliou{" "}
                {buscarTituloFilme(avaliacao.filme_id)}
              </span>

              <div className="d-flex gap-2">
                <button className="btn btn-outline-light btn-sm" onClick={() => editarAvaliacao(avaliacao)}>
                  Editar
                </button>

                <button className="btn btn-outline-danger btn-sm" onClick={() => excluirAvaliacao(avaliacao.id)}>
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