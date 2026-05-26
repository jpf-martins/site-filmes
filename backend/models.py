from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
#
filme_ator = db.Table(
    "filme_ator",
    db.Column("filme_id", db.Integer, db.ForeignKey("filmes.id"), primary_key=True),
    db.Column("ator_id", db.Integer, db.ForeignKey("atores.id"), primary_key=True)
)


class Usuario(db.Model):
    __tablename__ = "usuarios"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    idade = db.Column(db.Integer)

    avaliacoes = db.relationship(
        "Avaliacao",
        backref="usuario",
        lazy=True,
        cascade="all, delete-orphan"
    )


class Genero(db.Model):
    __tablename__ = "generos"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), unique=True, nullable=False)
    descricao = db.Column(db.String(255))

    filmes = db.relationship("Filme", backref="genero", lazy=True)


class Ator(db.Model):
    __tablename__ = "atores"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    nacionalidade = db.Column(db.String(100))
    idade = db.Column(db.Integer)


class Filme(db.Model):
    __tablename__ = "filmes"

    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(150), nullable=False)
    ano_lancamento = db.Column(db.Integer, nullable=False)
    duracao_minutos = db.Column(db.Integer, nullable=False)
    genero_id = db.Column(db.Integer, db.ForeignKey("generos.id"), nullable=False)
#
    atores = db.relationship(
        "Ator",
        secondary=filme_ator,
        backref=db.backref("filmes", lazy=True)
    )

    avaliacoes = db.relationship(
        "Avaliacao",
        backref="filme",
        lazy=True,
        cascade="all, delete-orphan"
    )


class Avaliacao(db.Model):
    __tablename__ = "avaliacoes"

    id = db.Column(db.Integer, primary_key=True)
    nota = db.Column(db.Integer, nullable=False)
    comentario = db.Column(db.Text)
    usuario_id = db.Column(db.Integer, db.ForeignKey("usuarios.id"), nullable=False)
    filme_id = db.Column(db.Integer, db.ForeignKey("filmes.id"), nullable=False)