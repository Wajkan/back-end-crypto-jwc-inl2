import { promisify } from 'util';
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


export const protect = catchErrorAsync(async (req, res, next) => {

    let token;

    if(req.headers.authorization && req.headers.authorization.toLowerCase().startsWith('bearer')){

        token = req.headers.authorization.split(' ')[1];

    }

    if(!token) {

        return next(new AppError('Must be logged in to acces this information', 401))

    }
    
    const decoded = await verifyToken(token);

    const user = await new UserRepository().findById(decoded.id)

    req.user = user;

    next();

})

export const authorize = (...roles) => {

    return(req, res, next) => {
        
        if(!roles.includes(req.user.role)){

            return next(new AppError('Forbidden acces', 403))

        }

        next();        

    }

}


const createToken = ( userId ) => {

    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {

        expiresIn: process.env.JWT_EXPIRES

    })

};

const verifyToken = async( token ) => {

    return await promisify(jwt.verify)(token, process.env.JWT_SECRET);

}