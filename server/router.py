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
    return utils.jsonify(client.zero_votos())

@app.route('/zerovotos/mulheres', methods=['GET'])
def zero_votos_mulheres():
    return utils.jsonify(client.zero_votos_mulheres())



# Main
if __name__ == '__main__':
    app.run(debug=True)