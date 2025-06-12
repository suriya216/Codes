class travelForm {
  initialPage() {
    let googleVisit, googleSearch, travelVisit;
    cy.fixture("travelForm")
      .then((data) => {
        googleVisit = data.googleVisit;
        googleSearch = data.googleSearch;
        travelVisit = data.travelVisit;
      })
      .then(() => {
        Cypress.on("uncaught:exception", () => {
          return false;
        });
        this.home(googleVisit, googleSearch, travelVisit);
        this.TravelVisit(travelVisit);
        this.HealthVisit(travelVisit);
        this.CarVisit(travelVisit);
      });
  }

  home(googleVisit, googleSearch) {
    cy.visit(googleVisit);
    cy.get("textarea.gLFyf").type(googleSearch);
    cy.get(".sbct.PZPZlf").get('[data-view-type="1"]').eq(0).click();
    cy.pause();
    cy.get('[data-dtld="policybazaar.com"]').eq(0).click();
  }

  TravelVisit(travelVisit) {
    cy.origin(travelVisit, () => {
      cy.contains("p", "Travel").click({ force: true });
    });
    cy.get(".newPq_destination_wrap")
      .find("h1")
      .should("contain.text", "Where are you travelling?");
    cy.go(-1);
  }
  HealthVisit(travelVisit) {
    cy.origin(travelVisit, () => {
      cy.get(".prd-block.health")
        .find("a")
        .contains("Health")
        .click({ force: true });
      
    });
    cy.get(".pq5Step_stepSubTitle").then((e) => {
      expect(e.text()).to.equal("Select members you want to insure");
    });
    cy.go("back");
  }

  CarVisit(travelVisit) {
    cy.origin(travelVisit, () => {
      cy.get(".prd-block.car").find("a").contains("Car").click({ force: true });
    });
    cy.get(".headingV3.fontNormal").then((e) => {
      expect(e.text()).to.equal("Brand new car? Click here ");
    });
    cy.go(-1);
  }

  CountryAndDateSelection(travelVisit) {
    cy.get(".countryButton", { timeout: 40000 })
      .contains("Schengen")
      .click({ multiple: true });
    cy.get(".check-wrapper.select-box-wrapper")
      .contains("France")
      .click({ multiple: true });
    cy.get(".travel_main_cta").contains("Add").click({ multiple: true });
    cy.get(".newPq_duration_wrap__dateCol")
      .contains("Start date")
      .click({ multiple: true });
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + 30);
    const options = { month: "short", day: "numeric", year: "numeric" };
    let srtDate = today.toLocaleDateString("en-US", options);
    let endDay = endDate.toLocaleDateString("en-US", options);
    cy.get(`button[aria-label="${srtDate}"]`, { timeout: 30000 }).click({
      force: true,
    });
    cy.get(".MuiSvgIcon-root").click({ multiple: true, force: true });
    cy.get(`button[aria-label="${endDay}"]`).click({ force: true });
    //cy.get('.travel_main_cta').contains("Done").click({multiple:true})
    cy.get(".travel_main_cta").click({ multiple: true, force: true });
  }

  Date() {
    cy.reload();
    cy.get(".newPq_duration_wrap__dateCol")
      .contains("Start date")
      .click({ multiple: true });
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + 30);
    const options = { month: "short", day: "numeric", year: "numeric" };
    let srtDate = today.toLocaleDateString("en-US", options);
    let endDay = endDate.toLocaleDateString("en-US", options);
    cy.get(`button[aria-label="${srtDate}"]`, { timeout: 20000 }).click({
      force: true,
    });
    cy.get(".MuiSvgIcon-root").click({ multiple: true, force: true });
    cy.get(`button[aria-label="${endDay}"]`).click({ force: true });
    cy.get(".travel_main_cta").click({ multiple: true, force: true });
  }

  Country() {
    cy.get(".countryButton", { timeout: 40000 })
      .contains("Schengen")
      .click({ multiple: true });
    cy.get(".check-wrapper.select-box-wrapper")
      .contains("France")
      .click({ multiple: true });
    cy.get(".travel_main_cta").contains("Add").click({ multiple: true });
  }

  Passenger() {
    cy.get(".newPq_travellers_wrap")
      .find("a")
      .contains("+ Add ")
      .click({ force: true });
    cy.get('label[for="traveller_2"]', { timeout: 30000 })
      .should("be.visible")
      .click();
    cy.get("#divarrow_undefined").click();
    cy.get('label[for="21 years_undefined"]').contains("21 years").click();
    cy.get("#1").contains("Select age of traveller 2").click();
    cy.get('label[for="22 years_undefined"]').contains("22 years").click();
    cy.get("#ped_no").click();
    cy.get(".travel_main_cta").click({ multiple: true, force: true });
    //cy.get('.travel_main_cta').contains('Done').click({multiple:true})
  }

  Result() {
    cy.get(".travel_main_cta").contains("View plans ›").click({ force: true });
  }

  CallDetails() {
    cy.get('.pqHeader__callUsWrapper a[aria-label="header__callUs"]')
      .first()
      .trigger("mouseover", { force: true });
    cy.get(".toll_wrapper_web", { timeout: 20000 })
      .invoke("show")
      .should("be.visible");
    cy.wait(1000);
    cy.get(".toll_wrapper_web>.toll_inner_wrapper").each(($el, index) => {
      const contactNumber = $el.text().trim();
      cy.log(`Contact ${index + 1}: ${contactNumber}`);
    });
  }

  CountryErrorCheck() {
    cy.get(".errorMsg.newPq_errorMsg")
      .should("be.visible")
      .then((e) => {
        cy.log(e.text());
        expect(e.text()).to.equal("Please select your destination country");
      });
  }

  TravellerErrorCheck() {
    cy.get(".errorMsg.newPq_errorMsg")
      .should("be.visible")
      .then((e) => {
        cy.log(e.text());
        expect(e.text()).to.equal("Please add traveller(s)");
      });
  }

  checkInvalidDate() {
    const today = new Date();
    const newDate = new Date();
    newDate.setDate(today.getDate() - 1);
    const options = { month: "short", day: "numeric", year: "numeric" };
    let srtDate = newDate.toLocaleDateString("en-US", options);
    cy.get(".newPq_duration_wrap__dateCol")
      .contains("Start date")
      .click({ multiple: true, force: true });
    if (
      cy
        .get(`button[aria-label="${srtDate}"]`, { timeout: 20000 })
        .click({ force: true })
        .should("be.disabled")
    ) {
      cy.log("The Date Selected is Invalid");
    }
  }

  checkEndDateselection() {
    if (
      cy
        .get(".newPq_duration_wrap__dateCol")
        .contains("End date")
        .click({ multiple: true, force: true })
        .get(".newPq_dateField_wrap__field.--tripStart", { timeout: 20000 })
        .contains("Start date")
    ) {
      cy.log("Trying to select End date before giving start date");
    }
    cy.get('a[href="javascript:void(0)"]').click({
      multiple: true,
      force: true,
    });
  }

  linkVisit() {
    cy.visit();
  }
}

export default travelForm;
