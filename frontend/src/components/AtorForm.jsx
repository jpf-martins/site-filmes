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
    <section>
      <h2>{atorEditandoId ? "Editar Ator" : "Cadastrar Ator"}</h2>

      <form onSubmit={salvarAtor}>
        <input
          type="text"
          placeholder="Nome do ator"
          value={nomeAtor}
          onChange={(e) => setNomeAtor(e.target.value)}
        />

        <input
          type="text"
          placeholder="Nacionalidade"
          value={nacionalidadeAtor}
          onChange={(e) => setNacionalidadeAtor(e.target.value)}
        />

        <input
          type="number"
          placeholder="Idade"
          value={idadeAtor}
          onChange={(e) => setIdadeAtor(e.target.value)}
        />

        <button type="submit">
          {atorEditandoId ? "Salvar Alterações" : "Cadastrar Ator"}
        </button>
      </form>
    </section>
  );
}

export default AtorForm;