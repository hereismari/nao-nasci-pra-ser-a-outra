from populator import Populator

import os

import argparse
parser = argparse.ArgumentParser(description='Popular banco do Nao Nasci pra ser a outra.')
parser.add_argument('--caminho-dados', type=str, default='../data/')


FILES = ['candidatos'] 
YEARS = ['2016']


def main(args):
    populator = Populator()
    for f in FILES:
        for year in YEARS:
            filename = os.path.join(args.caminho_dados, f + '_' + year + '.csv')
            populator.populate(f, filename)



if __name__ == '__main__':
    args = parser.parse_args()
    main(args)