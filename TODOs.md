### Legend
-----------------------------------------------------------------------------------------------------------------------------------------
* *** indicates currently working
* 'F' indicates Frontend
* 'B' indicates Backend


### Must Do(s)
-----------------------------------------------------------------------------------------------------------------------------------------
*** Name / Task:
1. TBD / (F/B): Allow a user to create a new game in GAME_NEW_CONTINUE_MODE, selecting their player color and whether they want to play against the computer.  If they select computer, the backend should update the Game field player2, player2_color, game_type, created_datetime, started_datetime, game_status. Display game pieces provided from backend.
2. TBD / (F/B): Display open games in GAME_NEW_CONTINUE_MODE (with open player color) and allow user to join open games with the open player colorby clicking a 'Join Game' button.  Should update the backend Game field player2, player2_color, game_type, started_datetime, game_status. Display game pieces provided from backend.
3. TBD / (F): Implement click/drag/unclick piece behavior to trigger a makeMove() frontend function (task below).
4. TBD / (F/B): Implement a frontend makeMove() function that will send an API PUT message to a game view on the backend.  Backend should return updated pieces for frontend to display.  Backend should handle capturing pieces.  Should update current_rank, current_file, and on_board fields on backend Piece model.  Should update whose_turn, last_turn_datetime on backend Game model.  Should ask OpenAI if the board configuration is a checkmate situation and -- if so -- update game_status, ended_datetime, game_winner on backend Game model.   Frontend should display a congratulatory message to the winner and lock-out click/drag behavior on pieces.
5. TBD / (F/B): Implement a game refresh function that updates game data every few seconds or so.  Alternatively, implement sockets/channels to automatically monitor updates from other player's actions.
5. TBD / (F/B): Feature for game chat window to the right of the chess board
6. TBD / (F): Add optional rank/file labels to board (use checkbox to toggle display on and off)
7. Brian / (B): Ensure new games (open) created_datetime is set. 
8. Name / Task: 


### Requests for Help, Design Changes
-----------------------------------------------------------------------------------------------------------------------------------------
*** Name / Task:
1. Name / Request:
2. Name / Request:
3. Name / Request:


### Like-To-Do(s)
-----------------------------------------------------------------------------------------------------------------------------------------
*** Name / Task:
1. Name / Task:
2. Name / Task:


### Team Role(s)
-----------------------------------------------------------------------------------------------------------------------------------------
* Github Integration / Test / Deployment/ Documentation (Team Coordinator) (1-2 F/B)
* Feature xyz building (1-2 F/B)
* Responsiveness and Art -- Styling, Sizing, and Mobile-Readiness (1 F)
* Additional API Integration (1-2 F/B)

* Authentication and Permissions (1-2 F/B)
* Pure Frontend (1-2 F)
* Pure Backend (1-2 B)
