function UsuarioLista({ usuarios, editarUsuario, excluirUsuario }) {
  return (
    <section>
      <h2>Usuários cadastrados</h2>

      {usuarios.length === 0 ? (
        <p>Nenhum usuário cadastrado.</p>
      ) : (
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario.id}>
              <span>
                {usuario.nome} - {usuario.email} - {usuario.idade} anos
              </span>

              <div>
                <button onClick={() => editarUsuario(usuario)}>
                  Editar
                </button>

                <button onClick={() => excluirUsuario(usuario.id)}>
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