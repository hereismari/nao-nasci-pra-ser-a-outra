import csv
from pymongo import MongoClient


class Populator(object):
    def __init__(self, db_name='nao-nasci'):
        self._client = MongoClient('localhost', 27017)
        self._db = self._client[db_name]

        self._populate = {
            'candidatos': self.populate_candidatos
        }

        self._preprocess = {
            'candidatos': self.default_preprocess
        }

        self._clean_up()


    def _clean_up(self):
        self._db.candidatos.delete_many({})


    def populate(self, file_type, path):
        if file_type in self._preprocess and file_type in self._populate:
            data = self._preprocess[file_type](path)
            self._populate[file_type](data)
        else:
            raise Exception('Funcao para preprocessar ou popular %s nao existe.' % file_type)


    def default_preprocess(self, filename):
        data = []
        with open(filename, encoding='utf-8') as csv_file:
            csv_reader = csv.DictReader(csv_file)
            for row in csv_reader:
                for key in row:
                    try:
                        row[key] = float(row[key])
                    except:
                        continue
                data.append(row)
        
        return data
    

    def populate_candidatos(self, data):
        for d in data:
            self._db.candidatos.insert_one(d)
