from app import app
import views

def main():
    app.run(debug=True, port=5001)


if __name__ == '__main__':
    main()
