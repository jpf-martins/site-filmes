function AvaliacaoForm({
  notaAvaliacao,
  setNotaAvaliacao,
  comentarioAvaliacao,
  setComentarioAvaliacao,
  filmeAvaliacaoId,
  setFilmeAvaliacaoId,
  filmes = [],
  salvarAvaliacao,
  avaliacaoEditandoId,
  usuarioLogado
}) {
  return (
    <section className="painel-app mb-4">
      <h2>{avaliacaoEditandoId ? "Editar Avaliação" : "Cadastrar Avaliação"}</h2>

      <form onSubmit={salvarAvaliacao} className="row g-3">
        <div className="col-md-2">
          <input
            className="form-control campo-app"
            type="number"
            min="0"
            max="10"
            placeholder="Nota"
            value={notaAvaliacao}
            onChange={(e) => setNotaAvaliacao(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <input
            className="form-control campo-app"
            type="text"
            placeholder="Comentário"
            value={comentarioAvaliacao}
            onChange={(e) => setComentarioAvaliacao(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <input
            className="form-control campo-app"
            type="text"
            value={usuarioLogado.nome}
            disabled
          />
        </div>

        <div className="col-md-2">
          <select
            className="form-select campo-app"
            value={filmeAvaliacaoId}
            onChange={(e) => setFilmeAvaliacaoId(e.target.value)}
          >
            <option value="">Filme</option>
            {filmes.map((filme) => (
              <option key={filme.id} value={filme.id}>
                {filme.titulo}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <button className="btn btn-destaque w-100" type="submit">
            {avaliacaoEditandoId ? "Salvar" : "Cadastrar"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AvaliacaoForm;