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
    

    def mulheres_eleitoras_vs_eleitas(self, args, ano):
        match = {
            'genero': 'FEMININO',
            'ano': ano
        }
        match = self._update_query({}, args)
        query = [{
                    '$match': match
                },
                {
                    '$group': {
                        '_id': {}, 
                        'eleitoras_mulheres': {
                            '$sum': '$idade'
                        }
                    }
                }
        ]

        x = [data for data in self.client.db.eleitores.aggregate(query)]
        print(x)



    def candidatos_poucos_votos(self, args, poucos_votos):
        query = {'total_votos': {'$lte': poucos_votos}}
        query = self._update_query(query, args)
        return [data for data in self.client.db.candidatos.find(query, {'_id': False})]


    def partidos_ranking_poucos_votos(self, args, poucos_votos):
        match = {
                    'total_votos': {'$lte': poucos_votos},
                    'sexo': 'FEMININO'
                }
        match = self._update_query(match, args)
        query = [{
                    '$match': match
                }, 
                {
                    '$group': {
                        '_id': {
                            'sigla_partido': '$sigla_partido'
                        }, 
                        'total_poucos_votos': {
                            '$sum': 1
                        }
                    }
                },
                {
                    '$sort': {
                        'total_poucos_votos': -1
                    }
                },
                {
                    '$limit': 3
                }
        ]

        return [data for data in self.client.db.candidatos.aggregate(query)]
    

    def partidos_participacao_mulheres(self, args):
        match = self._update_query({}, args)
        query = [
                {
                    '$match': match
                }, 
                {
                    '$project': {
                        'total_mulheres': {
                            '$cond': [{'$eq': ['$sexo', 'FEMININO']}, 1, 0]
                        },
                        'sigla_partido': '$sigla_partido'
                    }
                },
                {
                    '$group': {
                        '_id': {
                            'sigla_partido': '$sigla_partido'
                        }, 
                        'total': {
                            '$sum': 1
                        },
                        'total_mulheres': {
                            '$sum':  '$total_mulheres'
                        }
                    }
                },
                {
                    '$project': {
                        'porcentagem_mulheres': {
                            '$divide': ['$total_mulheres', '$total']
                        },
                        'total': '$total',
                        'total_mulheres': '$total_mulheres'
                    }
                },
                {
                    '$sort': {
                        'porcentagem_mulheres': -1
                    }
                }
        ]

        return [data for data in self.client.db.candidatos.aggregate(query)]