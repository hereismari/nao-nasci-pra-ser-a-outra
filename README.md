# nao-nasci-pra-ser-a-outra

Monitoramento do cumprimento da Lei nº 9504/97 que diz que, "cada partido ou coligação deve preencher, nas eleições proporcionais, o mínimo de 30% e o máximo de 70% para candidaturas de cada sexo"

## Preprocessamento

Todos os dados utilizados estão disponíveis no site do [TSE](http://www.tse.jus.br/eleicoes/estatisticas/repositorio-de-dados-eleitorais-1/repositorio-de-dados-eleitorais). 

Para gerar os arquivos .csv é necessário executar os seguintes passos:

1. Baixar os dados no site do [TSE](http://www.tse.jus.br/eleicoes/estatisticas/repositorio-de-dados-eleitorais-1/repositorio-de-dados-eleitorais). Dados utilizados:
 * Candidatos (formato zip)
 * Eleitorado (formato zip)
 * Votação nominal por município e zona (formato zip)
 * Relatórios financeiros (formato zip)
2. Renomear os arquivos `.txt` para `.csv`;
3. Unir os arquivos em um único arquivo csv chamado `merged.csv`. Pode-se utilizar o seguinte comando, dentro de cada diretório dos dados:
```
cat *.csv > merged.csv
```
4. Executar os scripts em R que processam os dados, localizados no diretório `r_scripts`. São eles:
 * `processa_candidatos.R`: Gera CSV com informações dos candidatos, como município, estado, partido, gênero, situação e total de votos; 
 * `processa_eleitores.R`: Gera CSV com informações dos eleitores, como cidade, estado, gênero, faixa etária e escolaridade.
 
 **TODO** Terminar 



## Front End

ReactJS

1. Para rodar o projeto React basta executar:

```
cd client
npm install
npm start
```

O cliente abrirá localmente em localhost:3000

## Back End

Python 3.6.

1. [Instalar mongodb](http://www.bogotobogo.com/python/MongoDB_PyMongo/python_MongoDB_pyMongo_tutorial_installing.php)
2. Iniciar mongodb: `sudo service mongod start`
3. Instalar dependências: `chmod +x install_python_requeriments.sh; bash install_python_requeriments.sh`
4. `cd server`
5. `python router.py`

## Popular banco

```bash
cd populate_database
python populate --caminho-dados <pasta onde os dados estao armazenados>
```
