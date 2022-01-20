import signup from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'
import { internet } from 'faker'

describe('Register', ()=>{
    //We can use it.skip to up some Test Case
 
    it('User Must Be A Delivery Person', function() {

        var deliver = signupFactory.deliver()

        signup.go()
        signup.fillForm(deliver)
        signup.submit()

        //Modal validation
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)
    })

    it('User Should Receive incorrect CPF Alert', function() {

        var deliver = signupFactory.deliver()

        //How my factory create news randomics data, in my test I need put wich info I want to be wrong, and this info is priority than randomic element created.
        deliver.cpf = '000000141AA'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! CPF inválido')
    })

    it('User Should Receive Incorrect Email Alert', function() {

        var deliver = signupFactory.deliver()

        //How my factory create news randomics data, in my test I need put wich info I want to be wrong, and this info is priority than randomic element created.
        deliver.email = 'test.com'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')
    })

    //-----> New Test Case: 'User Should Receive Requireds Fields Alert'
    context('User Should Receive Requireds Fields Alert', function() {
    //Creating a context to get each alert and validate without breaking the test if on of then fails.
        const messages = [
            {field: 'name', output: 'É necessário informar o nome' },
            {field: 'cpf', output: 'É necessário informar o CPF' },
            {field: 'email', output: 'É necessário informar o email' },
            {field: 'postalcode', output: 'É necessário informar o CEP' },
            {field: 'number', output: 'É necessário informar o número do endereço' },
            {field: 'delivery_method', output: 'Selecione o método de entrega' },
            {field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function(){
            signup.go()
            signup.submit()
        })

        messages.forEach(function(msg) {
            //Test Case is here
            it(`${msg.field} is required`, function() {
                signup.alertMessageShouldBe(msg.output)
            })
        })
    })
})
