from server.router import app

if __name__ == '__main__':
    PORT = int(os.environ['PORT'])
    app.run(debug=True, port=PORT)
