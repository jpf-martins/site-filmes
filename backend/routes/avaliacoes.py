from flask import jsonify
from models import db, Avaliacao, Usuario, Filme
from utils import pegar_json, avaliacao_para_dict


def init_app(app):
    @app.route("/avaliacoes", methods=["GET"])
    def listar_avaliacoes():
        avaliacoes = Avaliacao.query.all()
        lista = [avaliacao_para_dict(a) for a in avaliacoes]
        return jsonify({"avaliacoes": lista, "total": len(lista)}), 200

    @app.route("/avaliacoes/<int:avaliacao_id>", methods=["GET"])
    def buscar_avaliacao(avaliacao_id):
        avaliacao = db.session.get(Avaliacao, avaliacao_id)

        if not avaliacao:
            return jsonify({"erro": "Avaliação não encontrada"}), 404

        return jsonify(avaliacao_para_dict(avaliacao)), 200

    @app.route("/avaliacoes", methods=["POST"])
    def criar_avaliacao():
        data, erro = pegar_json()
        if erro:
            return erro

        nota = data.get("nota")
        comentario = data.get("comentario")
        usuario_id = data.get("usuario_id")
        filme_id = data.get("filme_id")

        if nota is None or usuario_id is None or filme_id is None:
            return jsonify({"erro": "nota, usuario_id e filme_id são obrigatórios"}), 400

        if nota < 0 or nota > 10:
            return jsonify({"erro": "A nota deve estar entre 0 e 10"}), 400

        if not db.session.get(Usuario, usuario_id):
            return jsonify({"erro": "Usuário não encontrado"}), 404

        if not db.session.get(Filme, filme_id):
            return jsonify({"erro": "Filme não encontrado"}), 404

        nova_avaliacao = Avaliacao(
            nota=nota,
            comentario=comentario,
            usuario_id=usuario_id,
            filme_id=filme_id
        )
        db.session.add(nova_avaliacao)
        db.session.commit()

        return jsonify({
            "mensagem": "Avaliação criada com sucesso",
            "avaliacao": avaliacao_para_dict(nova_avaliacao)
        }), 201

    @app.route("/avaliacoes/<int:avaliacao_id>", methods=["PUT"])
    def atualizar_avaliacao(avaliacao_id):
        avaliacao = db.session.get(Avaliacao, avaliacao_id)

        if not avaliacao:
            return jsonify({"erro": "Avaliação não encontrada"}), 404

        data, erro = pegar_json()
        if erro:
            return erro

        nota = data.get("nota")
        comentario = data.get("comentario")
        usuario_id = data.get("usuario_id")
        filme_id = data.get("filme_id")

        if nota is None or usuario_id is None or filme_id is None:
            return jsonify({"erro": "nota, usuario_id e filme_id são obrigatórios"}), 400

        if nota < 0 or nota > 10:
            return jsonify({"erro": "A nota deve estar entre 0 e 10"}), 400

        if not db.session.get(Usuario, usuario_id):
            return jsonify({"erro": "Usuário não encontrado"}), 404

        if not db.session.get(Filme, filme_id):
            return jsonify({"erro": "Filme não encontrado"}), 404

        avaliacao.nota = nota
        avaliacao.comentario = comentario
        avaliacao.usuario_id = usuario_id
        avaliacao.filme_id = filme_id

        db.session.commit()

        return jsonify({
            "mensagem": "Avaliação atualizada com sucesso",
            "avaliacao": avaliacao_para_dict(avaliacao)
        }), 200

    @app.route("/avaliacoes/<int:avaliacao_id>", methods=["DELETE"])
    def deletar_avaliacao(avaliacao_id):
        avaliacao = db.session.get(Avaliacao, avaliacao_id)

        if not avaliacao:
            return jsonify({"erro": "Avaliação não encontrada"}), 404

        db.session.delete(avaliacao)
        db.session.commit()

        return jsonify({"mensagem": "Avaliação deletada com sucesso"}), 200