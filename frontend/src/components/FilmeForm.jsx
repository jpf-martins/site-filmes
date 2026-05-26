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
  salvarFilme
}) {
  return (
    <section>
      <h2>Cadastrar Filme</h2>

      <form onSubmit={salvarFilme}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <input
          type="number"
          placeholder="Ano de lançamento"
          value={anoLancamento}
          onChange={(e) => setAnoLancamento(e.target.value)}
        />

        <input
          type="number"
          placeholder="Duração em minutos"
          value={duracaoMinutos}
          onChange={(e) => setDuracaoMinutos(e.target.value)}
        />

        <select value={generoId} onChange={(e) => setGeneroId(e.target.value)}>
          <option value="">Selecione um gênero</option>
          {generos.map((genero) => (
            <option key={genero.id} value={genero.id}>
              {genero.nome}
            </option>
          ))}
        </select>

        <div>
          <p>Atores:</p>

          {atores.map((ator) => (
            <label key={ator.id}>
              <input
                type="checkbox"
                checked={atorIds.includes(ator.id)}
                onChange={() => alterarAtorSelecionado(ator.id)}
              />
              {ator.nome}
            </label>
          ))}
        </div>

        <button type="submit">Cadastrar Filme</button>
      </form>
    </section>
  );
}

export default FilmeForm;