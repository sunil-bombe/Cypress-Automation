Feature: Purchase feature on flipkart 

@regression1
Scenario: purchase an order for regression
Given visit the application 
When search for the shoes 
When select the shoes
Then click on add to cart button
Then verify shoes is added into cart

@smoke1
Scenario: purchase an order for smoke
Given visit the application 
When search for the shoes 
When select the shoes
Then click on add to cart button
Then verify shoes is added into cart