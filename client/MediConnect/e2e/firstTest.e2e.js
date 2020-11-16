describe('Startup flow test', () => {
	beforeEach(async () => {
		// await device.launchApp();
		await device.reloadReactNative();
	});

	it('should have startup screen', async () => {
		await expect(element(by.id('startup')))
			.toBeVisible()
			// .withTimeout(200000);
	});

	it('should show "Sign Up"', async () => {
		await expect(element(by.id('signup')))
			.toBeVisible()
			// .withTimeout(200000);
	});

	it('should show "Sign In"', async () => {
		await expect(element(by.id('signin')))
			.toBeVisible()
			// .withTimeout(200000);
	});

	it('should show Logo', async () => {
		await expect(element(by.id('logo')))
			.toBeVisible()
			// .withTimeout(200000);
	});

	it('should render "Doctor Sign Up Page" on pressing sign up', async () => {
		await element(by.id('signup')).tap();
		await expect(element(by.id('firstname')))
			.toBeVisible()
			// .withTimeout(200000);
		await expect(element(by.id('lastname')))
			.toBeVisible()
			// .withTimeout(200000);
		await expect(element(by.id('email')))
			.toBeVisible()
			// .withTimeout(200000);
		await expect(element(by.id('password'))).toBeVisible();
		await expect(element(by.id('doctorToggle'))).toBeVisible();
		await expect(element(by.id('patientToggle'))).toBeVisible();
		await expect(element(by.id('signup_button'))).toBeVisible();
		// await expect(element(by.text(' SIGN UP '))).toBeVisible();
	});
});
