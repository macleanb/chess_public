describe("0a-Create Game Tests", () => {
  it("Test the basic functionality of the game menu page: creating a new game", () => {
    cy.visit("/");

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");

    /* Enter valid user information and click Sign In button */
    cy.get("[placeholder='Enter e-mail address']").type('testuser@email.com');
    cy.get("[placeholder='Enter password']").type('testtest');
    cy.get("form button").contains('Sign In').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure welcome message is visible */
    cy.get("h1").should("have.text", "Welcome Test!");

    /* Click New Game button and ensure a new game is created */
    cy.get("form button").contains('New Game').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure game controls banner is visible */
    cy.get("h1").should("have.text", "Game Controls");

    /* Ensure Player information is populated correctly */
    cy.get("h5").should("have.text", "Player 1: TestPlayer 2: OpenWaiting for opponent to join...");

    /* Click the button to show file/rank labels */
    cy.get('button').contains('Show File/Rank Labels').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure the first square label (upper left corner) shows 'a8' */
    cy.get('.square').first().should('have.text', 'a8');

    /* Click the button to quit the game */
    cy.get('button').contains('Quit Game').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Select dark color */
    cy.get('.playercolorselect select').select('dark');

    /* Wait for page load*/
    cy.wait(1000);

    /* Click New Game button and ensure a new game is created */
    cy.get("form button").contains('New Game').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Click the button to show file/rank labels */
    cy.get('button').contains('Show File/Rank Labels').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure the first square label (upper left corner) shows 'h1' */
    cy.get('.square').first().should('have.text', 'h1');

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
