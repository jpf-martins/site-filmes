from flask import jsonify, request
from models import db, Ator


def usuario_para_dict(usuario):
    return {
        "id": usuario.id,
        "nome": usuario.nome,
        "email": usuario.email,
        "idade": usuario.idade
    }


def genero_para_dict(genero):
    return {
        "id": genero.id,
        "nome": genero.nome,
        "descricao": genero.descricao
    }


def ator_para_dict(ator):
    return {
        "id": ator.id,
        "nome": ator.nome,
        "nacionalidade": ator.nacionalidade,
        "idade": ator.idade
    }


def filme_para_dict(filme):
    return {
        "id": filme.id,
        "titulo": filme.titulo,
        "ano_lancamento": filme.ano_lancamento,
        "duracao_minutos": filme.duracao_minutos,
        "genero_id": filme.genero_id,
        "ator_ids": [ator.id for ator in filme.atores]
    }


def avaliacao_para_dict(avaliacao):
    return {
        "id": avaliacao.id,
        "nota": avaliacao.nota,
        "comentario": avaliacao.comentario,
        "usuario_id": avaliacao.usuario_id,
        "filme_id": avaliacao.filme_id
    }


def pegar_json():
    data = request.get_json(silent=True)
    if data is None:
        return None, (jsonify({"erro": "Requisição deve ser JSON"}), 400)
    return data, None


def buscar_atores_por_ids(ator_ids):
    if not isinstance(ator_ids, list):
        return None, "ator_ids deve ser uma lista"

    atores = []
    for ator_id in ator_ids:
        ator = db.session.get(Ator, ator_id)
        if not ator:
            return None, f"Ator {ator_id} não encontrado"
        atores.append(ator)

    return atores, None