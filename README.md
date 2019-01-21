# Cypress-loan-tests
Tests created to test an auto loan calculator via Cypress

# Test Plan
# The Objectives:
Test the functionality of the Auto Loan Calculator on https://www.bankrate.com/calculators/auto/auto-loan-calculator.aspx
We should verify that the various parts of the UI work as intended. The mathematics of the calculator are not a concern for this test. Just make sure that the UI responds as expected and that the test verifies some hardcoded values. Deeper testing of the background logic should be handled by unit tests.

# What's Out of Scope:
The surrounding information in the website is out of scope for this test suite.

# Any Presumptions Made?
The test presumes that there is an available internet connection and that the website we are testing is currently reachable.
The test also assumes that the website is not going to change due to modifications from developers since it is an external piece of software and not internal to the company. Its worth noting that future changes are possible and these could bring the tests down.

We also assume that QA will perform more exploratory testing but this test suite should help cut down on any possible regressions by verifying the basic functionality of the UI.

# Testing Prerequisites: 
Prepping for the tests involves the installation and use of Cypress.io


# Test Cases:
Verify that the link to compare loan rates is working correctly

Change the amount you wish to borrow and verify that the output fields update

Change the amount you wish to borrow to values out of scope for the calculator and ensure that errors are displayed

Verify that the borrow amount only accepts numeric characters

Change the repayment period and verify that the output fields update

Verify that the information tool tips can be expanded

Ensure that the amortization schedule works as intended by revealing/hiding itself on demand and that the start and end dates correctly hange depending on user input.

Change the interest rate and verify that it correctly changes the monthly repayment result

Verify that invalid interest rates are correctly caught and display errors

Verify that invalid date inputs in amortization schedules are correctly caught and display errors

Verify that clicking the find a rate dropdown displays the text option to look below





