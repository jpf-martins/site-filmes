from flask import jsonify
from sqlalchemy import text
from models import db, Usuario, Filme
from utils import avaliacao_para_dict


def init_app(app):
    @app.route("/", methods=["GET"])
    def inicio():
        return "API de filmes com Flask funcionando", 200

    @app.route("/teste-banco", methods=["GET"])
    def teste_banco():
        db.session.execute(text("SELECT 1"))
        return jsonify({"banco": "conectado"}), 200

    @app.route("/usuarios/<int:usuario_id>/avaliacoes", methods=["GET"])
    def listar_avaliacoes_do_usuario(usuario_id):
        usuario = db.session.get(Usuario, usuario_id)

        if not usuario:
            return jsonify({"erro": "Usuário não encontrado"}), 404

        lista = [avaliacao_para_dict(a) for a in usuario.avaliacoes]
        return jsonify({
            "usuario": usuario.nome,
            "avaliacoes": lista,
            "total": len(lista)
        }), 200

    @app.route("/filmes/<int:filme_id>/avaliacoes", methods=["GET"])
    def listar_avaliacoes_do_filme(filme_id):
        filme = db.session.get(Filme, filme_id)

        if not filme:
            return jsonify({"erro": "Filme não encontrado"}), 404

        lista = [avaliacao_para_dict(a) for a in filme.avaliacoes]
        return jsonify({
            "filme": filme.titulo,
            "avaliacoes": lista,
            "total": len(lista)
        }), 200