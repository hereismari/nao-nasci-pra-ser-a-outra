# nao-nasci-pra-ser-a-outra

Monitoramento do cumprimento da Lei nº 9504/97 que diz que, "cada partido ou coligação deve preencher, nas eleições proporcionais, o mínimo de 30% e o máximo de 70% para candidaturas de cada sexo"

## Preprocessamento

TODO (@hadrizia)

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
4. Definir variável MONGODB_URI: `export MONGODB_URI='mongodb://localhost:27017/nao-nasci'`
5. `PORT=5000 python run.py`


## Popular banco

```bash
cd populate_database
python populate --caminho-dados <pasta onde os dados estao armazenados>
```
