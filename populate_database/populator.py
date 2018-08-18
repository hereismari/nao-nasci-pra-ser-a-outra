import csv
from pymongo import MongoClient


class Populator(object):
    def __init__(self, db_name='nao-nasci'):
        self._client = MongoClient('localhost', 27017)
        self._db = self._client[db_name]

        self._dict_db = {
            'candidatos': self._db.candidatos,
            'eleitores': self._db.eleitores
        }

        self._clean_up()


    def _clean_up(self):
        self._db.candidatos.delete_many({})
        self._db.eleitores.delete_many({})


    def populate(self, file_type, path):
        self.default_populate(path, self._dict_db[file_type])

    def default_populate(self, filename, doc):
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
