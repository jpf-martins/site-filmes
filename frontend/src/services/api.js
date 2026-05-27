const API_URL = "http://127.0.0.1:5000";

async function request(endpoint, options = {}) {
  const resposta = await fetch(`${API_URL}${endpoint}`, options);
  return await resposta.json();
}

function configurarBody(dados) {
  return {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
  };
}

// USUÁRIOS
export function listarUsuarios() {
  return request("/usuarios");
}

export function cadastrarUsuario(usuario) {
  return request("/usuarios", {
    method: "POST",
    ...configurarBody(usuario)
  });
}

export function atualizarUsuario(id, usuario) {
  return request(`/usuarios/${id}`, {
    method: "PUT",
    ...configurarBody(usuario)
  });
}

export function deletarUsuario(id) {
  return request(`/usuarios/${id}`, {
    method: "DELETE"
  });
}

// FILMES
export function listarFilmes() {
  return request("/filmes");
}

export function cadastrarFilme(filme) {
  return request("/filmes", {
    method: "POST",
    ...configurarBody(filme)
  });
}

export function atualizarFilme(id, filme) {
  return request(`/filmes/${id}`, {
    method: "PUT",
    ...configurarBody(filme)
  });
}

export function deletarFilme(id) {
  return request(`/filmes/${id}`, {
    method: "DELETE"
  });
}

// GÊNEROS
export function listarGeneros() {
  return request("/generos");
}

export function cadastrarGenero(genero) {
  return request("/generos", {
    method: "POST",
    ...configurarBody(genero)
  });
}

export function atualizarGenero(id, genero) {
  return request(`/generos/${id}`, {
    method: "PUT",
    ...configurarBody(genero)
  });
}

export function deletarGenero(id) {
  return request(`/generos/${id}`, {
    method: "DELETE"
  });
}

// ATORES
export function listarAtores() {
  return request("/atores");
}

export function cadastrarAtor(ator) {
  return request("/atores", {
    method: "POST",
    ...configurarBody(ator)
  });
}

export function atualizarAtor(id, ator) {
  return request(`/atores/${id}`, {
    method: "PUT",
    ...configurarBody(ator)
  });
}

export function deletarAtor(id) {
  return request(`/atores/${id}`, {
    method: "DELETE"
  });
}

// AVALIAÇÕES
export function listarAvaliacoes() {
  return request("/avaliacoes");
}

export function cadastrarAvaliacao(avaliacao) {
  return request("/avaliacoes", {
    method: "POST",
    ...configurarBody(avaliacao)
  });
}

export function atualizarAvaliacao(id, avaliacao) {
  return request(`/avaliacoes/${id}`, {
    method: "PUT",
    ...configurarBody(avaliacao)
  });
}

export function deletarAvaliacao(id) {
  return request(`/avaliacoes/${id}`, {
    method: "DELETE"
  });
}

export function loginUsuario(dadosLogin) {
  return request("/login", {
    method: "POST",
    ...configurarBody(dadosLogin)
  });
}