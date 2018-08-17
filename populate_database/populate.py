from populator import Populator

import os

import argparse
parser = argparse.ArgumentParser(description='Popular banco do Nao Nasci pra ser a outra.')
parser.add_argument('--caminho-dados', type=str, default='../data/')


def main(args, files=['candidatos', 'eleitores']):
    populator = Populator()
    for f in files:
        filename = os.path.join(args.caminho_dados, f + '.csv')
        populator.populate(f, filename)


if __name__ == '__main__':
    args = parser.parse_args()
    main(args)