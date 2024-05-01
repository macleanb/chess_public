/* Reference for checkmate in three moves:
   https://www.wikihow.com/Checkmate-in-3-Moves-in-Chess
*/
describe("1c-Rook Capture Tests", () => {
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

  it("Player1 makes first move-3", () => {
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

    /* Click on the pawn in square h2 */
    cy.get(".board .square").eq(55).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square h4 */
    cy.get(".board .square").eq(39).click();

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

  it("Player2 makes first move-4", () => {
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

    /* Click on square g5 */
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

  it("Player1 makes second move-5", () => {
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

    /* Click on the pawn in square h4 */
    cy.get(".board .square").eq(39).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square g5 */
    cy.get(".board .square").eq(30).click();

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

  it("Player2 makes second move-6", () => {
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

    /* Click on the pawn in square h7 */
    cy.get(".board .square").eq(48).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square h6 */
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

  it("Player1 makes third move-7", () => {
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

    /* Click on square a4 */
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

  it("Player2 makes third move-8", () => {
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

    /* Click on the pawn in square h6 */
    cy.get(".board .square").eq(40).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square g5 */
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

  it("Player1 makes fourth move-9", () => {
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

    /* Click on the pawn in square a3 */
    cy.get(".board .square").eq(40).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square a5 */
    cy.get(".board .square").eq(32).click();

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

  it("Player2 makes fourth move-10", () => {
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

    /* Click on the pawn in square h8 */
    cy.get(".board .square").eq(56).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square h2 */
    cy.get(".board .square").eq(8).click();

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

  it("Player1 makes fifth move-11", () => {
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

    /* Click on the rook in square h1 */
    cy.get(".board .square").eq(63).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square h2 */
    cy.get(".board .square").eq(55).click();

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
