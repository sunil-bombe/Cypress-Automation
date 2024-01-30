Feature: Login feature on flipkart

@regression
Scenario: Place an order for regression
Given visit the application 
When search for the shoes 
When select the shoes
Then click on add to cart button
Then verify shoes is added into cart

@smoke
Scenario: Place an order for smoke
Given visit the application 
When search for the shoes 
When select the shoes
Then click on add to cart button
Then verify shoes is added into cart