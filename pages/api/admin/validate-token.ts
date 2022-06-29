import { jwt } from '../../../utils';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Admin } from '../../../models';
import bcrypt from 'bcryptjs';


type Data =
| { message: string }
| {
    token: string;
    admin: {
        email: string;
        name: string;
        role: string;
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'GET':
            return checkJWT(req, res)

        default: 
            res.status( 400 ).json({
                message: 'Bad request'
            });
    }

}

const checkJWT = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { token = '' } = req.cookies;

    let adminId = '';

    try {
        adminId = await jwt.isValidToken( token.toString() );
    } catch (error) {
        return res.status( 401 ).json({
            message: 'Token de autorizacion no valido'
        });
    }

    await db.connect();
    const admin = await Admin.findById( adminId ).lean();
    await db.disconnect();

    if( !admin ) {
        return res.status( 400 ).json({ message: 'No existe usuario con ese ID'});
    }

    const { _id, email, role, name } = admin;

    return res.status( 200 ).json({
        token: jwt.signToken( _id, email ),
        admin: {
            email, 
            role, 
            name
            }
    })
}
