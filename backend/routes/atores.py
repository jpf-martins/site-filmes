from flask import jsonify
from models import db, Ator
from utils import pegar_json, ator_para_dict, filme_para_dict


def init_app(app):
    @app.route("/atores", methods=["GET"])
    def listar_atores():
        atores = Ator.query.all()
        lista = [ator_para_dict(a) for a in atores]
        return jsonify({"atores": lista, "total": len(lista)}), 200

    @app.route("/atores/<int:ator_id>", methods=["GET"])
    def buscar_ator(ator_id):
        ator = db.session.get(Ator, ator_id)

        if not ator:
            return jsonify({"erro": "Ator não encontrado"}), 404

        return jsonify(ator_para_dict(ator)), 200

    @app.route("/atores", methods=["POST"])
    def criar_ator():
        data, erro = pegar_json()
        if erro:
            return erro

        nome = data.get("nome")
        nacionalidade = data.get("nacionalidade")
        idade = data.get("idade")

        if not nome:
            return jsonify({"erro": "Nome é obrigatório"}), 400

        novo_ator = Ator(nome=nome, nacionalidade=nacionalidade, idade=idade)
        db.session.add(novo_ator)
        db.session.commit()

        return jsonify({
            "mensagem": "Ator criado com sucesso",
            "ator": ator_para_dict(novo_ator)
        }), 201

    @app.route("/atores/<int:ator_id>", methods=["PUT"])
    def atualizar_ator(ator_id):
        ator = db.session.get(Ator, ator_id)

        if not ator:
            return jsonify({"erro": "Ator não encontrado"}), 404

        data, erro = pegar_json()
        if erro:
            return erro

        nome = data.get("nome")
        nacionalidade = data.get("nacionalidade")
        idade = data.get("idade")

        if not nome:
            return jsonify({"erro": "Nome é obrigatório"}), 400

        ator.nome = nome
        ator.nacionalidade = nacionalidade
        ator.idade = idade

        db.session.commit()

        return jsonify({
            "mensagem": "Ator atualizado com sucesso",
            "ator": ator_para_dict(ator)
        }), 200

    @app.route("/atores/<int:ator_id>", methods=["DELETE"])
    def deletar_ator(ator_id):
        ator = db.session.get(Ator, ator_id)

        if not ator:
            return jsonify({"erro": "Ator não encontrado"}), 404

        if ator.filmes:
            return jsonify({"erro": "Não é possível deletar um ator vinculado a filmes"}), 400

        db.session.delete(ator)
        db.session.commit()

        return jsonify({"mensagem": "Ator deletado com sucesso"}), 200

    @app.route("/atores/<int:ator_id>/filmes", methods=["GET"])
    def listar_filmes_do_ator(ator_id):
        ator = db.session.get(Ator, ator_id)

        if not ator:
            return jsonify({"erro": "Ator não encontrado"}), 404

        lista = [filme_para_dict(f) for f in ator.filmes]
        return jsonify({
            "ator": ator.nome,
            "filmes": lista,
            "total": len(lista)
        }), 200