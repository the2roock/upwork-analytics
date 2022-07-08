from app import app
from flask import render_template, redirect
import requests


@app.route('/')
def index():
    data = requests.get('http://localhost:5000/api/main').json()
    return render_template('index.html', data=data)

@app.route('/advanced-statistic/<skills_name>')
def advanced_statistic(skills_name):
    data = {'skills': skills_name}
    response = requests.post('http://localhost:5000/api/advanced-skillinfo', data)
    return render_template('advanced_skillinfo.html', data=response.json())
