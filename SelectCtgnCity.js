class SelectCtgnCty {
    selectCategory(select) {
        cy.get('#ddl_Category').select(select);
    }

    selectCity(select) {
        cy.get('#ddl_City').select(select);
    }
    
    clickOnSearch() {
        cy.get('#btnSearch').click();
        cy.url()
            .then((url) => {
                Cypress.env('resultUrl', url);
            });
    }
}

export default new SelectCtgnCty();
