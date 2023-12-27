import { User } from "models/User";

class AuthDto {
   public id: number;
   private username: string;
   private email: string;

   constructor(model: User) {
    this.id = model.id;
    this.username = model.username;
    this.email = model.email;
   }
}

export default AuthDto;