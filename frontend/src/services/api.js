const API_URL = "http://127.0.0.1:5000";

export async function listarUsuarios() {
  const resposta = await fetch(`${API_URL}/usuarios`);
  return await resposta.json();
}

export async function cadastrarUsuario(usuario) {
  const resposta = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(usuario)
  });

  return await resposta.json();
}

export async function atualizarUsuario(id, usuario) {
  const resposta = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(usuario)
  });

  return await resposta.json();
}

export async function deletarUsuario(id) {
  const resposta = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "DELETE"
  });

  return await resposta.json();
}

export async function listarFilmes() {
  const resposta = await fetch(`${API_URL}/filmes`);
  return await resposta.json();
}

export async function cadastrarFilme(filme) {
  const resposta = await fetch(`${API_URL}/filmes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(filme)
  });

  return await resposta.json();
}

export async function atualizarFilme(id, filme) {
  const resposta = await fetch(`${API_URL}/filmes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(filme)
  });

  return await resposta.json();
}

export async function deletarFilme(id) {
  const resposta = await fetch(`${API_URL}/filmes/${id}`, {
    method: "DELETE"
  });

  return await resposta.json();
}

export async function listarGeneros() {
  const resposta = await fetch(`${API_URL}/generos`);
  return await resposta.json();
}

export async function cadastrarGenero(genero) {
  const resposta = await fetch(`${API_URL}/generos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(genero)
  });

  return await resposta.json();
}

export async function atualizarGenero(id, genero) {
  const resposta = await fetch(`${API_URL}/generos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(genero)
  });

  return await resposta.json();
}

export async function deletarGenero(id) {
  const resposta = await fetch(`${API_URL}/generos/${id}`, {
    method: "DELETE"
  });

  return await resposta.json();
}

export async function listarAtores() {
  const resposta = await fetch(`${API_URL}/atores`);
  return await resposta.json();
}

export async function cadastrarAtor(ator) {
  const resposta = await fetch(`${API_URL}/atores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(ator)
  });

  return await resposta.json();
}

export async function atualizarAtor(id, ator) {
  const resposta = await fetch(`${API_URL}/atores/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(ator)
  });

  return await resposta.json();
}

export async function deletarAtor(id) {
  const resposta = await fetch(`${API_URL}/atores/${id}`, {
    method: "DELETE"
  });

  return await resposta.json();
}

export async function listarAvaliacoes() {
  const resposta = await fetch(`${API_URL}/avaliacoes`);
  return await resposta.json();
}

export async function cadastrarAvaliacao(avaliacao) {
  const resposta = await fetch(`${API_URL}/avaliacoes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(avaliacao)
  });

  return await resposta.json();
}

export async function atualizarAvaliacao(id, avaliacao) {
  const resposta = await fetch(`${API_URL}/avaliacoes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(avaliacao)
  });

  return await resposta.json();
}

export async function deletarAvaliacao(id) {
  const resposta = await fetch(`${API_URL}/avaliacoes/${id}`, {
    method: "DELETE"
  });

  return await resposta.json();
}