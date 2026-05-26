from flask import Flask
from models import db
from flask_cors import CORS
from routes.usuarios import init_app as init_usuarios
from routes.generos import init_app as init_generos
from routes.atores import init_app as init_atores
from routes.filmes import init_app as init_filmes
from routes.avaliacoes import init_app as init_avaliacoes
from routes.extras import init_app as init_extras

app = Flask(__name__)

CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:root@localhost:3306/api_filmes"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

init_usuarios(app)
init_generos(app)
init_atores(app)
init_filmes(app)
init_avaliacoes(app)
init_extras(app)

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)