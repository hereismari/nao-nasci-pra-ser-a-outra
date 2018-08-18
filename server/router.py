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
def participacao_mulheres():
    _args = utils.mount_request(args.CANDIDATOS)
    return utils.jsonify(client.participacao_mulheres(_args))


@app.route('/partidos/ranking/zerovotos', methods=['GET'])
def ranking_zero_votos():
    return utils.jsonify(client.ranking_zero_votos())


@app.route('/partidos/ranking/poucosvotos', methods=['GET'])
def ranking_poucos_votos():
    _args = utils.mount_request(args.CANDIDATOS)
    poucos_votos = request.args.get('poucos_votos', default=3, type=int)
    return utils.jsonify(client.ranking_poucos_votos(_args, poucos_votos))



@app.route('/candidatos/zerovotos', methods=['GET'])
def zero_votos():
    _args = utils.mount_request(args.CANDIDATOS)
    return utils.jsonify(client.zero_votos(_args))


@app.route('/candidatos/poucosvotos', methods=['GET'])
def poucos_votos():
    _args = utils.mount_request(args.CANDIDATOS)
    poucos_votos = request.args.get('poucos_votos', default=3, type=int)
    return utils.jsonify(client.poucos_votos(_args, poucos_votos))


# Main
if __name__ == '__main__':
    app.run(debug=True)