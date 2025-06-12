import travelForm from "../support/Pages/TravelInsurance";
 
describe("Hackathon Project", () => {
  const TravelForm = new travelForm();
 
  beforeEach(() => {
    Cypress.on("uncaught:exception", () => {
      return false;
    });
  });
 
  it("To Verify seamless navigation to Travel Insurance page.", () => {
    cy.travelPage();
    TravelForm.initialPage();
  });
    
 
  it("To Verify accurate selection of a European country and dummy travel dates.[regression]", () => {
    cy.travelPage();
    TravelForm.CountryAndDateSelection(travelVisit);
  });
 
  it('To Verify error message for selecting past travel start dates.[regression]',()=>{   
    cy.travelPage();
    TravelForm.checkInvalidDate()
  })
 
  it('To Verify error message for selecting travel end date before start date.[regression]',()=>{  
    cy.travelPage();
    TravelForm.checkEndDateselection()
  })
 
  it("To Verify successful selection of 2 travelers (Ages 22, 21).[smoke]", () => {
    cy.travelPage();
    TravelForm.Passenger(travelVisit);
  });
 
  it("To Verify display of enquiry contact information.[sanity]", () => {
    cy.travelPage();
    TravelForm.CallDetails();
  });
 
  it("To Verify behavior when no destination is selected but user attempts to proceed.[smoke]", () => {
    cy.travelPage();
    TravelForm.Date();
    TravelForm.Passenger();
    TravelForm.CallDetails();
    TravelForm.Result();
    TravelForm.CountryErrorCheck();
  });
 
  it("To verify behaviour when no traveller information is selected but user attempts to proceed.[smoke]", () => {
    cy.travelPage();
    TravelForm.Date();
    TravelForm.Country();
    TravelForm.CallDetails();
    TravelForm.Result();
    TravelForm.TravellerErrorCheck();
  });
});
 
 
 