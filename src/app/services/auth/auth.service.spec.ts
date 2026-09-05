describe('AuthService', () => {
  let service: any;

  beforeEach(() => {
    service = {
      getCurrentUser: () => null,
      showLogin: () => undefined
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
