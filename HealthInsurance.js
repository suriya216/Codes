import healthData from "../../fixtures/health.json";

class HealthInsurance{
  visit(){
    cy.visit(healthData.link);
    cy.get('body').should('contain', 'Health Insurance');
    this.newSearch();
  }

  newSearch(){
    cy.get('body').then(($body) => {
      if ($body.find('*:contains("You last searched health insurance for")').length > 0) {
        cy.wait(5000);
        cy.get('form.pre-lead-wrapper__main')
          .find('button')
          .first()
          .click();
        cy.wait(5000);
        cy.log('New Search Clicked!!!!');
      } else {
        cy.log('New Search not appeared');
      }
    });  
  }
 
  selfHusband(){
    this.maleSelf();
  }
 
  selfWife(){
    this.femaleSelf();
  }
 
  femaleSelf(){
    cy.wait(1000);
    cy.get('input#female').check({force: true}).should('be.checked');
 
    cy.get('input[name="gender"]:checked')
    .invoke('val')
    .then(value => {
      let self;
      if(value == 1){
        self = 'Wife';
      } else {
        self = 'Husband';
      }
      cy.log(`Self is `+self);
    });
  }
 
  maleSelf(){
    cy.wait(1000);
    cy.get('input#male').check({force: true}).should('be.checked');
   
    cy.get('input[name="gender"]:checked')
    .invoke('val')
    .then(value => {
      let self;
      if(value == 1){
        self = 'Husband';
      } else {
        self = 'Wife';
      }
      cy.log(`Self is `+self);
    });
  }
 
 
  toggleSelf(){
    cy.wait(1000);
    cy.get('input#female').check({force: true}).should('be.checked');
 
    this.femaleSelf();
   
    cy.wait(1000);
    cy.get('input#male').check({force: true}).should('be.checked');
   
    this.maleSelf();
  }
 
  formSubmit(){
    cy.get('#step1ContinueBtn').click();
  }


  selectAllMemberTypes()
  {
    cy.fixture("healthInsurance").then((data) => {
      data.memberTypes.forEach((type) => {
        this.selectMemberType(type);
      });
    });
  }


  selectMemberType(type) {
      if (type === 'grandFather') {
        cy.get('p.moreMembersLink > a').should('be.visible').click();
      }
      
      cy.get(`.memberSelection__block > label.${type}`)
        .as(`${type}Label`);
  
      cy.get(`@${type}Label`)
        .prev('input[type="checkbox"]') 
        .as(`${type}Checkbox`)
        .check({ force: true });
  
      cy.get(`@${type}Checkbox`).should('be.checked');
      cy.log(`Clicked checkbox for: ${type}`);
  }
 
  unCheckAll(){
    cy.get(`.memberSelection__block>input[type='checkbox']`).uncheck({force:true});
  }
    
  submitForm() {
    cy.get('form').submit();
    cy.wait(4000);
  }


  verifyChildSelection(childType) { 
    cy.get(`.memberSelection__block >label.${childType}`).prev('input[type="checkbox"]').check({force:true});
    cy.get('form').submit();
    cy.wait(1000);
    cy.get('.text-error').invoke('text').should('eq','Please select self or Wife with child');
    cy.get(`.memberSelection__block >label.${childType}`).prev('input[type="checkbox"]').uncheck({force:true});
  }


  selectPersonCorrectly(){
    cy.get(`.memberSelection__block >label.male`).prev('input[type="checkbox"]').check({force:true})
    cy.get(`.memberSelection__block >label.female`).prev('input[type="checkbox"]').check({force:true})
    cy.get(`.memberSelection__block >label.son`).prev('input[type="checkbox"]').check({force:true})
    cy.get(`.memberSelection__block >label.daughter`).prev('input[type="checkbox"]').check({force:true})
  }


  selectAge(selfAge, spouseAge, sonAge, daughterAge) {      
    cy.get('#Self').select(selfAge.toString());
    cy.get('#Spouse').select(spouseAge.toString());
    cy.get('#Son').select(sonAge.toString());
    cy.get('#Daughter').select(daughterAge.toString());
  }


  verifyAgeGapErrors(selfAge, spouseAge) {
    const isSpouseYounger = selfAge > spouseAge;
    if (isSpouseYounger) {
      cy.get('select#Son')
        .parents('.memberAgeRow')
        .find('.text-error')
        .should('be.visible')
        .and('contain', 'Wife and son age gap should be 18 years or above.');
      cy.log('Son age gap error verified for Wife.');

      cy.get('select#Daughter')
        .parents('.memberAgeRow')
        .find('.text-error')
        .should('be.visible')
        .and('contain', 'Wife and daughter age gap should be 18 years or above.');
      cy.log('Daughter age gap error verified for Wife.');
    } else {
      cy.get('select#Son')
        .parents('.memberAgeRow')
        .find('.text-error')
        .should('be.visible')
        .and('contain', 'Self and son age gap should be 18 years or above.');
      cy.log('Son age gap error verified for Self.');
  
      cy.get('select#Daughter')
        .parents('.memberAgeRow')
        .find('.text-error')
        .should('be.visible')
        .and('contain', 'Self and daughter age gap should be 18 years or above.');
      cy.log('Daughter age gap error verified for Self.');
    }
  } 
}

export default new HealthInsurance();