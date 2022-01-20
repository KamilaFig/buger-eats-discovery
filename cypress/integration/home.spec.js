
//decribe é o comando onde se cria o nome do caso de teste
//()=> é uma função JS
//it define o caso de teste
//cy.visit acessa a api do site
//cy.viewport controla o tamanho do navegador

describe('home page', ()=>{
    it('App should be online', ()=>{
        cy.viewport(1440, 900)
        cy.visit('https://buger-eats.vercel.app')
        cy.get('#page-home main h1').should('have.text', 'Seja um parceiro entregador pela Buger Eats')
    })
})