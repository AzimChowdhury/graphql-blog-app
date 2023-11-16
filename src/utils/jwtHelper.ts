import jwt from "jsonwebtoken";

export const jwtHelper = async (userId: string) => {
  const token = await jwt.sign({ userId }, "signature", {
    expiresIn: "1d",
  });
  return token;
};

export const getUserInfoFromToken = async (token: string) => {
  try {
    const userInfo = (await jwt.verify(token, "signature")) as {
      userId: string;
    };
    return userInfo.userId;
  } catch (error) {
    return null;
  }
};
