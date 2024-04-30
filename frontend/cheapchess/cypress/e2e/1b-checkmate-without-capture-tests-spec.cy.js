/* Reference for checkmate wihout capturing any pieces (Mar 9, 2023):
   https://www.chess.com/forum/view/general/checkmate-without-cutting-any-pieces
*/
describe("1b Checkmate without Capturing any Pieces Tests", () => {
  it("Player1 creates a new game-1", () => {
    cy.visit("/");

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");

    /* Enter valid user information and click Sign In button */
    cy.get("[placeholder='Enter e-mail address']").type('ada@email.com');
    cy.get("[placeholder='Enter password']").type('testtest');
    cy.get("form button").contains('Sign In').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure welcome message is visible */
    cy.get("h1").should("have.text", "Welcome Ada!");

    /* Click New Game button and ensure a new game is created */
    cy.get("form button").contains('New Game').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure game controls banner is visible */
    cy.get("h1").should("have.text", "Game Controls");

    /* Ensure Player information is populated correctly */
    cy.get("h5").should("have.text", "Player 1: AdaPlayer 2: OpenWaiting for opponent to join...");

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Quit Game').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Sign Out').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");
  });

  it("Player 2 joins the new game-2", () => {
    cy.visit("/");

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");

    /* Enter valid user information and click Sign In button */
    cy.get("[placeholder='Enter e-mail address']").type('chuck@email.com');
    cy.get("[placeholder='Enter password']").type('testtest');
    cy.get("form button").contains('Sign In').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure welcome message is visible */
    cy.get("h1").should("have.text", "Welcome Charles!");

    /* Click New Game button and ensure a new game is created */
    cy.get("form button").contains('Show Playable Games').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure playable gamess banner is visible */
    cy.get(".offcanvas").find(".offcanvas-title").should("have.text", "List of Playable Games");

    /* Ensure Player information is populated correctly */
    cy.get(".offcanvas button").last().should("have.text", "Join").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Quit Game').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Sign Out').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");
  });

  it("Player1 makes first move (e4)-3", () => {
    cy.visit("/");

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");

    /* Enter valid user information and click Sign In button */
    cy.get("[placeholder='Enter e-mail address']").type('ada@email.com');
    cy.get("[placeholder='Enter password']").type('testtest');
    cy.get("form button").contains('Sign In').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure welcome message is visible */
    cy.get("h1").should("have.text", "Welcome Ada!");

    /* Click show games button */
    cy.get("form button").contains('Show Playable Games').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure playable gamess banner is visible */
    cy.get(".offcanvas").find(".offcanvas-title").should("have.text", "List of Playable Games");

    /* Ensure Player information is populated correctly */
    cy.get(".offcanvas button").last().should("have.text", "Join").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure Player information is populated correctly */
    cy.get("h5").should("have.text", "Player 1: AdaPlayer 2: CharlesIt's Ada's turn");

    /* Select the checkbox to use Python Chess for Possible Moves */
    cy.get(".form-check-input").check();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on the pawn in square e2 */
    cy.get(".board .square").eq(52).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square e4 */
    cy.get(".board .square").eq(36).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Quit Game').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Sign Out').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");
  });

  it("Player2 makes first move (e5) -4", () => {
    cy.visit("/");

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");

    /* Enter valid user information and click Sign In button */
    cy.get("[placeholder='Enter e-mail address']").type('chuck@email.com');
    cy.get("[placeholder='Enter password']").type('testtest');
    cy.get("form button").contains('Sign In').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure welcome message is visible */
    cy.get("h1").should("have.text", "Welcome Charles!");

    /* Click show games button */
    cy.get("form button").contains('Show Playable Games').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure playable gamess banner is visible */
    cy.get(".offcanvas").find(".offcanvas-title").should("have.text", "List of Playable Games");

    /* Ensure Player information is populated correctly */
    cy.get(".offcanvas button").last().should("have.text", "Join").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure Player information is populated correctly */
    cy.get("h5").should("have.text", "Player 1: AdaPlayer 2: CharlesIt's Charles's turn");

    /* Select the checkbox to use Python Chess for Possible Moves */
    cy.get(".form-check-input").check();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on the pawn in square e7 */
    cy.get(".board .square").eq(51).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square e5 */
    cy.get(".board .square").eq(35).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Quit Game').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Sign Out').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");
  });

  it("Player1 makes second move (Qh5) -5", () => {
    cy.visit("/");

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");

    /* Enter valid user information and click Sign In button */
    cy.get("[placeholder='Enter e-mail address']").type('ada@email.com');
    cy.get("[placeholder='Enter password']").type('testtest');
    cy.get("form button").contains('Sign In').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure welcome message is visible */
    cy.get("h1").should("have.text", "Welcome Ada!");

    /* Click show games button */
    cy.get("form button").contains('Show Playable Games').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure playable gamess banner is visible */
    cy.get(".offcanvas").find(".offcanvas-title").should("have.text", "List of Playable Games");

    /* Ensure Player information is populated correctly */
    cy.get(".offcanvas button").last().should("have.text", "Join").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Select the checkbox to use Python Chess for Possible Moves */
    cy.get(".form-check-input").check();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click the button to Show File/Rank Labels */
    cy.get("form button").contains("Show File/Rank Labels").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on the queen in square d1 */
    cy.get(".board .square").eq(59).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square h5 */
    cy.get(".board .square").eq(31).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Quit Game').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Sign Out').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");
  });

  it("Player2 makes second move (Nc6) -6", () => {
    cy.visit("/");

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");

    /* Enter valid user information and click Sign In button */
    cy.get("[placeholder='Enter e-mail address']").type('chuck@email.com');
    cy.get("[placeholder='Enter password']").type('testtest');
    cy.get("form button").contains('Sign In').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure welcome message is visible */
    cy.get("h1").should("have.text", "Welcome Charles!");

    /* Click show games button */
    cy.get("form button").contains('Show Playable Games').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure playable gamess banner is visible */
    cy.get(".offcanvas").find(".offcanvas-title").should("have.text", "List of Playable Games");

    /* Ensure Player information is populated correctly */
    cy.get(".offcanvas button").last().should("have.text", "Join").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Select the checkbox to use Python Chess for Possible Moves */
    cy.get(".form-check-input").check();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click the button to Show File/Rank Labels */
    cy.get("form button").contains("Show File/Rank Labels").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on the knight in square b8 */
    cy.get(".board .square").eq(62).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square c6 */
    cy.get(".board .square").eq(45).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Quit Game').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Sign Out').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");
  });

  it("Player1 makes 3d move (Bc4) -7", () => {
    cy.visit("/");

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");

    /* Enter valid user information and click Sign In button */
    cy.get("[placeholder='Enter e-mail address']").type('ada@email.com');
    cy.get("[placeholder='Enter password']").type('testtest');
    cy.get("form button").contains('Sign In').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure welcome message is visible */
    cy.get("h1").should("have.text", "Welcome Ada!");

    /* Click show games button */
    cy.get("form button").contains('Show Playable Games').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure playable gamess banner is visible */
    cy.get(".offcanvas").find(".offcanvas-title").should("have.text", "List of Playable Games");

    /* Ensure Player information is populated correctly */
    cy.get(".offcanvas button").last().should("have.text", "Join").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Select the checkbox to use Python Chess for Possible Moves */
    cy.get(".form-check-input").check();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click the button to Show File/Rank Labels */
    cy.get("form button").contains("Show File/Rank Labels").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on the queen in square f1 */
    cy.get(".board .square").eq(61).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square c4 */
    cy.get(".board .square").eq(34).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Quit Game').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Sign Out').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");
  });

  it("Player2 makes 3d move (g6) -8", () => {
    cy.visit("/");

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");

    /* Enter valid user information and click Sign In button */
    cy.get("[placeholder='Enter e-mail address']").type('chuck@email.com');
    cy.get("[placeholder='Enter password']").type('testtest');
    cy.get("form button").contains('Sign In').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure welcome message is visible */
    cy.get("h1").should("have.text", "Welcome Charles!");

    /* Click show games button */
    cy.get("form button").contains('Show Playable Games').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure playable gamess banner is visible */
    cy.get(".offcanvas").find(".offcanvas-title").should("have.text", "List of Playable Games");

    /* Ensure Player information is populated correctly */
    cy.get(".offcanvas button").last().should("have.text", "Join").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Select the checkbox to use Python Chess for Possible Moves */
    cy.get(".form-check-input").check();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click the button to Show File/Rank Labels */
    cy.get("form button").contains("Show File/Rank Labels").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on the pawn in square g7 */
    cy.get(".board .square").eq(49).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square g6 */
    cy.get(".board .square").eq(41).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Quit Game').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Sign Out').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");
  });

  it("Player1 makes 4th move (Qd1) -9", () => {
    cy.visit("/");

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");

    /* Enter valid user information and click Sign In button */
    cy.get("[placeholder='Enter e-mail address']").type('ada@email.com');
    cy.get("[placeholder='Enter password']").type('testtest');
    cy.get("form button").contains('Sign In').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure welcome message is visible */
    cy.get("h1").should("have.text", "Welcome Ada!");

    /* Click show games button */
    cy.get("form button").contains('Show Playable Games').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure playable gamess banner is visible */
    cy.get(".offcanvas").find(".offcanvas-title").should("have.text", "List of Playable Games");

    /* Ensure Player information is populated correctly */
    cy.get(".offcanvas button").last().should("have.text", "Join").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Select the checkbox to use Python Chess for Possible Moves */
    cy.get(".form-check-input").check();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click the button to Show File/Rank Labels */
    cy.get("form button").contains("Show File/Rank Labels").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on the queen in square h5 */
    cy.get(".board .square").eq(31).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square d1 */
    cy.get(".board .square").eq(59).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Quit Game').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Sign Out').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");
  });

  it("Player2 makes 4th move (f5) -10", () => {
    cy.visit("/");

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");

    /* Enter valid user information and click Sign In button */
    cy.get("[placeholder='Enter e-mail address']").type('chuck@email.com');
    cy.get("[placeholder='Enter password']").type('testtest');
    cy.get("form button").contains('Sign In').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure welcome message is visible */
    cy.get("h1").should("have.text", "Welcome Charles!");

    /* Click show games button */
    cy.get("form button").contains('Show Playable Games').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure playable gamess banner is visible */
    cy.get(".offcanvas").find(".offcanvas-title").should("have.text", "List of Playable Games");

    /* Ensure Player information is populated correctly */
    cy.get(".offcanvas button").last().should("have.text", "Join").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Select the checkbox to use Python Chess for Possible Moves */
    cy.get(".form-check-input").check();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click the button to Show File/Rank Labels */
    cy.get("form button").contains("Show File/Rank Labels").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on the pawn in square f7 */
    cy.get(".board .square").eq(50).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square f5 */
    cy.get(".board .square").eq(34).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Quit Game').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Sign Out').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");
  });

  it("Player1 makes 5th move (f3) -11", () => {
    cy.visit("/");

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");

    /* Enter valid user information and click Sign In button */
    cy.get("[placeholder='Enter e-mail address']").type('ada@email.com');
    cy.get("[placeholder='Enter password']").type('testtest');
    cy.get("form button").contains('Sign In').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure welcome message is visible */
    cy.get("h1").should("have.text", "Welcome Ada!");

    /* Click show games button */
    cy.get("form button").contains('Show Playable Games').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure playable gamess banner is visible */
    cy.get(".offcanvas").find(".offcanvas-title").should("have.text", "List of Playable Games");

    /* Ensure Player information is populated correctly */
    cy.get(".offcanvas button").last().should("have.text", "Join").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Select the checkbox to use Python Chess for Possible Moves */
    cy.get(".form-check-input").check();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click the button to Show File/Rank Labels */
    cy.get("form button").contains("Show File/Rank Labels").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on the pawn in square f2 */
    cy.get(".board .square").eq(53).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square f3 */
    cy.get(".board .square").eq(45).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Quit Game').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Sign Out').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");
  });

  it("Player2 makes 5th move (Bc5) -12", () => {
    cy.visit("/");

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");

    /* Enter valid user information and click Sign In button */
    cy.get("[placeholder='Enter e-mail address']").type('chuck@email.com');
    cy.get("[placeholder='Enter password']").type('testtest');
    cy.get("form button").contains('Sign In').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure welcome message is visible */
    cy.get("h1").should("have.text", "Welcome Charles!");

    /* Click show games button */
    cy.get("form button").contains('Show Playable Games').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure playable gamess banner is visible */
    cy.get(".offcanvas").find(".offcanvas-title").should("have.text", "List of Playable Games");

    /* Ensure Player information is populated correctly */
    cy.get(".offcanvas button").last().should("have.text", "Join").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Select the checkbox to use Python Chess for Possible Moves */
    cy.get(".form-check-input").check();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click the button to Show File/Rank Labels */
    cy.get("form button").contains("Show File/Rank Labels").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on the bishop in square f8 */
    cy.get(".board .square").eq(58).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square c5 */
    cy.get(".board .square").eq(37).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Quit Game').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Sign Out').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");
  });

  it("Player1 makes 6th move (a3) -13", () => {
    cy.visit("/");

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");

    /* Enter valid user information and click Sign In button */
    cy.get("[placeholder='Enter e-mail address']").type('ada@email.com');
    cy.get("[placeholder='Enter password']").type('testtest');
    cy.get("form button").contains('Sign In').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure welcome message is visible */
    cy.get("h1").should("have.text", "Welcome Ada!");

    /* Click show games button */
    cy.get("form button").contains('Show Playable Games').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure playable gamess banner is visible */
    cy.get(".offcanvas").find(".offcanvas-title").should("have.text", "List of Playable Games");

    /* Ensure Player information is populated correctly */
    cy.get(".offcanvas button").last().should("have.text", "Join").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Select the checkbox to use Python Chess for Possible Moves */
    cy.get(".form-check-input").check();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click the button to Show File/Rank Labels */
    cy.get("form button").contains("Show File/Rank Labels").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on the pawn in square a2 */
    cy.get(".board .square").eq(48).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square a3 */
    cy.get(".board .square").eq(40).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Quit Game').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Sign Out').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");
  });

  it("Player2 makes 6th move (f4) -14", () => {
    cy.visit("/");

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");

    /* Enter valid user information and click Sign In button */
    cy.get("[placeholder='Enter e-mail address']").type('chuck@email.com');
    cy.get("[placeholder='Enter password']").type('testtest');
    cy.get("form button").contains('Sign In').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure welcome message is visible */
    cy.get("h1").should("have.text", "Welcome Charles!");

    /* Click show games button */
    cy.get("form button").contains('Show Playable Games').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure playable gamess banner is visible */
    cy.get(".offcanvas").find(".offcanvas-title").should("have.text", "List of Playable Games");

    /* Ensure Player information is populated correctly */
    cy.get(".offcanvas button").last().should("have.text", "Join").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Select the checkbox to use Python Chess for Possible Moves */
    cy.get(".form-check-input").check();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click the button to Show File/Rank Labels */
    cy.get("form button").contains("Show File/Rank Labels").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on the pawn in square f5 */
    cy.get(".board .square").eq(34).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square f4 */
    cy.get(".board .square").eq(26).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Quit Game').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Sign Out').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");
  });

  it("Player1 makes 7th move (b4) -15", () => {
    cy.visit("/");

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");

    /* Enter valid user information and click Sign In button */
    cy.get("[placeholder='Enter e-mail address']").type('ada@email.com');
    cy.get("[placeholder='Enter password']").type('testtest');
    cy.get("form button").contains('Sign In').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure welcome message is visible */
    cy.get("h1").should("have.text", "Welcome Ada!");

    /* Click show games button */
    cy.get("form button").contains('Show Playable Games').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure playable gamess banner is visible */
    cy.get(".offcanvas").find(".offcanvas-title").should("have.text", "List of Playable Games");

    /* Ensure Player information is populated correctly */
    cy.get(".offcanvas button").last().should("have.text", "Join").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Select the checkbox to use Python Chess for Possible Moves */
    cy.get(".form-check-input").check();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click the button to Show File/Rank Labels */
    cy.get("form button").contains("Show File/Rank Labels").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on the pawn in square b3 */
    cy.get(".board .square").eq(41).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square b4 */
    cy.get(".board .square").eq(33).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Quit Game').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Sign Out').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");
  });

  it("Player2 makes 7th move (Qh4+) -16", () => {
    cy.visit("/");

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");

    /* Enter valid user information and click Sign In button */
    cy.get("[placeholder='Enter e-mail address']").type('chuck@email.com');
    cy.get("[placeholder='Enter password']").type('testtest');
    cy.get("form button").contains('Sign In').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure welcome message is visible */
    cy.get("h1").should("have.text", "Welcome Charles!");

    /* Click show games button */
    cy.get("form button").contains('Show Playable Games').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure playable gamess banner is visible */
    cy.get(".offcanvas").find(".offcanvas-title").should("have.text", "List of Playable Games");

    /* Ensure Player information is populated correctly */
    cy.get(".offcanvas button").last().should("have.text", "Join").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Select the checkbox to use Python Chess for Possible Moves */
    cy.get(".form-check-input").check();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click the button to Show File/Rank Labels */
    cy.get("form button").contains("Show File/Rank Labels").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on the queen in square d8 */
    cy.get(".board .square").eq(60).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square h4 */
    cy.get(".board .square").eq(24).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Quit Game').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Sign Out').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");
  });

  it("Player1 makes 8th move (Kf1) -17", () => {
    cy.visit("/");

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");

    /* Enter valid user information and click Sign In button */
    cy.get("[placeholder='Enter e-mail address']").type('ada@email.com');
    cy.get("[placeholder='Enter password']").type('testtest');
    cy.get("form button").contains('Sign In').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure welcome message is visible */
    cy.get("h1").should("have.text", "Welcome Ada!");

    /* Click show games button */
    cy.get("form button").contains('Show Playable Games').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure playable gamess banner is visible */
    cy.get(".offcanvas").find(".offcanvas-title").should("have.text", "List of Playable Games");

    /* Ensure Player information is populated correctly */
    cy.get(".offcanvas button").last().should("have.text", "Join").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Select the checkbox to use Python Chess for Possible Moves */
    cy.get(".form-check-input").check();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click the button to Show File/Rank Labels */
    cy.get("form button").contains("Show File/Rank Labels").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on the king in square e1 */
    cy.get(".board .square").eq(41).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square b4 */
    cy.get(".board .square").eq(33).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Quit Game').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click signout button and ensure we return to Sign In component */
    cy.get("form button").contains('Sign Out').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");
  });
});
