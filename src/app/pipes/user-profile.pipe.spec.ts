import { UserProfilePipe } from './user-profile.pipe';

describe('UserProfilePipe', () => {
  it('create an instance', () => {
    const pipe = new UserProfilePipe();
    expect(pipe).toBeTruthy();
  });
});
