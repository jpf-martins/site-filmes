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
    <section>
      <h2>{usuarioEditandoId ? "Editar Usuário" : "Cadastrar Usuário"}</h2>

      <form onSubmit={salvarUsuario}>
        <input
          type="text"
          placeholder="Nome do usuário"
          value={nomeUsuario}
          onChange={(e) => setNomeUsuario(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={emailUsuario}
          onChange={(e) => setEmailUsuario(e.target.value)}
        />

        <input
          type="number"
          placeholder="Idade"
          value={idadeUsuario}
          onChange={(e) => setIdadeUsuario(e.target.value)}
        />

        <button type="submit">
          {usuarioEditandoId ? "Salvar Alterações" : "Cadastrar Usuário"}
        </button>
      </form>
    </section>
  );
}

export default UsuarioForm;