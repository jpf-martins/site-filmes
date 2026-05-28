import os
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

# Carrega variáveis de ambiente do arquivo backend/.env, se existir.
DOTENV_PATH = os.path.join(os.path.dirname(__file__), ".env")
if os.path.exists(DOTENV_PATH):
    with open(DOTENV_PATH, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME", "api_filmes")
DB_USER = os.getenv("DB_USER", "root")
DB_PASS = os.getenv("DB_PASS", "root")

app.config["SQLALCHEMY_DATABASE_URI"] = (
    f"mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "dev-secret-key")

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