//Using Promise to handle asynchronous errors in Express.js
const asynchHandler = (requestHandler) => {return (req,res,nex)=> {
    Promise.resolve(requestHandler(req,res,next)).
    catch((err) => next(err));
    }
}

export {asynchHandler}


//Using async/await to handle asynchronous errors in Express.js
/*  const asyncHandler = (fn) => async(req,res,next)
=> {
    try {
        await fn(req, res, next);
    } catch (err) {
        next(err);
    }
} */