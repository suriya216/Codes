import HealthInsurance from "../support/Pages/HealthInsurance";
 
describe('Hackathon Project', () => {
 
  const child=['son','daughter']
  let ageData;
    beforeEach(()=>{
      cy.viewport(1920, 1080);
      Cypress.on('uncaught:exception', (err) => {
        return false;
      });
    });


    before(()=>{
      cy.fixture("healthInsurance").then((data) => {
        ageData = data.ageData;
      });
    })


    it('To Verify successful navigation to Health Insurance page.', { tags: ['smoke'] },  ()=>{
      HealthInsurance.visit();      
      HealthInsurance.unCheckAll();
    });

 
    it('To Verify toggling "Self" for "Husband" option.', { tags: ['sanity'] },  ()=>{
      HealthInsurance.visit();

      HealthInsurance.selfHusband();
      HealthInsurance.unCheckAll();
    });

 
    it('To Verify toggling "Self" for "Wife" option.', { tags: ['sanity'] }, ()=>{
      HealthInsurance.visit();
      HealthInsurance.selfWife();
      HealthInsurance.unCheckAll();
    });

    it('To Verify toggling between "Male" and "Female" visibility.', { tags: ['sanity'] }, ()=>{
      HealthInsurance.visit();
      HealthInsurance.toggleSelf();
      HealthInsurance.unCheckAll();
    });
 


    it('Select all and check for errors.', { tags: ['regression'] }, ()=>{
      HealthInsurance.visit();
      HealthInsurance.selectAllMemberTypes();
      HealthInsurance.unCheckAll();     
    })


    it('Child selection and error validation.', { tags: ['regression'] }, ()=>{
      HealthInsurance.visit();
      HealthInsurance.unCheckAll();
      HealthInsurance.verifyChildSelection(child[0])
      HealthInsurance.verifyChildSelection(child[1])
    })


    it('Select Parents and children.', { tags: ['retest'] },()=>{
      HealthInsurance.visit();
      HealthInsurance.unCheckAll();
      cy.wait(1000);
      HealthInsurance.selectPersonCorrectly();
      HealthInsurance.submitForm();
    })


    it('Form Submission with Invalid Inputs.', { tags: ['retest'] },()=>{
      HealthInsurance.visit();
      HealthInsurance.unCheckAll();
      cy.wait(1000);
      HealthInsurance.selectPersonCorrectly();
      cy.wait(1000);
      HealthInsurance.submitForm()

      HealthInsurance.selectAge((ageData.ageValue-1),(ageData.ageValue),ageData.kidsage,ageData.kidsage)
      HealthInsurance.submitForm()
      HealthInsurance.verifyAgeGapErrors((ageData.ageValue-1),(ageData.ageValue));
   
      HealthInsurance.selectAge((ageData.ageValue),(ageData.ageValue-1),ageData.kidsage,ageData.kidsage)
      HealthInsurance.submitForm()
      HealthInsurance.verifyAgeGapErrors((ageData.ageValue),(ageData.ageValue-1));

    })

    it('Form Submission with correct values of age.', { tags: ['sanity', 'smoke'] },()=>{
      HealthInsurance.visit();
      HealthInsurance.unCheckAll();
      HealthInsurance.selectPersonCorrectly();
      HealthInsurance.submitForm()
      HealthInsurance.selectAge((ageData.ageValue),(ageData.ageValue),ageData.kidsage,ageData.kidsage)
      HealthInsurance.submitForm()
    })
});
