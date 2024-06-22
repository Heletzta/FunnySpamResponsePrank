import os
from openai import OpenAI
from flask import Flask, request, jsonify
import json

app = Flask(__name__)


@app.route('/generate-response', methods=['POST'])
def generate_response():
    client = OpenAI()
    data = request.get_json()
    spamEmail = data.get('spamEmail')
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "system", "content": "You are to responsd to this scam email with an email that will make the scammer think they're succeeding at scamming the user. Fill in any blanks with realistic information. Only reply with the response email, don't add anything else."},
                    {"role": "user", "content": spamEmail}]
    )
    return jsonify(response.choices[0].message.content)

if __name__ == '__main__':    
    app.run(debug=True)


