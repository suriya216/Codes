class CarDetails {
  visit() {
    cy.visit("https://ci.policybazaar.com/v1?utm_content=home_v11");
  }
 
  clickPrimaryBtn() {
    cy.get("button.primaryBtnV2", { timeout: 30000 })
      .should('be.visible')
      .click().click();
  }
 
  verifyCarNumberError(invalidCarNumber) {
    cy.get('.redText', { timeout: 30000 })
      .should("have.text", invalidCarNumber);
  }
 
  clickCarRegDetailsButton() {
    cy.get('.CarRegDetails_blueTextButton__P1blP', { timeout: 30000 })
      .should('be.visible')
      .click();
  }
 
  clickTruncateFirst() {
    cy.get(':nth-child(1) > .truncate', { timeout: 30000 })
      .should('be.visible')
      .click();
  }
 
  clickKia() {
    cy.get('.kia', { timeout: 30000 })
      .should('be.visible')
      .click();
  }
 
  clickGridListItem(index) {
    cy.get(`.gridList > :nth-child(${index})`, { timeout: 30000 })
      .should('be.visible')
      .click();
  }
 
  waitForLoading(time = 30000) {
    cy.wait(time);
  }
 
  clickFourthGridItem() {
    cy.get(':nth-child(4) > .gridList > :nth-child(4)', { timeout: 30000 })
      .should('be.visible')
      .click();
  }
}  
 
export default new CarDetails();
 
