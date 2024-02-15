# Welcome to CheapChess
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_"The leading free chess tutor that leverages AI technology for guided, experiential learning."_\
                       - Unattributed Author

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
https://www.youtube.com/watch?v=_tYuhnlw7OU
https://www.youtube.com/watch?v=JJ9fkYX7q4A

## Backend - create a Django REST project
### Install Dependencies
Run pip install -r requirements.txt to ensure all required dependiences are installed
for this Django REST application

### Create a Local Database and a superuser account
Recommend creating a database using PostgreSQL ($ createdb cheapchess)
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
