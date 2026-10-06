import { BadRequestException, NotFoundException } from "../../common/Exception/error.exception.js";
import { generateNewAccessToken, generateToken } from "../../common/index.js";
import { compareHash, generateHash } from "../../common/service/hashing.service.js";
import { userModel } from "../../database/model/user.model.js";

export const signup = async (body) => {
  let { name, email, password, confirmPassword } = body;
  let user = await userModel.findOne({ email });
  if (user) return BadRequestException({ message: "User Already Exist" });
  if (password !== confirmPassword) return BadRequestException({ message: "Confirm Password Wrong" })
  let hashPassword = await generateHash({ plainText: password })
  if (hashPassword) {
    let data = await userModel.create({ name, email, password: hashPassword });
    if (data)
      return { message: "User Added", data }
    else return BadRequestException({ message: "Error User not Added" })
  } else return BadRequestException({ message: "Error Password" })
};

export const login = async (body) => {
  let { email, password } = body;
  let user = await userModel.findOne({ email });
  if (!user) return NotFoundException({ message: "User Not Found" });
  let isCompared = await compareHash({ plainText: password, hashedText: user.password })
  if (isCompared) {
    let { accessToken, refreshToken } = generateToken(user)
    return { message: "Login Success", accessToken, refreshToken }
  } else {
    return BadRequestException({ message: "Password Wrong" })
  }
}

export const getNewToken = async (body) => {
  let { refreshToken } = body;
  let newToken = await generateNewAccessToken(refreshToken);
  if (newToken) {
    return { message: "Done", accessToken: newToken }
  }
  else {
    return BadRequestException({ message: "Refresh Token Invalid" })
  }
}