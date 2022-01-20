var faker = require('faker')
//Lib created for an Brasilan man to generate our valids CPFs
var cpf = require('gerador-validador-cpf')

export default {
    deliver: function() {
        
        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()

        var data = {
            // need have apostrofo ` `
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            //to generate a randomic email, can receive a parameter or no
            email: faker.internet.email(firstName),
            whatsapp: '85985111111',
            address: {
                postalcode: '60545241',
                street: 'Rua Duas Nações',
                number: '100',
                details: 'Ap 1234',
                district: 'Granja Portugal',
                city_state: 'Fortaleza/CE'
            },
            delivery_method: 'Van/Carro',
            cnh:'cnh-digital.jpg'
        }

        return data
    }

}
