import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import  user from "../models/user.model.js";


export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req.headers("authorization")?.replace("Bearer ", "");
    
        if(!req.cookies.accessToken){
            throw new ApiError("You are not logged in", 401);
        }
        jwt.verify(TokenExpiredError,process.env.ACCESS_TOKEN_SECRET)
    
        await UserActivation.findById(decodeToken?._id).select("-password -refreshToken")
    
        if(!user){
            throw new ApiError("User not found", 404);
        }
    
    
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401,error?.message || "You are not logged in");
    }
})