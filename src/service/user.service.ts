import type { CreateUserDto } from "@/dto/create_user.dto";
import { User } from "@/entity/user";
import { UserStatus, UserType } from "@/lib/enums";
import { sql } from "@/lib/sql";
import { password } from "bun";
import { plainToClass } from "class-transformer";
import { Service } from "typedi";

@Service()
export class UserService {
  async create(dto: CreateUserDto) {
    const id = crypto.randomUUID();
    const hashedPassword = await password.hash(dto.password, "bcrypt");

    try {
      const result = await sql`INSERT INTO users (
        id, name, email, username, password, type, status
      ) VALUES ( 
        ${id}, 
        ${dto.name}, 
        ${dto.email}, 
        ${dto.username}, 
        ${hashedPassword}, 
        ${UserType.BASIC}, 
        ${UserStatus.ACTIVE}
      ) RETURNING *`;

      console.log(result);
      // return null;
      // return plainToClass(User, result[0]);
    } catch (err) {
      console.log(err);
    }
    return null;
  }
}
