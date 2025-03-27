import { registerDecorator, type ValidationOptions } from "class-validator";

export function IsMatch(
  property: string,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isMatch",
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: string, args): boolean {
          if (args) {
            const relatedValue = (args.object as any)[args.constraints[0]];
            return value === relatedValue;
          }
          return false;
        },
        defaultMessage(args): string {
          if (args) {
            const { constraints, property } = args;
            return `${property} does not match ${constraints[0]}`;
          }
          return "Field does not match";
        },
      },
    });
  };
}
