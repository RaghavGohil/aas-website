from dotenv import load_dotenv
load_dotenv()
from flask import Flask, request, session, jsonify, send_file
from flask_cors import CORS
from flask_session import Session
import os
import tempfile
import uuid
import json

# create the application
app = Flask(__name__)

PORT = os.getenv('PORT')
SESSION_SECRET = os.getenv('SESSION_SECRET')

CORS(app, supports_credentials=True) # allow all origins!

app.secret_key = SESSION_SECRET
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_COOKIE_SECURE'] = True 
app.config['SESSION_COOKIE_SAMESITE'] = 'None' # this was so hard to configure :(

Session(app)

test_data = None
with open('test_data.json', encoding='utf8') as f:
    test_data = json.load(f)
test_data = [{'word': item['word'], 'image': item['image'], 'ipa': item['ipa']} for item in test_data]

@app.route('/api/test/start', methods=['POST'])
def start_test():
    sid = str(uuid.uuid4())  # Create a new session ID
    session['sid'] = sid # Save it in the session
    session['user_audio_files'] = {}
    response = jsonify(
        {
            'message': f"Test has been started with session id: {sid}.",
            'session_id': sid,
            'test_data': test_data,
        }
    )
    return response

@app.route('/api/test/user-information', methods=['POST'])
def user_information():

    client_session_id = None
    try:
        client_session_id = session['sid']
    except:
        return {'message': 'Invalid session ID. Session not created.'}, 400  # bad request

    try:
        session['age'] = request.json['age']
        session['location'] = request.json['location'] # store the user information in the session

    except:
        return {'message': 'Error setting personal information in server session.'}, 400  # bad request
        
    return { 'message': 'Server has recieved your personal information.', }, 200

@app.route('/api/test/upload-audio/<int:item_id>', methods=['POST'])
def upload_audio(item_id):

    client_session_id = None
    try:
        client_session_id = session['sid']
    except:
        return {'message': 'Invalid session ID. Session not created.'}, 400  # bad request

    word = test_data[item_id]['word']
    audio_file_name = f'audio_{word}.wav'

    audio_file = None
    try:
        audio_file = request.files['audio']
    except:
        return jsonify({'message': 'Could not retrieve audio file.'}), 404

    audio_file_path = f'uploads/{client_session_id}'
    if not os.path.exists(audio_file_path):
        os.makedirs(audio_file_path)
    audio_file.save(os.path.join(audio_file_path, audio_file_name))
    session['user_audio_files'][client_session_id] = {
        'word': word,
        'audio_file': os.path.join(audio_file_path, audio_file_name)
    }
    print("Session contents before request:", dict(session))
    return {'message': 'Audio uploaded successfully to the server!',
                    'session_id': client_session_id, 'item_id': item_id}, 201


@app.route('/api/test/submit', methods=['POST'])
def submit_test():

    client_session_id = None
    try:
        client_session_id = session['sid']
    except:
        return {'message': 'Invalid session ID. Session not created.'}, 400  # bad request

    return {'message': f'message from the server!{client_session_id}'}


if __name__ == '__main__':
    app.run(debug=True, port=PORT)