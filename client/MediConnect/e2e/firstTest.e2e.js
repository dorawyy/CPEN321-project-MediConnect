describe('Startup flow test', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have startup screen', async () => {
    await expect(element(by.id('startup'))).toBeVisible();
  });

  it('should show "Sign Up"', async () => {
    await expect(element(by.id('signup'))).toBeVisible();
  });

  it('should show "Sign In"', async () => {
    await expect(element(by.id('signin'))).toBeVisible();
  });

  it('should show Logo', async () => {
    await expect(element(by.id('logo'))).toBeVisible();
  });

  it('should render "Doctor Sign Up Page" on pressing sign up', async () => {
    await element(by.id('signup')).tap();
    await expect(element(by.id('firstname'))).toBeVisible();
    await expect(element(by.id('lastname'))).toBeVisible();
    await expect(element(by.id('email'))).toBeVisible();
    await expect(element(by.id('password'))).toBeVisible();
    await expect(element(by.id('doctortoggle'))).toBeVisible();
    await expect(element(by.id('patienttoggle'))).toBeVisible();
    await expect(element(by.id('signup_button'))).toBeVisible();
    // await expect(element(by.text(' SIGN UP '))).toBeVisible();
  });


});
