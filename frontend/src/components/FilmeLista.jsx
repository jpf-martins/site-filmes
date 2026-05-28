function FilmeLista({
  filmes = [],
  generos = [],
  atores = [],
  avaliacoes = [],
  anosDisponiveis = [],
  buscaTitulo,
  setBuscaTitulo,
  filtroGeneroId,
  setFiltroGeneroId,
  filtroAtorId,
  setFiltroAtorId,
  filtroAno,
  setFiltroAno,
  pesquisarFilmes,
  limparFiltros,
  excluirFilme,
  editarFilme
}) {
  function buscarNomeGenero(id) {
    const genero = generos.find((genero) => genero.id === id);
    return genero ? genero.nome : "Gênero não encontrado";
  }

  function buscarNomesAtores(ids) {
    const atoresDoFilme = atores.filter((ator) => ids.includes(ator.id));

    if (atoresDoFilme.length === 0) {
      return "Nenhum ator vinculado";
    }

    return atoresDoFilme.map((ator) => ator.nome).join(", ");
  }

  function buscarAvaliacoesDoFilme(id) {
    return avaliacoes.filter((avaliacao) => avaliacao.filme_id === id);
  }

  function calcularMediaFilme(id) {
    // A média considera todas as avaliações carregadas para este filme.
    const avaliacoesDoFilme = buscarAvaliacoesDoFilme(id);

    if (avaliacoesDoFilme.length === 0) {
      return "Sem avaliações";
    }

    const soma = avaliacoesDoFilme.reduce(
      (total, avaliacao) => total + avaliacao.nota,
      0
    );

    const media = soma / avaliacoesDoFilme.length;

    return `${media.toFixed(1).replace(".", ",")} / 10`;
  }

  function contarAvaliacoesFilme(id) {
    const total = buscarAvaliacoesDoFilme(id).length;

    if (total === 0) {
      return "";
    }

    if (total === 1) {
      return "1 avaliação";
    }

    return `${total} avaliações`;
  }

  return (
    <section className="painel-app mb-4">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <h2 className="mb-0">Seus filmes</h2>

        <span className="texto-secundario">
          {filmes.length} filme(s) encontrado(s)
        </span>
      </div>

      <form onSubmit={pesquisarFilmes} className="row g-3 mb-4">
        <div className="col-md-4">
          <input
            className="form-control campo-app"
            type="text"
            placeholder="Pesquisar filme pelo título"
            value={buscaTitulo}
            onChange={(e) => setBuscaTitulo(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <select
            className="form-select campo-app"
            value={filtroGeneroId}
            onChange={(e) => setFiltroGeneroId(e.target.value)}
          >
            <option value="">Gênero</option>
            {generos.map((genero) => (
              <option key={genero.id} value={genero.id}>
                {genero.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <select
            className="form-select campo-app"
            value={filtroAtorId}
            onChange={(e) => setFiltroAtorId(e.target.value)}
          >
            <option value="">Ator</option>
            {atores.map((ator) => (
              <option key={ator.id} value={ator.id}>
                {ator.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <select
            className="form-select campo-app"
            value={filtroAno}
            onChange={(e) => setFiltroAno(e.target.value)}
          >
            <option value="">Ano</option>
            {anosDisponiveis.map((ano) => (
              <option key={ano} value={ano}>
                {ano}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2 d-flex gap-2">
          <button className="btn btn-destaque flex-fill" type="submit">
            Pesquisar
          </button>

          <button
            className="btn btn-outline-light"
            type="button"
            onClick={limparFiltros}
          >
            Limpar
          </button>
        </div>
      </form>

      {filmes.length === 0 ? (
        <p className="texto-secundario">Nenhum filme encontrado.</p>
      ) : (
        <ul className="list-group">
          {filmes.map((filme) => (
            <li
              key={filme.id}
              className="list-group-item item-app d-flex justify-content-between align-items-center gap-3"
            >
              <div>
                <strong>{filme.titulo}</strong>

                <p className="mb-1 texto-secundario">
                  {filme.ano_lancamento} • {filme.duracao_minutos} min •{" "}
                  {buscarNomeGenero(filme.genero_id)}
                </p>

                <p className="mb-1 texto-secundario">
                  Atores: {buscarNomesAtores(filme.ator_ids)}
                </p>

                <p className="mb-0 nota-media-filme">
                  ⭐ Nota média: {calcularMediaFilme(filme.id)}{" "}
                  <span className="texto-secundario">
                    {contarAvaliacoesFilme(filme.id)}
                  </span>
                </p>
              </div>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={() => editarFilme(filme)}
                >
                  Editar
                </button>

                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => excluirFilme(filme.id)}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default FilmeLista;
