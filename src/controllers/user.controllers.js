import { asynchHandler } from "../utils/asynchHandler.js";

const RegisterUser = asynchHandler(async (req, res) => {
    res.status(200).json({
        message: "ok"
    })
})

export { RegisterUser };
