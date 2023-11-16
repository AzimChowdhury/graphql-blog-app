import jwt from "jsonwebtoken";
export const jwtHelper = async (userId: string) => {
  const token = await jwt.sign({ userId }, "signature", {
    expiresIn: "1d",
  });
  return token;
};
