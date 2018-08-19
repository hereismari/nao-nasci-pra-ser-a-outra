# Dependencias
from flask import Flask
from flask_cors import CORS, cross_origin
from flask import request

from server.database import Client
import server.utilities.utils as utils
import server.utilities.args as args


import os


# App
app = Flask(__name__)
app.config['MONGO_URI'] = os.environ['MONGODB_URI']
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app)

# Client MongoDB
client = Client(app)

# Rotas
@app.route('/partidos/participacao/mulheres', methods=['GET'])
@cross_origin()
def partidos_participacao_mulheres():
    _args = utils.mount_request(args.CANDIDATOS)
    return utils.jsonify(client.partidos_participacao_mulheres(_args))


@app.route('/partidos/ranking/zerovotos', methods=['GET'])
@cross_origin()
def partidos_ranking_zero_votos():
    _args = utils.mount_request(args.CANDIDATOS)
    return utils.jsonify(client.partidos_ranking_poucos_votos(_args, 0))


@app.route('/partidos/ranking/poucosvotos', methods=['GET'])
@cross_origin()
def partidos_ranking_poucos_votos():
    _args = utils.mount_request(args.CANDIDATOS)
    poucos_votos = request.args.get('poucos_votos', default=3, type=int)
    return utils.jsonify(client.partidos_ranking_poucos_votos(_args, poucos_votos))


@app.route('/candidatos/zerovotos', methods=['GET'])
@cross_origin()
def candidatos_zero_votos():
    _args = utils.mount_request(args.CANDIDATOS)
    return utils.jsonify(client.candidatos_poucos_votos(_args, 0))


@app.route('/candidatos/poucosvotos', methods=['GET'])
@cross_origin()
def candidatos_poucos_votos():
    _args = utils.mount_request(args.CANDIDATOS)
    poucos_votos = request.args.get('poucos_votos', default=3, type=int)
    return utils.jsonify(client.candidatos_poucos_votos(_args, poucos_votos))


@app.route('/eleitores/mulheres', methods=['GET'])
@cross_origin()
def mulheres_eleitoras_vs_eleitas():
    _args = utils.mount_request(args.ELEITORES)
    ano = request.args.get('ano', default=2016, type=int)
    return utils.jsonify(client.mulheres_eleitoras_vs_eleitas(_args, ano))


@app.route('/favicon.ico', methods=['GET'])
@cross_origin()
def favicon():
    return ''

@app.route('/', methods=['GET'])
@cross_origin()
def index():
    return 'hello world'


@app.route('/home', methods=['GET'])
@cross_origin()
def home():
    return ''
