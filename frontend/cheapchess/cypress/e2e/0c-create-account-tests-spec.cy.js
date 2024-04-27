describe("0c-Account creation Tests", () => {
  it("Test the basic functionality of the Account Creation page", () => {
    cy.visit("/");

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");

    /* Click Sign Up button */
    cy.get("form button").contains('Sign Up').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Generate random number for user name.  This is necessary to
       easily allow multiple test runs without violating the rule against
       duplicate e-mails on the backend */
    const randInt = Math.floor(Math.random() * 100000)
    const randEmail = `delete${randInt}@email.com`
   
    /* Ensure input fields are visible and provide test inputs */
    cy.get("[placeholder='Enter e-mail address']").type(randEmail);
    cy.get("[placeholder='Enter password']").type('testtest');
    cy.get("[placeholder='Enter first name']").type('Delete');
    cy.get("[placeholder='Enter last name']").type('Me');

    /* Click Complete Registration button */
    cy.get("form button").contains('Complete Registration').click();

    /* Wait for page load*/
    cy.wait(1000);

    /* Ensure a modal is displayed with appropriate success message */
    cy.get(".modal-body")
      .should("have.text", "Success: Chess user Delete was successfully added.");
    cy.get("div button")
      .filter(':contains("Acknowledge")')
      .should("have.length", 1)
      .first()
      .click();

    /* Wait a second to let the modal clear */
    cy.wait(1000);

    /* Make sure Form is visible */
    cy.get("#AUTH_EMAIL_FIELD").should("exist");
  });
});
