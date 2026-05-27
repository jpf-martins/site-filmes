function FilmeForm({
  titulo,
  setTitulo,
  anoLancamento,
  setAnoLancamento,
  duracaoMinutos,
  setDuracaoMinutos,
  generoId,
  setGeneroId,
  atorIds,
  generos,
  atores,
  alterarAtorSelecionado,
  salvarFilme,
  filmeEditandoId
}) {
  const anoAtual = new Date().getFullYear();
  const anos = [];

  for (let ano = anoAtual; ano >= 1900; ano--) {
    anos.push(ano);
  }

  return (
    <section className="painel-app mb-4">
      <h2>{filmeEditandoId ? "Editar Filme" : "Cadastrar Filme"}</h2>

      <form onSubmit={salvarFilme} className="row g-3">
        <div className="col-md-6">
          <input
            className="form-control campo-app"
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-select campo-app"
            value={anoLancamento}
            onChange={(e) => setAnoLancamento(e.target.value)}
          >
            <option value="">Ano</option>
            {anos.map((ano) => (
              <option key={ano} value={ano}>
                {ano}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <input
            className="form-control campo-app"
            type="number"
            placeholder="Duração"
            value={duracaoMinutos}
            onChange={(e) => setDuracaoMinutos(e.target.value)}
          />
        </div>

        <div className="col-md-12">
          <select
            className="form-select campo-app"
            value={generoId}
            onChange={(e) => setGeneroId(e.target.value)}
          >
            <option value="">Selecione um gênero</option>
            {generos.map((genero) => (
              <option key={genero.id} value={genero.id}>
                {genero.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-12">
          <p className="mb-2 texto-secundario">Atores:</p>

          <div className="d-flex flex-wrap gap-3">
            {atores.map((ator) => (
              <label key={ator.id} className="form-check-label">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  checked={atorIds.includes(ator.id)}
                  onChange={() => alterarAtorSelecionado(ator.id)}
                />
                {ator.nome}
              </label>
            ))}
          </div>
        </div>

        <div className="col-md-12">
          <button className="btn btn-destaque w-100" type="submit">
            {filmeEditandoId ? "Salvar Alterações" : "Cadastrar Filme"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default FilmeForm;