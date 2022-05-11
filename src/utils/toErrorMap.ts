import { FieldError } from "../generated/graphql";

export const toErrorMap = (errors: FieldError[]) => {
  let errorsObject: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorsObject[field] = message;
  });

  return errorsObject;
};
