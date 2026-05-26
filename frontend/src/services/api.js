const API_URL = "http://127.0.0.1:5000";

export async function listarFilmes() {
  const resposta = await fetch(`${API_URL}/filmes`);
  return await resposta.json();
}

export async function listarGeneros() {
  const resposta = await fetch(`${API_URL}/generos`);
  return await resposta.json();
}

export async function listarAtores() {
  const resposta = await fetch(`${API_URL}/atores`);
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