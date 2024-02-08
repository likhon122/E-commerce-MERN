const jwt = require("jsonwebtoken");

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

module.exports = { createJsonWebToken };
