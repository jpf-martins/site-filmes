from flask import jsonify
from models import db, Usuario
from utils import pegar_json, usuario_para_dict


def init_app(app):
    @app.route("/usuarios", methods=["GET"])
    def listar_usuarios():
        usuarios = Usuario.query.all()
        lista = [usuario_para_dict(u) for u in usuarios]
        return jsonify({"usuarios": lista, "total": len(lista)}), 200

    @app.route("/usuarios/<int:usuario_id>", methods=["GET"])
    def buscar_usuario(usuario_id):
        usuario = db.session.get(Usuario, usuario_id)

        if not usuario:
            return jsonify({"erro": "Usuário não encontrado"}), 404

        return jsonify(usuario_para_dict(usuario)), 200

    @app.route("/usuarios", methods=["POST"])
    def criar_usuario():
        data, erro = pegar_json()
        if erro:
            return erro

        nome = data.get("nome")
        email = data.get("email")
        idade = data.get("idade")

        if not nome or not email:
            return jsonify({"erro": "Nome e email são obrigatórios"}), 400

        if Usuario.query.filter_by(email=email).first():
            return jsonify({"erro": "Email já cadastrado"}), 400

        novo_usuario = Usuario(nome=nome, email=email, idade=idade)
        db.session.add(novo_usuario)
        db.session.commit()

        return jsonify({
            "mensagem": "Usuário criado com sucesso",
            "usuario": usuario_para_dict(novo_usuario)
        }), 201

    @app.route("/usuarios/<int:usuario_id>", methods=["PUT"])
    def atualizar_usuario(usuario_id):
        usuario = db.session.get(Usuario, usuario_id)

        if not usuario:
            return jsonify({"erro": "Usuário não encontrado"}), 404

        data, erro = pegar_json()
        if erro:
            return erro

        nome = data.get("nome")
        email = data.get("email")
        idade = data.get("idade")

        if not nome or not email:
            return jsonify({"erro": "Nome e email são obrigatórios"}), 400

        email_existente = Usuario.query.filter(
            Usuario.email == email,
            Usuario.id != usuario_id
        ).first()

        if email_existente:
            return jsonify({"erro": "Email já cadastrado para outro usuário"}), 400

        usuario.nome = nome
        usuario.email = email
        usuario.idade = idade

        db.session.commit()

        return jsonify({
            "mensagem": "Usuário atualizado com sucesso",
            "usuario": usuario_para_dict(usuario)
        }), 200

    @app.route("/usuarios/<int:usuario_id>", methods=["DELETE"])
    def deletar_usuario(usuario_id):
        usuario = db.session.get(Usuario, usuario_id)

        if not usuario:
            return jsonify({"erro": "Usuário não encontrado"}), 404

        db.session.delete(usuario)
        db.session.commit()

        return jsonify({"mensagem": "Usuário deletado com sucesso"}), 200