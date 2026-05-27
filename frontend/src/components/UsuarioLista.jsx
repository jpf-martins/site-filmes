function UsuarioLista({ usuarios, editarUsuario, excluirUsuario }) {
  return (
    <section className="painel-app mb-4">
      <h2>Usuários cadastrados</h2>

      {usuarios.length === 0 ? (
        <p className="texto-secundario">Nenhum usuário cadastrado.</p>
      ) : (
        <ul className="list-group">
          {usuarios.map((usuario) => (
            <li
              key={usuario.id}
              className="list-group-item item-app d-flex justify-content-between align-items-center gap-3"
            >
              <span>
                {usuario.nome} - {usuario.email} - {usuario.idade} anos
              </span>

              <div className="d-flex gap-2">
                <button className="btn btn-outline-light btn-sm" onClick={() => editarUsuario(usuario)}>
                  Editar
                </button>

                <button className="btn btn-outline-danger btn-sm" onClick={() => excluirUsuario(usuario.id)}>
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

export default UsuarioLista;