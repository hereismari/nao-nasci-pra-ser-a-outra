from pymongo import MongoClient
from flask_pymongo import PyMongo


class Client(object):
    '''Wrapper para operacoes com banco de dados.'''
    def __init__(self, app):
        self.client = PyMongo(app)


    def _update_query(self, query, args):
        for arg in args:
            if args[arg] is not None:
                query[arg] = args[arg]
        return query


    def zero_votos(self, args):
        query = {'total_votos': 0}
        query = self._update_query(query, args)
        return [data for data in self.client.db.candidatos.find(query, {'_id': False})]
    

    def poucos_votos(self, args, poucos_votos):
        query = {'total_votos': {'$lte': poucos_votos}}
        query = self._update_query(query, args)
        return [data for data in self.client.db.candidatos.find(query, {'_id': False})]


    def ranking_zero_votos(self, args):
        # TODO: faltando sexo = 'feminino'
        query = [{'$match': {'total_votos': 0}}, {'$group': {'_id': {'sigla_partido': '$sigla_partido'}, 'total_zeros': {'$sum': 1}}}]
        return [data for data in self.client.db.candidatos.aggregate(query)]