//Patron PascalCase to class

//Class to represent the registration page
class SignupPage {
    go() {
        //It was defined on the setup file > cypress.json
        // cy.viewport(1400,900)
        
        //It was defined on the setup file > cypress.json
        //cy.visit('https://buger-eats.vercel.app/')
        cy.visit('/')

        //Find and click on the button
        cy.get('a[href="/deliver"]').click()

        //Verify if is on the rigth screen -- checkpoint
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }

    fillForm(deliveryman) {
        // Fill form
        cy.get('input[name="fullName"]').type(deliveryman.name)
        cy.get('input[name="cpf"]').type(deliveryman.cpf)
        cy.get('input[name="email"]').type(deliveryman.email)
        cy.get('input[name="whatsapp"]').type(deliveryman.whatsapp)

        cy.get('input[name="postalcode"]').type(deliveryman.address.postalcode)
        cy.get('input[type=button][value="Buscar CEP"]').click()

        cy.get('input[name="address-number"]').type(deliveryman.address.number)
        cy.get('input[name="address-details"]').type(deliveryman.address.details)

        //To validate address filled
        cy.get('input[name="address"]').should('have.value', deliveryman.address.street)
        cy.get('input[name="district"]').should('have.value', deliveryman.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliveryman.address.city_state)

        //Selecting the delivery method
        cy.contains('.delivery-method li span', deliveryman.delivery_method).click()
        //Uploading the file(CNH)
        //**** ---- When the file is in the fixtures directory
        //cy.get('input[accept^="image"]').attachFile(deliveryman.cnh)

        //**** ---- When the file is inside some folder of the fixtures directory
        cy.get('input[accept^="image"]').attachFile('/img/' + deliveryman.cnh)
    }

    submit(){
        //To send the registration
        cy.get('form button[type="submit"]').click()
    }

    modalContentShouldBe(expectedMessage){
        //Other option of the inspect elment: .swal2-container div[class="swal2-html-container"]
        cy.get('.swal2-container .swal2-html-container').should('have.text', expectedMessage)

    }

    //
    alertMessageShouldBe(expectedMessage) {
        //Error validation - Method to get 1 element for time
        //cy.get('.alert-error').should('have.text', expectedMessage)
        
        //Search for text with class and verify if is visible. for one or more situations with the same locale
        cy.contains('.alert-error', expectedMessage).should('be.visible')
    }
}
//To be able to import is necessary to export here:
export default new SignupPage;
