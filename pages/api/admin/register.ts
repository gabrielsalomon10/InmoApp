import { jwt, validations } from '../../../utils';
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
            return registerAdmin(req, res)

        default: 
            res.status( 400 ).json({
                message: 'Bad request'
            });
    }

}

const registerAdmin = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { email = '', password = '', name = '' } = req.body as { email: string, password: string, name: string } ;

    if( password.length < 6 ) {

        return res.status( 400 ).json({
            message: 'La contraseña debe ser de 6 caracteres o mas'
        })

    }

    if( name.length < 2 ) {

        return res.status( 400 ).json({
            message: 'El nombre debe ser de mas de 2 caracteres'
        })

    }

    if( !validations.isValidEmail( email ) ) {

        return res.status( 400 ).json({
            message: 'El correo no es valido'
        })

    }

    await db.connect();
    const admin = await Admin.findOne({ email });

    if( admin ) {

        return res.status( 400 ).json({
            message: 'El correo ya se encuentra registrado'
        });

    }

const newAdmin = new Admin({
    email: email.toLowerCase(),
    password: bcrypt.hashSync( password ),
    role: 'admin',
    name
});

try {
    await newAdmin.save({ validateBeforeSave: true });
} catch (error) {
    console.log(error)
    return res.status( 500 ).json({
        message: 'Revisar logs del servidor'
    });
}

    const { role } = newAdmin;

    const token = jwt.signToken( email );

    return res.status( 200 ).json({
        token,
        admin: {
            email, role, name
            }
        })
}
