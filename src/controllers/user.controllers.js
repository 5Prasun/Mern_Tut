import { asynchHandler } from "../utils/asynchHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/apiResponse.js";

const generateAccessAndRefreshToken = async(userId)=>{
    try{
        const user = await User.findById(userId)
        const accessToken=user.generateAccessToken()
        const refreshtoken=user.generateRefreshToken()

        user.refreshToken = refreshtoken;
        await user.save({validateBeforeSave: false})

        return { accessToken, refreshtoken }
    
    }
    catch (error) {
        throw new ApiError("Token generation failed",500);  

    }
}

const RegisterUser = asynchHandler(async (req, res) => {
    
})

const LoginUser = asynchHandler(async (req, res) => {
    const { email, username, password } = req.body;

    if(!email || !username || !password) {
        throw new ApiError("Please provide all required fields");
    }
    const user = await User.findOne({
        $or: [{ email }, { username }]
    })
    if (!user) {
        throw new ApiError("Invalid credentials", 404);
    }

    const isPasswordValid= await user.comparePassword(password)
    if (!isPasswordValid) {
        throw new ApiError("Invalid password", 404);
    }
    
    const {accessToken,refreshToken}= await generateAccessAndRefreshToken(user._id)

    const loginUser= await user.findById(user.id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cokkie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse("User logged in successfully",200, 
        {
            user: loggedInUser,
            accessToken,
            refreshToken
        }
        )
    )
})

    const logoutUser = asynchHandler(async (req, res) => {
        await User.findByIdAndUpdate(req.user._id, {
            $set: {
                refreshToken: "unedefined"
            }
        }, {
            new: true,
        }
    )

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .cookie("accessToken", null, options)
        .cookie("refreshToken", null, options)
        .json(new ApiResponse("User logged out successfully", 200))

})

export{
    RegisterUser,
    LoginUser,
    logoutUser
}
