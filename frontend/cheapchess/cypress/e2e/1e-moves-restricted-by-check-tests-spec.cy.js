describe("1d-Moves Restricted by Check Tests", () => {
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

    /* Click the button to Show File/Rank Labels */
    cy.get("form button").contains("Show File/Rank Labels").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Select the checkbox to use Python Chess for Possible Moves */
    cy.get(".form-check-input").check();

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

    /* Click the button to Show File/Rank Labels */
    cy.get("form button").contains("Show File/Rank Labels").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Select the checkbox to use Python Chess for Possible Moves */
    cy.get(".form-check-input").check();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on the pawn in square c7 */
    cy.get(".board .square").eq(53).click();

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

    /* Click the button to Show File/Rank Labels */
    cy.get("form button").contains("Show File/Rank Labels").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Select the checkbox to use Python Chess for Possible Moves */
    cy.get(".form-check-input").check();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on the pawn in square h4 */
    cy.get(".board .square").eq(39).click();

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

    /* Click the button to Show File/Rank Labels */
    cy.get("form button").contains("Show File/Rank Labels").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Select the checkbox to use Python Chess for Possible Moves */
    cy.get(".form-check-input").check();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on the queen in square d8 */
    cy.get(".board .square").eq(60).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square a5 */
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

    /* Click the button to Show File/Rank Labels */
    cy.get("form button").contains("Show File/Rank Labels").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Select the checkbox to use Python Chess for Possible Moves */
    cy.get(".form-check-input").check();

    /* Wait for page load*/
    cy.wait(1000);

    /* Verify no piece is on square d3 */
    cy.get(".board .square").eq(43).find(".piece").should('not.exist');

    /* Verify a pawn is on square d2 */
    cy.get(".board .square").eq(51).find("[alt='a light pawn chess piece']").should('exist');

    /* Click on the pawn in square d2 */
    cy.get(".board .square").eq(51).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square d3 */
    cy.get(".board .square").eq(43).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Verify no piece is on square d3 */
    cy.get(".board .square").eq(43).find(".piece").should('not.exist');

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
