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

## Backend - create a Django REST project
### Install Dependencies
Run pip install -r requirements.txt to ensure all required dependiences are installed
for this Django REST application

### Create a Local Database and a superuser account
Recommend creating a database using PostgreSQL ($ createdb cheapchess)
This app uses Django REST framework to interact with the database

### Download Free Chess Images
You can download free chess images from flaticon.com.  Once you download them, you can import them into your database
by running the attached seed.py file that includes all the icon urls.  Make sure to attribute the icons to
flaticon.com wherever you display them by putting this link on the webpage.
<a href="https://www.flaticon.com/free-icons/chess" title="chess icons">Chess icons created by apien - Flaticon</a>
