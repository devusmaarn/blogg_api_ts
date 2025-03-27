import type { UserStatus, UserType } from "@/lib/enums";

export class User {
  public id: string;
  public name: string;
  public username: string;
  public email: string;
  private password: string;
  public type: UserType;
  public status: UserStatus;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date | null;

  public getPassword() {
    return this.password;
  }
}
