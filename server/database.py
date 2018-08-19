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


    def historico(self):
        return [data for data in self.client.db.historico.find({}, {'_id': False})]
    

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

        return [data for data in self.client.db.eleitores.aggregate(query)]


    def partidos_ranking_zero_votos(self, args):
        match = self._update_query({}, args)
        query = [{
                    '$match': match
                }, 
                {
                    '$group': {
                        '_id': {
                            'sigla_partido': '$sigla_partido'
                        },
                        'total_mulheres': {
                            '$sum': '$total_candidatas'
                        },
                        'total_mulheres_zero': {
                            '$sum': '$cont_candidatas_zero_voto'
                        }
                    }
                },
                {
                    '$project': {
                        '_id': '$_id',
                        'porcent_zero': {
                            '$divide': ['$total_mulheres_zero', '$total_mulheres']
                        },
                        'total_mulheres': '$total_mulheres',
                        'total_mulheres_zero': '$total_mulheres_zero'
                    }
                },
                {
                    '$sort': {
                        'porcent_zero': -1
                    }
                },
                {
                    '$limit': 3
                }
        ]

        return [data for data in self.client.db.partidos.aggregate(query)]


    def partidos_media_zero_votos(self, args):
        match = self._update_query({}, args)
        query = [{
                    '$match': match
                }, 
                {
                    '$group': {
                        '_id': {
                            'sigla_partido': '$sigla_partido'
                        }, 
                        'total': {
                            '$sum': '$cont_candidatas_zero_voto'
                        }
                    }
                },
                {
                    '$group': {
                        '_id': {}, 
                        'total': {
                            '$avg': '$total'
                        }
                    }
                }
        ]

        return [data for data in self.client.db.partidos.aggregate(query)]
    

    def partidos_participacao_mulheres(self, args):
        match = self._update_query({}, args)
        query = [
                {
                    '$match': match
                },
                {
                    '$group': {
                        '_id': {
                            'sigla_partido': '$sigla_partido'
                        }, 
                        'total': {
                            '$sum': '$total_candidatos'
                        },
                        'total_mulheres': {
                            '$sum':  '$total_candidatas'
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

        return [data for data in self.client.db.partidos.aggregate(query)]