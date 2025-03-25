import { User } from "src/entities/user.entities";

export class UserDto {
    id: string;
    email: string;
  
    constructor(user: User) {
      this.id = user.id;
      this.email = user.email;
    }
  }