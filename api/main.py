from flask import Flask, request
from flask_restful import Api, Resource

from funcs import get_data_about_all_skills, get_advanced_skillinfo

app = Flask(__name__)
api = Api()

class Main(Resource):
    def get(self):
        return get_data_about_all_skills()


class AdvancedSkillInfo(Resource):
    def post(self):
        return get_advanced_skillinfo(request.form['skills'])


api.add_resource(Main, '/api/main')
api.add_resource(AdvancedSkillInfo, '/api/advanced-skillinfo')
api.init_app(app)


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
