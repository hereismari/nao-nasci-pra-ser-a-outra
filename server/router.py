# Dependencias
from flask import Flask
from flask import request

from database import Client
import utils


# App
app = Flask(__name__)
app.config['MONGO_DBNAME'] = 'nao-nasci'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/%s' % app.config['MONGO_DBNAME']

# Client MongoDB
client = Client(app)


# Rotas
@app.route('/zerovotos', methods=['GET'])
def zero_votos():
    args = {
      'sexo': request.args.get('sexo', default=None, type=str),
      'partido': request.args.get('partido', default=None, type=str),
      'sigla_uf': request.args.get('sigla_uf', default=None, type=str),
      'nome_municipio': request.args.get('nome_municipio', default=None, type=str),
    }
    return utils.jsonify(client.zero_votos(args))



# Main
if __name__ == '__main__':
    app.run(debug=True)