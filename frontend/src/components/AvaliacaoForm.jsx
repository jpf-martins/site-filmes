function AvaliacaoForm({
  notaAvaliacao,
  setNotaAvaliacao,
  comentarioAvaliacao,
  setComentarioAvaliacao,
  usuarioAvaliacaoId,
  setUsuarioAvaliacaoId,
  filmeAvaliacaoId,
  setFilmeAvaliacaoId,
  usuarios,
  filmes,
  salvarAvaliacao,
  avaliacaoEditandoId
}) {
  return (
    <section>
      <h2>{avaliacaoEditandoId ? "Editar Avaliação" : "Cadastrar Avaliação"}</h2>

      <form onSubmit={salvarAvaliacao}>
        <input
          type="number"
          placeholder="Nota de 0 a 10"
          value={notaAvaliacao}
          onChange={(e) => setNotaAvaliacao(e.target.value)}
        />

        <input
          type="text"
          placeholder="Comentário"
          value={comentarioAvaliacao}
          onChange={(e) => setComentarioAvaliacao(e.target.value)}
        />

        <select
          value={usuarioAvaliacaoId}
          onChange={(e) => setUsuarioAvaliacaoId(e.target.value)}
        >
          <option value="">Selecione um usuário</option>
          {usuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.nome}
            </option>
          ))}
        </select>

        <select
          value={filmeAvaliacaoId}
          onChange={(e) => setFilmeAvaliacaoId(e.target.value)}
        >
          <option value="">Selecione um filme</option>
          {filmes.map((filme) => (
            <option key={filme.id} value={filme.id}>
              {filme.titulo}
            </option>
          ))}
        </select>

        <button type="submit">
          {avaliacaoEditandoId ? "Salvar Alterações" : "Cadastrar Avaliação"}
        </button>
      </form>
    </section>
  );
}

export default AvaliacaoForm;