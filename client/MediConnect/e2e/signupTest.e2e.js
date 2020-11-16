describe('SignUp flow test', () => {
	beforeEach(async () => {
		//await device.reloadReactNative();
	});

	it('should have startup screen', async () => {
		//await device.reloadReactNative();
		//await device.launchApp();
		await expect(element(by.id('startup')))
			.toBeVisible()
			//.withTimeout(200000);
	});

	it('should show "Sign Up"', async () => {
		//await device.reloadReactNative();
		//await device.launchApp();
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

	it('should render "Doctor Sign Up Page" on pressing sign up', async () => {
		//await device.reloadReactNative();
		//await device.reloadReactNative();
		//await device.launchApp();
		await element(by.id('signup')).tap();
		await expect(element(by.id('firstname')))
			.toBeVisible()
			//.withTimeout(200000);
		await expect(element(by.id('lastname'))).toBeVisible();
		await expect(element(by.id('email'))).toBeVisible();
		await expect(element(by.id('password'))).toBeVisible();
		await expect(element(by.id('doctortoggle'))).toBeVisible();
		await expect(element(by.id('patienttoggle'))).toBeVisible();
		await expect(element(by.id('signup_button'))).toBeVisible();
	});

	it('should render “the invalid alert” on not entering in correct info', async () => {
		await element(by.id('email')).typeText('john@example.com');
		await element(by.id('password')).typeText('exampl');
		await element(by.id('signup_button')).tap();
		await expect(element(by.text('Alert')))
			.toBeVisible()
			//.withTimeout(200000);
	});

	it('should render “the invalid alert” on entering in an email that is already registered', async () => {
		//await element(by.text('OK')).tap();

		//await device.reloadReactNative();
		//await device.launchApp();

		await element(by.id('email')).clearText();
		await element(by.id('password')).clearText();
		await element(by.id('firstname')).clearText();
		await element(by.id('lastname')).clearText();

		await element(by.id('email')).typeText('alexjones@gmail.com');
		await element(by.id('password')).typeText('12345678');
		await element(by.id('firstname')).typeText('Test');
		await element(by.id('lastname')).typeText('Test');
		await element(by.id('signup_button')).tap();
		await expect(element(by.text('Alert')))
			.toBeVisible()
			//.withTimeout(200000);
	});

	it('should go to “the homepage” on giving right info', async () => {
		//await element(by.text('OK')).tap();

		//await device.reloadReactNative();
		//await device.launchApp();

		await element(by.id('email')).clearText();
		await element(by.id('password')).clearText();
		await element(by.id('firstname')).clearText();
		await element(by.id('lastname')).clearText();

		await element(by.id('email')).typeText('example@example.com');
		await element(by.id('password')).typeText('12345678');
		await element(by.id('firstname')).typeText('Test');
		await element(by.id('lastname')).typeText('Test');
		await element(by.id('signup_button')).tap();
		await expect(element(by.id('homepage')))
			.toBeVisible()
			//.withTimeout(200000);
	});
});
