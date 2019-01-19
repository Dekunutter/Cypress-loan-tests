describe('Auto Loan Calculator Tests', function() {
	beforeEach(() => {
    cy.visit('https://www.bankrate.com/calculators/auto/auto-loan-calculator.aspx')
	})
  
	it('Verify Loan Rates Link', function() {		
		cy.contains('Compare Loan Rates').click()
		cy.url().should('include', '/loans/auto-loans/rates/')
	})
	
	it('Change borrowed amount', function() {
		cy.get('input[name="amount"]').type('20000{enter}')
		cy.get('p[class="numeral --alpha"]').contains('359')
		cy.get('div[class="calculator__total-paid +mg-bottom-sm"]').contains('$1,562')
	})
	
	it('Change borrowed amount too low', function() {
		cy.get('input[name="amount"]').type('10{enter}')
		verifyDefaultNumbers()
		
		cy.get('div[filter-title="amount"]').children('span[class="error-message"]')
		.should('have.css', 'color').and('contain', 'rgb(207, 73, 49)')
	})
	
	it('Change borrowed amount too high', function() {
		cy.get('input[name="amount"]').type('10000000{enter}')
		verifyDefaultNumbers()
		
		cy.get('div[filter-title="amount"]').children('span[class="error-message"]')
		.should('have.css', 'color').and('contain', 'rgb(207, 73, 49)')
	})
	
	it('Change loan repayment duration', function() {
		cy.get('div[data-ri-filtername="term"]').children('p').click()
		cy.get('div[data-ri-filtername="term"]').children('div[class="dropdown__list-wrapper br-dropdown-container"]')
		.find('ul > li').contains('span', '36 months').click()
	
		//check monthly payment and total interest paid updated correctly
		cy.get('p[class="numeral --alpha"]').contains('436')
		cy.get('div[class="calculator__total-paid +mg-bottom-sm"]').contains('$704')
		
		
		cy.contains('See amortization schedule').click()
		
		//functionize this
		var inputDate = new Date('10/12/2020')
		var inputString = (inputDate.getMonth() + 1) + "/" + inputDate.getDate() + "/" + inputDate.getFullYear()
		cy.get('input[data-ri-filtername="start-date"]').type(inputString)
		cy.contains('Estimated Payoff Date').click()
		
		var endDate = new Date('10/12/2020')
		endDate.setMonth(inputDate.getMonth() + 36)
		var endString = getDateToString(endDate)
		cy.contains(endString)
		
		cy.get('table[data-table="amortization"]').get('tr[class="calculator__amortization-body"]').should('have.length', 37)
	})
	
	it('Change vehicle condition', function() {
		cy.get('div[data-ri-filtername="new-used"]').children('p').click()
		cy.get('div[data-ri-filtername="new-used"]').children('div[class="dropdown__list-wrapper br-dropdown-container"]')
		.find('ul > li').contains('span', 'New').click()
	})
	
	it('Find a rate', function() {
		cy.get('div[data-ri-filtername="available-rates"]').children('p').click()
		cy.get('div[data-ri-filtername="available-rates"]').children('div[class="find-rate__dropdown-wrapper br-dropdown-container"]')
		.find('ul > li').contains('p', 'Choose an available rate from a lender below')
	})
	
	
	it('Change interest rate', function() {
		cy.get('input[name="interest-rate"]').type('5{enter}')
		cy.get('p[class="numeral --alpha"]').contains('283')
		cy.get('div[class="calculator__total-paid +mg-bottom-sm"]').contains('$1,984')
	})
	
	it('Change to invalid interest rate', function() {
		cy.get('input[name="interest-rate"]').type('a{enter}')
		verifyDefaultNumbers()
		
		cy.get('span[class="error-message interest-input__error"]').should('have.css', 'color').and('contain', 'rgb(207, 73, 49)')
		cy.get('span[class="error-message interest-input__error"]').should('contain', 'Invalid rate')
	})
	
	it('Print amortization schedule', function() {
		cy.contains('See amortization schedule').click()
		cy.contains('Print Schedule').click()
	})
	
	it('Show, change and close amortization schedule', function() {		
		cy.contains('See amortization schedule').click()
		cy.contains('Estimated Payoff Date')
		
		var inputDate = new Date('10/12/2020')
		var inputString = (inputDate.getMonth() + 1) + "/" + inputDate.getDate() + "/" + inputDate.getFullYear()
		cy.get('input[data-ri-filtername="start-date"]').type(inputString)
		cy.contains('Estimated Payoff Date').click()
			
		//some logic to verify the contents of the amortization schedule but it takes a long time and its kind of unecessary
		/*const table = cy.get('table[data-table="amortization"]')
		const rows = table.get('tr[class="calculator__amortization-body"]')
		var row = rows.first()
		var i
		for(i = 0; i < 60; i++) {
			const entry = row.children('td')
			
			// I won't check the actual numbers, I can leave that up to unit tests to verify that the internal mathematics is correct
			var paymentDate = convertToTableDate(inputDate)
			entry.first().should('contain', paymentDate)
			entry.next().contains(/\$\d+/).should('be.visible')
			entry.next().contains(/\$\d+/).should('be.visible')
			entry.next().contains(/\$\d+/).should('be.visible')
			entry.next().contains(/\$\d+/).should('be.visible')
			entry.next().contains(/\$\d+/).should('be.visible')
			
			inputDate.setMonth(inputDate.getMonth() + 1)
			row = entry.parent().next()
		}*/
		
		cy.contains('Hide amortization schedule').click()
	})
	
	it('Show and change Amortization schedule to invalid date', function() {		
		cy.contains('See amortization schedule').click()
		
		var inputDate = new Date('10/40/2020')
		var inputString = (inputDate.getMonth() + 1) + "/" + inputDate.getDate() + "/" + inputDate.getFullYear()
		cy.get('input[data-ri-filtername="start-date"]').type(inputString)
		cy.contains('Estimated Payoff Date').click()
		
		cy.get('span[class="error-message date-input__error"]').should('have.css', 'color').and('contain', 'rgb(207, 73, 49)')
		cy.get('span[class="error-message date-input__error"]').should('contain', 'Please enter a valid date')
	})
	
	it('Expand tool tips', function() {
		cy.get('div[filter-title="amount"]').children('div[class="tool-tip"]').click()
		cy.get('div[filter-title="amount"]').children('div[class="tool-tip__box --right"]').contains('The amount you need to borrow to purchase your car')
		
		cy.get('div[data-ri-filtername="term"]').children('div[class="tool-tip"]').click()
		cy.get('div[data-ri-filtername="term"]').children('div[class="tool-tip__box --right"]').contains('The amount of time until the loan matures')
	})
	
	function verifyDefaultNumbers() {
		//verify that the monthly payment and total interest paid do not update beyond the defaults
		cy.get('p[class="numeral --alpha"]').contains('270')
		cy.get('div[class="calculator__total-paid +mg-bottom-sm"]').contains('$1,172')
	}
	
	function getDateToString(date) {
		const monthName = date.toLocaleString('en-us', { month: 'long' });
		const day = date.getDate() + getDateOrdinal(date)
		return monthName + " " + day + ", " + date.getFullYear()
		
	}
	
	function getDateOrdinal(date) {
		return date.getDate() % 10 == 1 && date.getDate() != 11 ? 'st' : (date.getDate() % 10 == 2 && date.getDate() != 12 ? 'nd' : (date.getDate() % 10 == 3 && date.getDate() != 13 ? 'rd' : 'th'))
	}
	
	function convertToTableDate(date) {
		return ('0' + (date.getMonth() + 1)).slice(-2) + "/" + ('0' + date.getDate()).slice(-2) + "/" + (date.getFullYear().toString().substr(-2))
	}
})