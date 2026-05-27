function GeneroForm({
  nomeGenero,
  setNomeGenero,
  descricaoGenero,
  setDescricaoGenero,
  salvarGenero,
  generoEditandoId
}) {
  return (
    <section className="painel-app mb-4">
      <h2>{generoEditandoId ? "Editar Gênero" : "Cadastrar Gênero"}</h2>

      <form onSubmit={salvarGenero} className="row g-3">
        <div className="col-md-5">
          <input
            className="form-control campo-app"
            type="text"
            placeholder="Nome do gênero"
            value={nomeGenero}
            onChange={(e) => setNomeGenero(e.target.value)}
          />
        </div>

        <div className="col-md-5">
          <input
            className="form-control campo-app"
            type="text"
            placeholder="Descrição"
            value={descricaoGenero}
            onChange={(e) => setDescricaoGenero(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <button className="btn btn-destaque w-100" type="submit">
            {generoEditandoId ? "Salvar" : "Cadastrar"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default GeneroForm;