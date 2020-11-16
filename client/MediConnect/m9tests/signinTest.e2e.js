describe('SignIn flow test', () => {
	beforeEach(async () => {
		await device.reloadReactNative();
	});

	it('should have startup screen', async () => {
		await device.reloadReactNative();
		await device.launchApp();
		await expect(element(by.id('startup')))
			.toBeVisible()
			//.withTimeout(200000);
	});

	it('should show "Sign Up"', async () => {
		await device.reloadReactNative();
		await device.launchApp();
		await expect(element(by.id('signup')))
			.toBeVisible()
			//.withTimeout(200000);
	});

	it('should show "Sign In"', async () => {
		await device.reloadReactNative();
		await device.launchApp();
		await expect(element(by.id('signin')))
			.toBeVisible()
			//.withTimeout(200000);
	});

	it('should render "Doctor Sign In Page" on pressing sign in', async () => {
		await element(by.id('signin')).tap();
		await expect(element(by.id('email')))
			.toBeVisible()
			//.withTimeout(200000);
		await expect(element(by.id('password'))).toBeVisible();
		await expect(element(by.id('signin_button'))).toBeVisible();
	});

	it('should render “the invalid alert” on giving wrong info', async () => {
		await element(by.id('email')).typeText('john@example.com');
		await element(by.id('password')).typeText('examplepass');
		await element(by.id('signin_button')).tap();
		await expect(element(by.text('Alert')))
			.toBeVisible()
			//.withTimeout(200000);
	});

	it('should go to “the homepage” on giving right info', async () => {
		await element(by.text('OK')).tap();
		await element(by.id('email')).clearText();
		await element(by.id('password')).clearText();
		await element(by.id('email')).typeText('alexjones@gmail.com');
		await element(by.id('password')).typeText('12345678');
		await element(by.id('signin_button')).tap();
		await expect(element(by.id('homepage')))
			.toBeVisible()
			//.withTimeout(200000);
	});
});
