class HomePage {
    visit(url) {
        try {
            if (url) {
                cy.visit(url);
            } else {
                throw new Error("Invalid URL provided for visit()");
            }
        } catch (error) {
            cy.log("Error visiting URL: " + error.message);
        }
    }
    
    clickSchool(check) {
        cy.contains('li', check).click();
        cy.url().then(url => {
            Cypress.env('navigatedSchoolUrl', url);
            cy.log("Navigated to: " + url);
        });
    }
}

export default new HomePage();
