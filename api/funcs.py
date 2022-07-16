import pymysql
import json
from db_funcs import connect_to_db

def get_data_about_all_skills():
    with connect_to_db() as connection:
        with connection.cursor() as cursor:
            sql_query = 'select * from skill'
            cursor.execute(sql_query)
            skills = [{'id': element[0], 'name': element[1], 'slug': element[2]} for element in cursor.fetchall()]

            sql_query = 'select meta_value from meta_job where meta_key=\'skill\''
            cursor.execute(sql_query)
            job_skills = [json.loads(element[0]) for element in cursor.fetchall()]

            for skill in skills:
                skill['count'] = 0
                for job_skill in job_skills:
                    if skill['id'] in job_skill:
                        skill['count'] += 1
            return sort_list_of_dicts(skills, 'count')


def get_advanced_skillinfo(skills_name_str):
    searched_skills_slug = [element.replace('-', '_') for element in skills_name_str.split(',')]
    with connect_to_db() as connection:
        with connection.cursor() as cursor:
            searched_skills_id = []
            for slug in searched_skills_slug:
                sql_query = 'select id from skill where slug = \'{}\''.format(slug)
                if cursor.execute(sql_query):
                    searched_skills_id.append(cursor.fetchone()[0])

            sql_query = 'select * from skill where id != {}'.format(searched_skills_id[0])
            for id in searched_skills_id[1:]:
                sql_query += f' and id != {id}'
            cursor.execute(sql_query)
            skills = [{'id': element[0], 'name': element[1], 'slug': element[2]} for element in cursor.fetchall()]

            sql_query = 'select meta_value from meta_job where meta_key=\'skill\''
            cursor.execute(sql_query)
            job_skills = [json.loads(element[0]) for element in cursor.fetchall()]

            for skill in skills:
                skill['count'] = 0
                searched_skills_id.append(skill['id'])
                for job_skill in job_skills:
                    if all([element in job_skill for element in searched_skills_id]):
                        skill['count'] += 1
                searched_skills_id.pop()

            result = {'searched_skills': []}
            for id in searched_skills_id:
                sql_query = f'select * from skill where id={id}'
                cursor.execute(sql_query)
                element = cursor.fetchone()
                result['searched_skills'].append({'id': element[0], 'name': element[1], 'slug': element[2]})

            result['result'] = sort_list_of_dicts(skills, 'count')
            return result



def sort_list_of_dicts(l, key):
    result = sorted(l, key=lambda d: d[key])
    result.reverse()
    return result
