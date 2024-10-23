const jwt = require("jsonwebtoken");
const { jwtAccessKey, jwtRefreshKey } = require("../secret");

const createJsonWebToken = (payload, secretKey, expireTime) => {
  if (typeof payload !== "object" || !payload) {
    throw new Error("Payload must be use a non empty object");
  }
  if (typeof secretKey !== "string" || secretKey === "" || !secretKey) {
    throw new Error("Secret Key must be use a non empty string");
  }
  if (typeof expireTime !== "string" || !expireTime) {
    throw new Error("Expire time must be use a non empty string");
  }

  try {
    const token = jwt.sign(payload, secretKey, { expiresIn: expireTime });

    return token;
  } catch (error) {
    throw error;
  }
};

const createAccessToken = (res, user) => {
  try {
    const accessToken = createJsonWebToken({ user }, jwtAccessKey, "15m");
    try {
      res.cookie("accessToken", accessToken, {
        maxAge: 15 * 60 * 1000, // 15m
        httpOnly: true,
        secure: true,
        sameSite: "none"
      });
    } catch (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

const createRefreshToken = (res, user) => {
  try {
    const refreshToken = createJsonWebToken({ user }, jwtRefreshKey, "15d");
    try {
      res.cookie("refreshToken", refreshToken, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 day
        httpOnly: true,
        secure: true,
        sameSite: "none"
      });
    } catch (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { createJsonWebToken, createAccessToken, createRefreshToken };
