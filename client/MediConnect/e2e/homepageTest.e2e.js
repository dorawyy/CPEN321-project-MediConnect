describe('Homepage flow test', () => {
	beforeEach(async () => {
		//await device.reloadReactNative();
	});

	it('should have startup screen', async () => {
		await expect(element(by.id('startup')))
			.toBeVisible()
			.withTimeout(200000);
	});

	it('should show "Sign Up"', async () => {
		await expect(element(by.id('signup')))
			.toBeVisible()
			.withTimeout(200000);
	});

	it('should show "Sign In"', async () => {
		await expect(element(by.id('signin')))
			.toBeVisible()
			.withTimeout(200000);
	});

	it('should render "Doctor Sign In Page" on pressing sign in', async () => {
		await element(by.id('signin')).tap();
		await expect(element(by.id('email')))
			.toBeVisible()
			.withTimeout(200000);
		await expect(element(by.id('password'))).toBeVisible();
		await expect(element(by.id('signin_button'))).toBeVisible();
	});

	it('should go to “the homepage” on giving right info', async () => {
		await element(by.id('email')).clearText();
		await element(by.id('password')).clearText();
		await element(by.id('email')).typeText('alexjones@gmail.com');
		await element(by.id('password')).typeText('12345678');
		await element(by.id('signin_button')).tap();
		await expect(element(by.id('homepage')))
			.toBeVisible()
			.withTimeout(200000);
    });
    
    it('should go to “report symptom page” on clicking button', async () => {
		await element(by.id('report_symptoms_button')).tap();
		await expect(element(by.id('report_symptoms_text')))
			.toBeVisible()
            .withTimeout(200000);
        await expect(element(by.id('report_button'))).toBeVisible();
    });
    
    it('should show error on invalid input', async () => {
        await element(by.id('report_symptoms_text')).clearText();
        await element(by.id('report_button')).tap();
        await expect(element(by.text('Error'))).toBeVisible();
        await element(by.text('OK')).tap();
    });

    it('should show doctor results on valid input', async () => {
        await element(by.id('report_symptoms_text')).clearText();
        await element(by.id('report_symptoms_text')).typeText('Chest Pain');
        await element(by.id('report_button')).tap();
        await expect(element(by.id('Doctor_results'))).toBeVisible();
    });
});