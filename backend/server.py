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

@app.route('/api/test-data', methods=['GET'])
def get_test_data():
    response = test_data
    return response

@app.route('/api/start-test', methods=['POST'])
def start_test():
    sid = str(uuid.uuid4())  # Create a new session ID
    session['sid'] = sid # Save it in the session
    session['user_audio_files'] = {}
    response = jsonify(
        {
            'message': f"Test has been started with session id: {sid}.",
            'session_id': sid,
        }
    )
    return response

@app.route('/api/test/item/<int:item_id>', methods=['GET', 'POST'])
def test_item(item_id):
    client_session_id = None
    try:
        client_session_id = session['sid']
    except:
        return {'error': 'Invalid session ID. Session not created.'}, 400  # bad request
    
    if request.method == 'GET':
        return {
            'item': {
                'word': test_data[item_id]['word'],
                'image': test_data[item_id]['image']
            }
        }, 200

    elif request.method == 'POST':  # put the audio file for the session
        word = test_data[item_id]['word']
        audio_file_name = f'audio_{word}.mp3'
        audio_file = request.files['audio']
        if not audio_file:
            return jsonify({'error': 'No audio file uploaded'}), 400
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
def submit():
    client_session_id = session.get('session_id')

    if not client_session_id:
        return {'error': 'Invalid session ID. Session not created.'}, 400  # bad request

    if len(session['user_audio_files']) < len(test_data):
        return jsonify({'error': 'Not all test items completed'}), 400

    # TODO: Process the audio files using ML model
    processed_results = {'status': 'Processed successfully'}

    # TODO: Generate a PDF with the results
    pdf_path = 'results/test_results.pdf'

    return send_file(pdf_path, as_attachment=True)


if __name__ == '__main__':
    app.run(debug=True, port=PORT)