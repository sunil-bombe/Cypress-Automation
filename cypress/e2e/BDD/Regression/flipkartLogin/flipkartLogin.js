import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";

Before(()=>{
    cy.fixture("data").then(function(data){
        this.data = data;
        cy.log({data});
    })
})
Given("visit the application",()=>{
    cy.visit("/");
})

When("search for the shoes",()=>{
cy.log("search for the shoes!");
//assert.isTrue(false);
}) 

When("select the shoes",()=>{
    cy.log("select the shoes!");

})


Then("click on add to cart button",()=>{
    cy.log("click on add to cart button!");

})

Then("verify shoes is added into cart",()=>{
    console.log("Verify shoes is added into the cart");

})