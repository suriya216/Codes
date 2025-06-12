import CarDetails from '../support/Pages/carDetails.js';
import invalidPhone from '../support/Pages/Utilities.js';
 
describe('Policy Bazaar Flow', () => {

  let example;
  before(() => {
    cy.fixture('example').then((data) => {
      example = data;
    });
  });
 
  it('Navigation to Car Insurance page and ability to proceed without car number[smoke]', () => {

    CarDetails.visit();
 
    CarDetails.clickPrimaryBtn();
    CarDetails.verifyCarNumberError(example.carDetails.invalidCarNumber);
    CarDetails.clickCarRegDetailsButton();
  });

 
  it("To Verify accurate entry and acceptance of basic car details for new car.[smoke]",()=>{
    CarDetails.visit();
 
    CarDetails.clickPrimaryBtn();
    CarDetails.verifyCarNumberError(example.carDetails.invalidCarNumber);
    CarDetails.clickCarRegDetailsButton();

    CarDetails.clickTruncateFirst();
    CarDetails.clickKia();
 
    CarDetails.clickGridListItem(5);
    CarDetails.clickGridListItem(1);
    CarDetails.waitForLoading();
 
    CarDetails.clickGridListItem(1);
    CarDetails.clickFourthGridItem();
 
  })

  it("To Verify error message for phone number entry with less than 10 digits [smoke]",()=>{
    invalidPhone.carVisit();
    cy.wait(20000);
    invalidPhone.typeName(example.invalidPhone.name);
    invalidPhone.typeMobile(example.invalidPhone.mobile.shortNumeric);

    invalidPhone.clickSubmit();
    invalidPhone.verifyMobileError(example.contactDetails.invalidMobileNumber);
 
   
  })

  it("To Verify error message for phone number entry with more than 10 digits [regression]",()=>{
    invalidPhone.carVisit();
    //invalidPhone.preload();
    cy.wait(20000);
    invalidPhone.typeName(example.invalidPhone.name);
    var ph=example.invalidPhone.mobile.longNumeric

  
    invalidPhone.typeMobile(ph);
    invalidPhone.checkMobileNumber(ph);
 
  })

  it("To Verify error message on entering non-numeric characters in phone number field [regression]",()=>{
    invalidPhone.carVisit();
    //invalidPhone.preload();
    cy.wait(20000);
    invalidPhone.typeName(example.invalidPhone.name);
    invalidPhone.typeMobile(example.invalidPhone.mobile.alphabetic);


    invalidPhone.clickSubmit();
    invalidPhone.verifyMobileError(example.contactDetails.invalidMobileNumber);
  })
   
});
 
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
 