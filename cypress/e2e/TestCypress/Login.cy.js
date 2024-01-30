/// <reference = 'cypress'\>

describe('Regression Test', ()=> {
    it('Verify Title', ()=>{
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.wait(3000)
        cy.title().then(function(title1) {
            const name = title1.text()
            console.log(name);
        })
        cy.get('#checkBoxOption1').then(function(element){
        element.click()
    })
        
         

                
    })
})


