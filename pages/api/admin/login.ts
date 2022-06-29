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

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'POST':
            return loginAdmin(req, res)

        default: 
            res.status( 400 ).json({
                message: 'Bad request'
            });
    }

}

const loginAdmin = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { email = '', password = '' } = req.body;

    await db.connect();
    const admin = await Admin.findOne({ email });
    await db.disconnect();

    if( !admin ) {
        return res.status( 400 ).json({ message: 'Correo o contraseña incorrecta - EMAIL'})
    }

    if( !bcrypt.compareSync( password, admin.password! ) ) {
        return res.status( 400 ).json({ message: 'Correo o contraseña incorrecta - PASSWORD'})
    }

    const { role, name, _id } = admin;

    const token = jwt.signToken( _id, email );

    return res.status( 200 ).json({
        token,
        admin: {
            email, role, name
            }
        })
}