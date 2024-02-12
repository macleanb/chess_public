# This is the user guide for the CheapChess backend

## Installing Dependencies
Run pip install -r requirements.txt to ensure all required dependiences are installed
for this Django REST application

## Creating a Local Database
Recommend creating a database using PostgreSQL ($ createdb cheapchess)
This app uses Django REST framework to interact with the database

## Downloading Free Chess Images
You can download free chess images from flaticon.com.  Once you download them, you can import them into your database
by running the attached seed.py file that includes all the icon urls.  Make sure to attribute the icons to
flaticon.com wherever you display them by putting this link on the webpage.
<a href="https://www.flaticon.com/free-icons/chess" title="chess icons">Chess icons created by apien - Flaticon</a>
