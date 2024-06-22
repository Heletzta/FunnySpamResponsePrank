import os
from openai import OpenAI
from flask import Flask, request, jsonify
import json

app = Flask(__name__)

client = OpenAI(
    # This is the default and can be omitted
    api_key=os.environ.get(""), 
)

#receive json-formatted input with "prompt" being the actual prompt sent to ChatGPT
actualPrompt = ""
data = {
    "prompt": '''Reply to this scam email with an email that will make the scammer think they're succeeding at scamming the user. 
    Only reply with the response email, don't add anything else. This is the scam email: \n''' + actualPrompt
}

# Convert the dictionary to a JSON string
json_data = json.dumps(data)

@app.route('/generate-response', methods=['POST'])
def generate_response():
    #data = request.get_json()
    data = json_data
    prompt = data.get('prompt')
    response = client.chat.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    return jsonify(response.choices[0].message['content'])

if __name__ == '__main__':    
    app.run(debug=True)

