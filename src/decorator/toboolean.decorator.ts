import { Transform } from "class-transformer";

export const ToBoolean = () => {
  return Transform(({ value }) => value === "true");
};
