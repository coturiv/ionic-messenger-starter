import { GuardsModule } from './guards.module';

describe('GuardsModule', () => {
  let guardsModule: GuardsModule;

  beforeEach(() => {
    guardsModule = new GuardsModule();
  });

  it('should create an instance', () => {
    expect(guardsModule).toBeTruthy();
  });
});
