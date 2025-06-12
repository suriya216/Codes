import HomePage from "../support/Pages/HomePage";
import SelectCtgnCty from "../support/Pages/SelectCtgnCity";
import ResultPage from "../support/Pages/ResultPage";


describe('Search For Schools', ()=>{
    beforeEach(()=>{
        Cypress.on('uncaught:exception', () => false);
    });

    let validUrl;
    let invalidUrl;
    let menu;
    let invalidMenu;
    let selectCategory;
    let invalidCategory;
    let selectCity;
    let invalidCity;

    before(()=>{
        cy.fixture('example').then((data)=>{
            validUrl=data.validUrl;
            invalidUrl=data.invalidUrl;
            menu=data.menu;
            invalidMenu=data.invalidMenu;
            selectCategory=data.category;
            invalidCategory=data.invalidCategory;
            selectCity=data.city;
            invalidCity=data.invalidCity;
        });
    });
    it('To verify the Eduvidya website loads successfully', () => {
        HomePage.visit(validUrl);
    });

    it('To validate improper website loading with incorrect URL', () => {
        HomePage.visit(invalidUrl);
        cy.get('body').should('not.contain', 'Eduvidya');
    });

    it('To verify navigation to the Schools page', () => {
        HomePage.visit(validUrl);
        HomePage.clickSchool(menu);
    });

    it('To validate failure when clicking an incorrect menu link', () => {
        HomePage.visit(validUrl);
        HomePage.clickSchool(invalidMenu);
        cy.get('div.heading').should('not.contain', 'Schools');
    });

    it('To verify selection of CBSE course from dropdown', () => {
        HomePage.visit(validUrl);
        HomePage.clickSchool(menu);
        SelectCtgnCty.selectCategory(selectCategory);
    });

    it('To validate failure to select a course not in dropdown', () => {
        HomePage.visit(validUrl);
        HomePage.clickSchool(menu);
        SelectCtgnCty.selectCategory(invalidCategory);
        cy.get('#ddl_Category option:selected').should('not.have.text', 'CBSE');
    });

    it('To verify selection of Pune from the City dropdown', () => {
        HomePage.visit(validUrl);
        HomePage.clickSchool(menu);
        SelectCtgnCty.selectCategory(selectCategory);
        SelectCtgnCty.selectCity(selectCity);
    });

    it('To validate incorrect city selection leading to irrelevant results', () => {
        HomePage.visit(validUrl);
        HomePage.clickSchool(menu);
        SelectCtgnCty.selectCategory(selectCategory);
        SelectCtgnCty.selectCity(invalidCity);
        cy.get('#ddl_City option:selected').should('not.have.text', 'Pune');
    });

    it('To verify search functionality and result display', () => {
        HomePage.visit(validUrl);
        HomePage.clickSchool(menu);
        SelectCtgnCty.selectCategory(selectCategory);
        SelectCtgnCty.selectCity(selectCity);
        SelectCtgnCty.clickOnSearch();
    });

    it('To validate failure when searching without selections', () => {
        HomePage.visit(validUrl);
        HomePage.clickSchool(menu);
        cy.get('#ddl_Category option:selected').should('have.text', 'All');
        cy.get('#ddl_City option:selected').should('have.text', 'Select');
        SelectCtgnCty.clickOnSearch();
    });

    it('To verify correctness of search results for CBSE schools in Pune', () => {
        HomePage.visit(validUrl);
        HomePage.clickSchool(menu);
        SelectCtgnCty.selectCategory(selectCategory);
        SelectCtgnCty.selectCity(selectCity);
        SelectCtgnCty.clickOnSearch();
    });

    it('To verify correctness of the search results displayed in the Result page.', ()=>{
        HomePage.visit(validUrl);
        HomePage.clickSchool(menu);
        SelectCtgnCty.selectCategory(selectCategory);
        SelectCtgnCty.selectCity(selectCity);
        SelectCtgnCty.clickOnSearch();
        ResultPage.displayResult();
    });

    it('To verify correctness of the search results displayed in the ResultPage and ensure correctness.', ()=>{
        HomePage.visit(validUrl);
        HomePage.clickSchool(menu);
        SelectCtgnCty.selectCategory(selectCategory);
        SelectCtgnCty.selectCity(selectCity);
        SelectCtgnCty.clickOnSearch();
        ResultPage.verifyResult();
    });
});