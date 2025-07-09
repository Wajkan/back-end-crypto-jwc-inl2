import { catchErrorAsync } from "../utilities/catchErrorAsync.mjs";
import AppError from "../models/global/appError.mjs";
import UserRepository from "../repositories/user-repository.mjs";

export const loginUser = catchErrorAsync( async ( req, res, next ) => {

    const { email, password } = req.body;

    if( !email || !password ) {

        return next( new AppError('Email ? Password is missing', 400 ))

    }

    const user = await new UserRepository().find(email, true);

    if(!user || !(await user.comparePassword(password, user.password))) {

        return next(new AppError('Email ? Password is invalid', 401))

    }

    console.log(user)

    res.status(200)
    .json({success: true, statusCode: 200, data:'ALMOST THERE'})

});