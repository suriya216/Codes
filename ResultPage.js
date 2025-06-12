class ResultPage{
    displayResult(){
        cy.get('.detail-list > ul > li')
            .each((element)=>{
                cy.log(element.text());
            });
    }
    
    verifyResult(){
        cy.get('.detail-list > ul > li')
            .should('be.visible');
    }
}

export default new ResultPage();