/**
 * The LoginRequest object is used during login
 * and holds the username and the password.
 *
 * @author Gunnar Hillert
 */
export class User {
  constructor(
    public isAuthenticated: boolean,
    public username: string,
    public roles: string[]
  ) {}

  public hasAnyRoleOf(rolesToCheckFor: string[]): boolean {
    if (this.roles && this.roles.length > 0) {
      const foundRole = this.roles.find(role => {
        if (rolesToCheckFor.find(passedInRole => role === passedInRole)) {
          return true;
        } else {
          return false;
        }
      });
      return foundRole ? true : false;
    } else {
      return false;
    }
  }
}
