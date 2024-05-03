/* Reference for checkmate in three moves:
   https://www.wikihow.com/Checkmate-in-3-Moves-in-Chess
*/
describe("1f-3mate Suggestion Tests", () => {
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

    /* Ensure Player information is populated correctly */
    cy.get("h5").should("have.text", "Player 1: AdaPlayer 2: CharlesIt's Ada's turn");

    /* Select the checkbox to use Python Chess for Possible Moves */
    cy.get(".form-check-input").check();

    /* Wait for page load*/
    cy.wait(1000);

    /* Verify a pawn is NOT on square e4 */
    cy.get(".board .square").eq(36).find("[alt='a light pawn chess piece']").should('not.exist');

    /* Click on the pawn in square e2 */
    cy.get(".board .square").eq(52).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square e4 */
    cy.get(".board .square").eq(36).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Verify a pawn is on square e4 */
    cy.get(".board .square").eq(36).find("[alt='a light pawn chess piece']").should('exist');

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

    /* Ensure Player information is populated correctly */
    cy.get("h5").should("have.text", "Player 1: AdaPlayer 2: CharlesIt's Charles's turn");

    /* Select the checkbox to use Python Chess for Possible Moves */
    cy.get(".form-check-input").check();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click the button to get suggested move */
    cy.get("form button").contains("Suggest Move").click();

    /* Wait for page load*/
    cy.wait(2000);

    /* Verify a pawn is NOT on square f5 */
    cy.get(".board .square").eq(34).find("[alt='a dark pawn chess piece']").should('not.exist');

    /* Click on the pawn in square f7 */
    cy.get(".board .square").eq(50).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square f5 */
    cy.get(".board .square").eq(34).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Verify a pawn is on square f5 */
    cy.get(".board .square").eq(34).find("[alt='a dark pawn chess piece']").should('exist');

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

    /* Ensure Player information is populated correctly */
    cy.get("h5").should("have.text", "Player 1: AdaPlayer 2: CharlesIt's Ada's turn");

    /* Select the checkbox to use Python Chess for Possible Moves */
    cy.get(".form-check-input").check();

    /* Wait for page load*/
    cy.wait(1000);

    /* Verify a dark pawn is on square f5 */
    cy.get(".board .square").eq(29).find("[alt='a dark pawn chess piece']").should('exist');

    /* Click on the pawn in square e4 */
    cy.get(".board .square").eq(36).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square f5 */
    cy.get(".board .square").eq(29).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Verify a light pawn is on square f5 */
    cy.get(".board .square").eq(29).find("[alt='a light pawn chess piece']").should('exist');

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

    /* Ensure Player information is populated correctly */
    cy.get("h5").should("have.text", "Player 1: AdaPlayer 2: CharlesIt's Charles's turn");

    /* Select the checkbox to use Python Chess for Possible Moves */
    cy.get(".form-check-input").check();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click the button to get suggested move */
    cy.get("form button").contains("Suggest Move").click();

    /* Wait for page load*/
    cy.wait(2000);

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

    /* Ensure Player information is populated correctly */
    cy.get("h5").should("have.text", "Player 1: AdaPlayer 2: CharlesIt's Ada's turn");

    /* Select the checkbox to use Python Chess for Possible Moves/Suggested Moves */
    cy.get(".form-check-input").first().check();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click the button to get suggested move */
    cy.get("form button").contains("Suggest Move").click();

    /* Wait for page load*/
    cy.wait(2000);

    /* Click on the queen in square d1 */
    cy.get(".board .square").eq(59).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square h5 */
    cy.get(".board .square").eq(31).click();

    /* Wait for page load*/
    cy.wait(3000);
  
    /* Ensure a modal is displayed with appropriate endgame message */
    cy.get(".modal-body").should("have.text", "CHECK MATE: Congratulations Ada, you won the game!");
    cy.get("div button")
      .filter(':contains("Acknowledge")')
      .should("have.length", 1)
      .first()
      .click();

    /* Wait for page to load */
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
