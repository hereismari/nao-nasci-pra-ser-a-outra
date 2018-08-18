from flask import jsonify
from flask import request


# Auxiliar
def wrapper_result(output):
    return jsonify({'result' : output})

def mount_request(args):
    flask_args = {}
    for arg in args:
        flask_args[arg] = request.args.get(args[arg][0], default=args[arg][1], type=args[arg][2])
    return flask_args
