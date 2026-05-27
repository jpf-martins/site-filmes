function AtorForm({
  nomeAtor,
  setNomeAtor,
  nacionalidadeAtor,
  setNacionalidadeAtor,
  idadeAtor,
  setIdadeAtor,
  salvarAtor,
  atorEditandoId
}) {
  return (
    <section className="painel-app mb-4">
      <h2>{atorEditandoId ? "Editar Ator" : "Cadastrar Ator"}</h2>

      <form onSubmit={salvarAtor} className="row g-3">
        <div className="col-md-4">
          <input
            className="form-control campo-app"
            type="text"
            placeholder="Nome do ator"
            value={nomeAtor}
            onChange={(e) => setNomeAtor(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <input
            className="form-control campo-app"
            type="text"
            placeholder="Nacionalidade"
            value={nacionalidadeAtor}
            onChange={(e) => setNacionalidadeAtor(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <input
            className="form-control campo-app"
            type="number"
            placeholder="Idade"
            value={idadeAtor}
            onChange={(e) => setIdadeAtor(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <button className="btn btn-destaque w-100" type="submit">
            {atorEditandoId ? "Salvar" : "Cadastrar"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AtorForm;