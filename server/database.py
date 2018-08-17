from pymongo import MongoClient
from flask_pymongo import PyMongo


class Client(object):
    '''Wrapper para operacoes com banco de dados.'''
    def __init__(self, app):
        self.client = PyMongo(app)

    def zero_votos(self):
        return [data for data in self.client.db.candidatos.find({'total_votos': 0}, {'_id': False})]
    
    
    def zero_votos_mulheres(self):
        # TODO
        return [data for data in self.client.db.candidatos.find({'total_votos': 0}, {'_id': False})]