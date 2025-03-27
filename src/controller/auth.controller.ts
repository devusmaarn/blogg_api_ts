import { CreateUserDto } from "@/dto/create_user.dto";
import { ResponseEntity } from "@/entity/response";
import { validateDTO } from "@/lib/utils";
import { UserService } from "@/service/user.service";
import type { Request, Response } from "express";
import { Service } from "typedi";

@Service()
export class AuthController {
  constructor(private userService: UserService) {}

  async register(req: Request, res: Response) {
    try {
      const result = await validateDTO(CreateUserDto, req.body);
      if (result.success) {
        ResponseEntity.validationError(res, result.errors);
        return;
      }

      const user = await this.userService.create(result.data);
      if (user) {
        ResponseEntity.success(res, 200, user);
        return;
      }
    } catch (err) {
      console.log(err);
      ResponseEntity.serverError(res, "Unable to register user");
    }
  }
}
