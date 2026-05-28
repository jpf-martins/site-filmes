from flask import jsonify, request
from models import db, Filme, Genero, Usuario
from utils import pegar_json, filme_para_dict, ator_para_dict, buscar_atores_por_ids


def init_app(app):
    @app.route("/filmes", methods=["GET"])
    def listar_filmes():
        usuario_id = request.args.get("usuario_id", type=int)

        if usuario_id is None:
            filmes = Filme.query.all()
        else:
            filmes = Filme.query.filter(
                (Filme.usuario_id == usuario_id) |
                Filme.avaliacoes.any(usuario_id=usuario_id)
            ).all()

        lista = [filme_para_dict(f) for f in filmes]
        return jsonify({"filmes": lista, "total": len(lista)}), 200

    @app.route("/filmes/<int:filme_id>", methods=["GET"])
    def buscar_filme(filme_id):
        filme = db.session.get(Filme, filme_id)

        if not filme:
            return jsonify({"erro": "Filme nao encontrado"}), 404

        return jsonify(filme_para_dict(filme)), 200

    @app.route("/filmes", methods=["POST"])
    def criar_filme():
        data, erro = pegar_json()
        if erro:
            return erro

        titulo = data.get("titulo")
        ano_lancamento = data.get("ano_lancamento")
        duracao_minutos = data.get("duracao_minutos")
        genero_id = data.get("genero_id")
        usuario_id = data.get("usuario_id")
        ator_ids = data.get("ator_ids", [])

        if not titulo or ano_lancamento is None or duracao_minutos is None or genero_id is None or usuario_id is None:
            return jsonify({"erro": "titulo, ano_lancamento, duracao_minutos, genero_id e usuario_id sao obrigatorios"}), 400

        genero = db.session.get(Genero, genero_id)
        if not genero:
            return jsonify({"erro": "Genero nao encontrado"}), 404

        if not db.session.get(Usuario, usuario_id):
            return jsonify({"erro": "Usuario nao encontrado"}), 404

        atores, erro_atores = buscar_atores_por_ids(ator_ids)
        if erro_atores:
            return jsonify({"erro": erro_atores}), 400

        novo_filme = Filme(
            titulo=titulo,
            ano_lancamento=ano_lancamento,
            duracao_minutos=duracao_minutos,
            genero_id=genero_id,
            usuario_id=usuario_id
        )
        novo_filme.atores = atores

        db.session.add(novo_filme)
        db.session.commit()

        return jsonify({
            "mensagem": "Filme criado com sucesso",
            "filme": filme_para_dict(novo_filme)
        }), 201

    @app.route("/filmes/<int:filme_id>", methods=["PUT"])
    def atualizar_filme(filme_id):
        filme = db.session.get(Filme, filme_id)

        if not filme:
            return jsonify({"erro": "Filme nao encontrado"}), 404

        data, erro = pegar_json()
        if erro:
            return erro

        titulo = data.get("titulo")
        ano_lancamento = data.get("ano_lancamento")
        duracao_minutos = data.get("duracao_minutos")
        genero_id = data.get("genero_id")
        ator_ids = data.get("ator_ids", [])

        if not titulo or ano_lancamento is None or duracao_minutos is None or genero_id is None:
            return jsonify({"erro": "titulo, ano_lancamento, duracao_minutos e genero_id sao obrigatorios"}), 400

        genero = db.session.get(Genero, genero_id)
        if not genero:
            return jsonify({"erro": "Genero nao encontrado"}), 404

        atores, erro_atores = buscar_atores_por_ids(ator_ids)
        if erro_atores:
            return jsonify({"erro": erro_atores}), 400

        filme.titulo = titulo
        filme.ano_lancamento = ano_lancamento
        filme.duracao_minutos = duracao_minutos
        filme.genero_id = genero_id
        filme.atores = atores

        db.session.commit()

        return jsonify({
            "mensagem": "Filme atualizado com sucesso",
            "filme": filme_para_dict(filme)
        }), 200

    @app.route("/filmes/<int:filme_id>", methods=["DELETE"])
    def deletar_filme(filme_id):
        filme = db.session.get(Filme, filme_id)

        if not filme:
            return jsonify({"erro": "Filme nao encontrado"}), 404

        filme.atores.clear()
        db.session.delete(filme)
        db.session.commit()

        return jsonify({"mensagem": "Filme deletado com sucesso"}), 200

    @app.route("/filmes/<int:filme_id>/atores", methods=["GET"])
    def listar_atores_do_filme(filme_id):
        filme = db.session.get(Filme, filme_id)

        if not filme:
            return jsonify({"erro": "Filme nao encontrado"}), 404

        lista = [ator_para_dict(a) for a in filme.atores]
        return jsonify({
            "filme": filme.titulo,
            "atores": lista,
            "total": len(lista)
        }), 200
