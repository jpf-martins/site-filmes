function UsuarioForm({
  nomeUsuario,
  setNomeUsuario,
  emailUsuario,
  setEmailUsuario,
  idadeUsuario,
  setIdadeUsuario,
  salvarUsuario,
  usuarioEditandoId
}) {
  return (
    <section className="painel-app mb-4">
      <h2>{usuarioEditandoId ? "Editar Usuário" : "Cadastrar Usuário"}</h2>

      <form onSubmit={salvarUsuario} className="row g-3">
        <div className="col-md-4">
          <input
            className="form-control campo-app"
            type="text"
            placeholder="Nome"
            value={nomeUsuario}
            onChange={(e) => setNomeUsuario(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <input
            className="form-control campo-app"
            type="email"
            placeholder="Email"
            value={emailUsuario}
            onChange={(e) => setEmailUsuario(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <input
            className="form-control campo-app"
            type="number"
            placeholder="Idade"
            value={idadeUsuario}
            onChange={(e) => setIdadeUsuario(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <button className="btn btn-destaque w-100" type="submit">
            {usuarioEditandoId ? "Salvar" : "Cadastrar"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default UsuarioForm;