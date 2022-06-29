import { db } from "."
import Admin from '../models/Admin';
import bcrypt from 'bcryptjs';



export const checkUserEmailPassword = async( email: string, password: string ) => {

    await db.connect();
    const admin = await Admin.findOne({ email });
    await db.disconnect();

    if( !admin ) {
        return null;
    }

    if( !bcrypt.compareSync( password, admin.password ) ) {
        return null;
    }

    const { name, _id } = admin;

    return {
        _id,
        email: email.toLocaleLowerCase(),
        name
    }

}