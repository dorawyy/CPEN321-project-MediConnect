describe('Login Flow Test', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have startup screen', async () => {
    await expect(element(by.id('StartUp'))).toBeVisible();
  });

});
