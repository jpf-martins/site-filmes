function GeneroForm({
  nomeGenero,
  setNomeGenero,
  descricaoGenero,
  setDescricaoGenero,
  salvarGenero,
  generoEditandoId
}) {
  return (
    <section>
      <h2>{generoEditandoId ? "Editar Gênero" : "Cadastrar Gênero"}</h2>

      <form onSubmit={salvarGenero}>
        <input
          type="text"
          placeholder="Nome do gênero"
          value={nomeGenero}
          onChange={(e) => setNomeGenero(e.target.value)}
        />

        <input
          type="text"
          placeholder="Descrição do gênero"
          value={descricaoGenero}
          onChange={(e) => setDescricaoGenero(e.target.value)}
        />

        <button type="submit">
          {generoEditandoId ? "Salvar Alterações" : "Cadastrar Gênero"}
        </button>
      </form>
    </section>
  );
}

export default GeneroForm;  