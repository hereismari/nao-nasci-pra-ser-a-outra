# Dependencias
from flask import Flask
from flask import request
from database import Client

import utilities.utils as utils
import utilities.args as args


# App
app = Flask(__name__)
app.config['MONGO_DBNAME'] = 'nao-nasci'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/%s' % app.config['MONGO_DBNAME']

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


# Main
if __name__ == '__main__':
    app.run(debug=True)