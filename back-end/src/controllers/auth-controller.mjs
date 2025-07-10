import { catchErrorAsync } from "../utilities/catchErrorAsync.mjs";
import jwt from 'jsonwebtoken';
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

    const token = createToken(user._id);


    res.status(200)
    .json({success: true, statusCode: 200, data: { token: token }})

});

const createToken = ( userId ) => {

    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {

        expiresIn: process.env.JWT_EXPIRES

    })

};