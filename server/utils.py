from flask import jsonify


# Auxiliar
def wrapper_result(output):
    return jsonify({'result' : output})