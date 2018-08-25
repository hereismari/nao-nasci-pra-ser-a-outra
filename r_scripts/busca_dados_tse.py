# Author: Marianne Linhares, mariannelinharesm@gmail.com
# Last change: 08/2018
# About: script que baixa todos os dados do TSE necessários para preprocessamento dos dados em R.

import urllib.request
import os
import sys

import tarfile
import zipfile


def print_about():
    print('Esse script baixa todos os dados do TSE necessarios para preprocessamento dos dados em R.')
    print('-' * 50)
    print('Isso pode levar alguns minutos... paciencia eh uma virtude :) ...')


def download_data_from_url(url, output_dir, filename):    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    filename = os.path.join(output_dir, filename)
    if not os.path.exists(filename):
        print('\nDownloading %s' % url)
        urllib.request.urlretrieve(url=url, filename=filename, reporthook=print_download_progress)
        maybe_unzip(filename, output_dir)


def maybe_unzip(filename, output_dir):
    if filename.endswith(".zip"):
        # Unpack the zip-file.
        zipfile.ZipFile(file=filename, mode="r").extractall(output_dir)
    elif filename.endswith((".tar.gz", ".tgz")):
        # Unpack the tar-ball.
        tarfile.open(name=filename, mode="r:gz").extractall(output_dir)


def print_download_progress(count, block_size, total_size):
    """
        Function used for printing the download progress.
        This function is from https://github.com/Hvass-Labs/TensorFlow-Tutorials/blob/master/download.py
    """
    # Percentage completion
    pct_complete = float(count * block_size) / total_size

    # Status-message. Note the \r which means the line should overwrite itself
    msg = "\r- Download progress: {0:.1%}".format(pct_complete)

    # Print it
    sys.stdout.write(msg)
    sys.stdout.flush()   


def busca_dados_eleitores(anos=[2012, 2014, 2016]):
    for ano in anos:
        url = 'http://agencia.tse.jus.br/estatistica/sead/odsele/perfil_eleitorado/perfil_eleitorado_%s.zip' % ano
        download_data_from_url(url, '../data/eleitores/', 'eleitores_%s.zip' % ano)

def busca_dados_candidatos(anos=[2012, 2014, 2016]):
    for ano in anos:
        url = 'http://agencia.tse.jus.br/estatistica/sead/odsele/votacao_candidato_munzona/votacao_candidato_munzona_%s.zip' % ano
        download_data_from_url(url, '../data/candidatos/%s' % ano, 'votacao_%s.zip' % ano)


    for ano in anos:
        url = 'http://agencia.tse.jus.br/estatistica/sead/odsele/consulta_cand/consulta_cand_%s.zip' % ano
        download_data_from_url(url, '../data/candidatos/%s' % ano, 'info_%s.zip' % ano)


def main():
    print_about()
    busca_dados_eleitores()
    busca_dados_candidatos()


if __name__ == '__main__':
    main()


