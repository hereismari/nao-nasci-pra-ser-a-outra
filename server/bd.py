from pymongo import MongoClient
from flask_pymongo import PyMongo


class Client(object):
    '''Wrapper para operacoes com banco de dados.'''
    def __init__(self, app):
        self.client = PyMongo(app)
    
    def zero_votos(self):
        zero_votos = self.client.db.zero_votos
        output = []
        for s in zero_votos.find():
            output.append({'nome' : s['nome']})
        return output


