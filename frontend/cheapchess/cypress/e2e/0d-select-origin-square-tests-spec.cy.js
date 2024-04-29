describe("0d-Select Origin Square Tests", () => {
  it("Test the functionality of the game board: selecting origin squares-1", () => {
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

  it("Test the functionality of the game board: selecting origin squares-2", () => {
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

  it("Test the functionality of the game board: selecting origin squares-3", () => {
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

    /* Click on the pawn in square a2 */
    cy.get(".board .square").eq(48).click();

    /* Wait for page load*/
    cy.wait(5000);

    /* Ensure the clicked square now has a border */
    cy.get(".board .square").eq(48).should('have.css', 'border', '5px solid rgb(255, 170, 0)');

    /* Ensure at least one square on the board turns lightgreen */
    cy.get(".board .square").eq(40).should('have.css', 'background-color', 'rgb(144, 238, 144)');

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

  it("Test the functionality of the game board: de-selecting origin squares-4", () => {
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
    cy.get("form button").contains('Show Playable Games').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure playable gamess banner is visible */
    cy.get(".offcanvas").find(".offcanvas-title").should("have.text", "List of Playable Games");

    /* Ensure Player information is populated correctly */
    cy.get(".offcanvas button").last().should("have.text", "Join").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on the pawn in square a2 */
    cy.get(".board .square").eq(48).click();

    /* Wait for page load*/
    cy.wait(5000);

    /* Ensure the clicked square now has a border */
    cy.get(".board .square").eq(48).should('have.css', 'border', '5px solid rgb(255, 170, 0)');

    /* Ensure at least one square on the board turns lightgreen */
    cy.get(".board .square").eq(40).should('have.css', 'background-color', 'rgb(144, 238, 144)');

    /* Click on the pawn in square a2 again */
    cy.get(".board .square").eq(48).click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure the clicked square no longer have a border */
    cy.get(".board .square").eq(48).should('not.have.css', 'border', '5px solid rgb(255, 170, 0)');

    /* Ensure the square that was highlighted green is no longer green */
    cy.get(".board .square").eq(40).should('not.have.css', 'background-color', 'rgb(144, 238, 144)');

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

  it("Test the functionality of the game board: changing origin squares-5", () => {
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
    cy.get("form button").contains('Show Playable Games').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure playable gamess banner is visible */
    cy.get(".offcanvas").find(".offcanvas-title").should("have.text", "List of Playable Games");

    /* Ensure Player information is populated correctly */
    cy.get(".offcanvas button").last().should("have.text", "Join").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on the pawn in square a2 */
    cy.get(".board .square").eq(48).click();

    /* Wait for page load*/
    cy.wait(5000);

    /* Ensure the clicked square now has a border */
    cy.get(".board .square").eq(48).should('have.css', 'border', '5px solid rgb(255, 170, 0)');

    /* Ensure at least one square on the board turns lightgreen */
    cy.get(".board .square").eq(40).should('have.css', 'background-color', 'rgb(144, 238, 144)');

    /* Click on the pawn in square a3 to change origin square selection */
    cy.get(".board .square").eq(49).click();

    /* Wait for page load*/
    cy.wait(5000);

    /* Ensure the original clicked square no longer has a border */
    cy.get(".board .square").eq(48).should('not.have.css', 'border', '5px solid rgb(255, 170, 0)');

    /* Ensure the square that was highlighted green is no longer green */
    cy.get(".board .square").eq(40).should('not.have.css', 'background-color', 'rgb(144, 238, 144)');

    /* Ensure the new clicked square now has a border */
    cy.get(".board .square").eq(49).should('have.css', 'border', '5px solid rgb(255, 170, 0)');

    /* Ensure a new square on the board turns lightgreen */
    cy.get(".board .square").eq(41).should('have.css', 'background-color', 'rgb(144, 238, 144)');

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

  it("Test the functionality of the game board: attempting selection of invalid origin squares-empty-6", () => {
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
    cy.get("form button").contains('Show Playable Games').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure playable gamess banner is visible */
    cy.get(".offcanvas").find(".offcanvas-title").should("have.text", "List of Playable Games");

    /* Ensure Player information is populated correctly */
    cy.get(".offcanvas button").last().should("have.text", "Join").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square a3 (invalid origin square-empty) */
    cy.get(".board .square").eq(40).click();

    /* Wait for page load*/
    cy.wait(5000);

    /* Ensure the clicked square does not have a border */
    cy.get(".board .square").eq(40).should('not.have.css', 'border', '5px solid rgb(255, 170, 0)');

    /* Ensure no squares are highlighted green */
    cy.get(".board .square").should('not.have.css', 'background-color', 'rgb(144, 238, 144)');

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

  it("Test the functionality of the game board: attempting selection of invalid origin squares-opponent piece-7", () => {
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
    cy.get("form button").contains('Show Playable Games').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure playable gamess banner is visible */
    cy.get(".offcanvas").find(".offcanvas-title").should("have.text", "List of Playable Games");

    /* Ensure Player information is populated correctly */
    cy.get(".offcanvas button").last().should("have.text", "Join").click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click on square a8 (invalid origin square-opponent piece) */
    cy.get(".board .square").first().click();

    /* Wait for page load*/
    cy.wait(5000);

    /* Ensure the clicked square does not have a border */
    cy.get(".board .square").first().should('not.have.css', 'border', '5px solid rgb(255, 170, 0)');

    /* Ensure no squares are highlighted green */
    cy.get(".board .square").should('not.have.css', 'background-color', 'rgb(144, 238, 144)');

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
