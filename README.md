# Welcome to CheapChess
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_"The leading free chess tutor that leverages AI technology for guided, experiential learning."_\
                       - Unattributed Author

Welcome to CheapChess, where beginners who don't want to pay the high cost of exquisite chess tutors can settle for the best
that artificial intelligence can offer.  Of course, large-language models (LLMs) aren't perfect - they can be slow, and they
can be wrong.  But, as beginners to the game of chess, we aren't aiming for perfect.  Mediocrity is just fine with us --
as long as we have fun, and save some cash!

## Frontend - create an app the easy way
Navigate to frontend directory
npx create-react-app cheapchess
cd into cheapchess directory and run:
  - npm install axios
  - npm install react-router-dom
  - npm install react-bootstrap
  - npm install bootstrap@5.3.2 (or latest version), and copy/paste 'import "bootstrap/dist/css/bootstrap.min.css";' into App.js
  - npm install openai (for openai api calls - I don't think dotenv is needed)
Create .env file inside app directory (same directory as src) and paste api key (make sure .gitignore ignores this file!)

### OpenAPI guide
Create a .env file on the backend and add .env to .gitignore (your API key
will be stored here with one line - export OPEN_AI_KEY="abcdefg...")
To access this api key in your env variables, install python-dotenv:
pip install python-dotenv
In your view, access the key with:
from dotenv import load_dotenv
load_dotenv()
api_key = os.environ.get("OPEN_AI_KEY")
https://www.youtube.com/watch?v=_tYuhnlw7OU
https://www.youtube.com/watch?v=JJ9fkYX7q4A

## Backend - create a Django REST project
### Install Dependencies
Run pip install -r requirements.txt to ensure all required dependiences are installed
for this Django REST application

### Create a Local Database and a superuser account
Recommend creating a database using PostgreSQL ($ createdb cheapchess_db)
seed your db with the icons by running the seeds.sql file in the icons_app directory
This app uses Django REST framework to interact with the database

### Download Free Chess Images
You can download free chess images from flaticon.com.  Once you download them, you can import them into your database
by logging into your database as an admin.  Make sure to name the pieces according to the naming scheme in the frontend
(constants.js  MAPPING_BOARD_INITIAL_PIECE_PLACES) and give them a useful description ('a dark pawn chess piece').
Make sure to attribute the icons to flaticon.com wherever you display them by putting this link on the webpage:
<a href="https://www.flaticon.com/free-icons/chess" title="chess icons">Chess icons created by apien - Flaticon</a> (Dark Knight)
<a href="https://www.flaticon.com/free-icons/pawn" title="pawn icons">Pawn icons created by VectorPortal - Flaticon</a> (Dark Pawn, Light Pawn)
<a href="https://www.flaticon.com/free-icons/chess" title="chess icons">Chess icons created by deemakdaksina - Flaticon</a> (Dark Rook, Light Rook, Dark King)
<a href="https://www.flaticon.com/free-icons/chess-piece" title="chess piece icons">Chess piece icons created by Freepik - Flaticon</a> (Dark Bishop, Light King)
<a href="https://www.flaticon.com/free-icons/chess" title="chess icons">Chess icons created by Victoruler - Flaticon</a> (Dark Queen, Light Queen)
<a href="https://www.flaticon.com/free-icons/chess" title="chess icons">Chess icons created by SBTS2018 - Flaticon</a> (Light Knight)
<a href="https://www.flaticon.com/free-icons/chess-piece" title="chess piece icons">Chess piece icons created by rizal2109 - Flaticon</a> (Light Bishop)

### Activate Virtual Environment
Navigate to wherever your virtual environment directory is located (i.e. ~ or CheapChess/backend/)
source <virtual environment name>/bin/activate (source default/bin/activate)

### Start backend server
Navigate to CheapChess/backend/
python manage.py runserver

### Start frontend server/app
Navigate to CheapChess/frontend/cheapchess
npm start


