class invalidPhone{
 
    carVisit(){
      cy.visit("https://ci.policybazaar.com/v1/carQuestions?utm_source=yahoo_brand&utm_medium=cpc&utm_term=policybazaar&utm_campaign=PolicyBazaar00PolicyBazaar&msclkid=df7c8bb0cdc81bf47c96e38dd3e4dc89&utm_content=home_v11&id2=NWFaOHhGc3JLdmI5dzUya3BoaWFvZz09&id=")
    }
   
      typeName(name) {
          cy.get('#name-form-control', { timeout: 30000 })
            .should('be.visible')
            .type(name);
        }
       
        typeMobile(mobile) {
          cy.get('#mobile-form-control', { timeout: 30000 })
            .should('be.visible')
            .type(mobile);
        }
       
        clickSubmit() {
          cy.get('.submitBtn')
            .click();
        }
       
        verifyMobileError(expectedError) {
          cy.get('.errorMsg')
            .should("have.text", expectedError);
        }
        preload() {
            cy.reload();
           }
        checkMobileNumber(ph){
            cy.get('#mobile-form-control', { timeout: 30000 }).then((input)=>{
                const actual=input.val();
                expect(actual).to.not.equal(ph);
            })
        }
      }
   
      export default new invalidPhone();
 