import { plainToClass, type ClassConstructor } from "class-transformer";
import { validate, type ValidationOptions } from "class-validator";

export async function validateDTO<T extends object>(
  obj: ClassConstructor<T>,
  value: object,
  option?: ValidationOptions
) {
  const data = plainToClass(obj, value);
  const errors = await validate(data, option);
  let errorsMap: Partial<Record<keyof T, string>> = {};
  if (errors.length) {
    errorsMap = {};
    errors.forEach((err) => {
      if (err.constraints) {
        errorsMap[err.property as keyof T] = Object.values(err.constraints)[0];
      }
    });
  }

  return {
    errors: errorsMap,
    data,
    success: Object.values(errorsMap).length > 0,
  };
}
