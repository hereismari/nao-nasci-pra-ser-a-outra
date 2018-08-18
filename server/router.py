# Dependencias
from flask import Flask
from flask import request
from database import Client

import utilities.utils as utils
import utilities.args as args

import os


# App
app = Flask(__name__)
app.config['MONGO_URI'] = os.environ['MONGODB_URI']

# Client MongoDB
client = Client(app)

# Rotas
@app.route('/partidos/participacao/mulheres', methods=['GET'])
def partidos_participacao_mulheres():
    _args = utils.mount_request(args.CANDIDATOS)
    return utils.jsonify(client.partidos_participacao_mulheres(_args))


@app.route('/partidos/ranking/zerovotos', methods=['GET'])
def partidos_ranking_zero_votos():
    _args = utils.mount_request(args.CANDIDATOS)
    return utils.jsonify(client.partidos_ranking_poucos_votos(_args, 0))


@app.route('/partidos/ranking/poucosvotos', methods=['GET'])
def partidos_ranking_poucos_votos():
    _args = utils.mount_request(args.CANDIDATOS)
    poucos_votos = request.args.get('poucos_votos', default=3, type=int)
    return utils.jsonify(client.partidos_ranking_poucos_votos(_args, poucos_votos))


@app.route('/candidatos/zerovotos', methods=['GET'])
def candidatos_zero_votos():
    _args = utils.mount_request(args.CANDIDATOS)
    return utils.jsonify(client.candidatos_poucos_votos(_args, 0))


@app.route('/candidatos/poucosvotos', methods=['GET'])
def candidatos_poucos_votos():
    _args = utils.mount_request(args.CANDIDATOS)
    poucos_votos = request.args.get('poucos_votos', default=3, type=int)
    return utils.jsonify(client.candidatos_poucos_votos(_args, poucos_votos))


@app.route('/eleitores/mulheres', methods=['GET'])
def mulheres_eleitoras_vs_eleitas():
    _args = utils.mount_request(args.ELEITORES)
    ano = request.args.get('ano', default=2016, type=int)
    return utils.jsonify(client.mulheres_eleitoras_vs_eleitas(_args, ano))


@app.route('/favicon.ico', methods=['GET'])
def favicon():
    return ''

@app.route('/', methods=['GET'])
def index():
    return 'hello world'


@app.route('/home', methods=['GET'])
def home():
    return ''


# Main
if __name__ == '__main__':
    PORT = int(os.environ['PORT'])
    app.run(debug=True, port=PORT)
