import csv
from pymongo import MongoClient

import os


class Populator(object):
    def __init__(self):
        self._client = MongoClient(os.environ['MONGODB_URI'])
        self._db = self._client[os.environ['MONGODB_NAME']]

        self._populate = {
            'historico': self._default_populate,
            'partidos': self._default_populate,
        }

        self._dict_collection = {
            'historico': self._db.historico,
            'partidos': self._db.partidos,
        }

        self._clean_up()


    def _clean_up(self):
        self._db.partidos.delete_many({})
        self._db.historico.delete_many({})


    def populate(self, file_type, filename):
        if file_type in self._populate:
            self._populate[file_type](filename, self._dict_collection[file_type])
        else:
            raise Exception('Funcao para popular %s nao existente' % file_type)


    ''' A pressa eh amiga da perfeicao
    def _populate_partidos(self, filename):
        print('Popula partidos')
        data = []
        with open(filename, encoding='utf-8') as csv_file:
            csv_reader = csv.DictReader(csv_file, delimiter=';')
            counter = 0
            for row in csv_reader:
                import ipdb; ipdb.set_trace()
                if row['num_turno'] != '1':
                    continue
                
                if row['desc_sit_candidato'] in ['RENÚNCIA', 'CANCELAMENTO']:
                    continue
                
                # construindo dado a ser salvo
                data_row = {}
                data_row['ano_eleicao'] = int(row['ano_eleicao'])
                data_row['sigla_uf'] = row['sigla_uf']
                data_row['nome_municipio'] = row['nome_municipio']
                data_row['eleito'] = 1 if row['desc_sit_cand_tot'] == 'ELEITO' else 0
                data_row['sigla_partido'] = row['sigla_partido']

                if row['sexo'] == 'FEMININO':
                    data_row['sexo'] = 1
                elif row['sexo'] == 'MASCULINO':
                    data_row['sexo'] = 0
                else:
                    data_row['sexo'] = -1

                # adicionando ao banco
                data.append(data_row)
                counter += 1
                if counter % 10000 == 0:
                    print('Inserindo no banco %d...' % counter)
                    self._db.candidatos.insert_many(data)
                    data = []
    '''

    def _default_populate(self, filename, doc):
        data = []
        with open(filename, encoding='utf-8') as csv_file:
            csv_reader = csv.DictReader(csv_file, delimiter=';')
            for row in csv_reader:
                data_row = {}
                for key in row:
                    if key == '':
                        continue
                    try:
                        data_row[key] = float(row[key])
                    except:
                        data_row[key] = row[key]
                data.append(data_row)
        
        doc.insert_many(data)
        
