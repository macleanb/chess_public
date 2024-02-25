-- run with database=# \i /Users/Wendy/Desktop/BriansCode/whiskey_platoon/CheapChess/backend/icons_app/seeds.sql

COPY icons_app_icon FROM '/Users/Wendy/Desktop/BriansCode/whiskey_platoon/CheapChess/backend/icons_app/icons.csv' DELIMITER ',' CSV HEADER;
SELECT setval('icons_app_icon_id_seq', 13, true);  -- next value will be 13