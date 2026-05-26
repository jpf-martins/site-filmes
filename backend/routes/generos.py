from flask import jsonify
from models import db, Genero
from utils import pegar_json, genero_para_dict


def init_app(app):
    @app.route("/generos", methods=["GET"])
    def listar_generos():
        generos = Genero.query.all()
        lista = [genero_para_dict(g) for g in generos]
        return jsonify({"generos": lista, "total": len(lista)}), 200

    @app.route("/generos/<int:genero_id>", methods=["GET"])
    def buscar_genero(genero_id):
        genero = db.session.get(Genero, genero_id)

        if not genero:
            return jsonify({"erro": "Gênero não encontrado"}), 404

        return jsonify(genero_para_dict(genero)), 200

    @app.route("/generos", methods=["POST"])
    def criar_genero():
        data, erro = pegar_json()
        if erro:
            return erro

        nome = data.get("nome")
        descricao = data.get("descricao")

        if not nome:
            return jsonify({"erro": "Nome é obrigatório"}), 400

        if Genero.query.filter_by(nome=nome).first():
            return jsonify({"erro": "Gênero já cadastrado"}), 400

        novo_genero = Genero(nome=nome, descricao=descricao)
        db.session.add(novo_genero)
        db.session.commit()

        return jsonify({
            "mensagem": "Gênero criado com sucesso",
            "genero": genero_para_dict(novo_genero)
        }), 201

    @app.route("/generos/<int:genero_id>", methods=["PUT"])
    def atualizar_genero(genero_id):
        genero = db.session.get(Genero, genero_id)

        if not genero:
            return jsonify({"erro": "Gênero não encontrado"}), 404

        data, erro = pegar_json()
        if erro:
            return erro

        nome = data.get("nome")
        descricao = data.get("descricao")

        if not nome:
            return jsonify({"erro": "Nome é obrigatório"}), 400

        genero_existente = Genero.query.filter(
            Genero.nome == nome,
            Genero.id != genero_id
        ).first()

        if genero_existente:
            return jsonify({"erro": "Já existe outro gênero com esse nome"}), 400

        genero.nome = nome
        genero.descricao = descricao

        db.session.commit()

        return jsonify({
            "mensagem": "Gênero atualizado com sucesso",
            "genero": genero_para_dict(genero)
        }), 200

    @app.route("/generos/<int:genero_id>", methods=["DELETE"])
    def deletar_genero(genero_id):
        genero = db.session.get(Genero, genero_id)

        if not genero:
            return jsonify({"erro": "Gênero não encontrado"}), 404

        if genero.filmes:
            return jsonify({"erro": "Não é possível deletar um gênero que possui filmes"}), 400

        db.session.delete(genero)
        db.session.commit()

        return jsonify({"mensagem": "Gênero deletado com sucesso"}), 200