import type { NextApiRequest, NextApiResponse } from 'next';
import Product from '../../../models/Product';
import { db } from '../../../database';


type Data = {
    numberOfProducts: number;
}

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {

    await db.connect();

    const numberOfProducts = await Product.count();

    await db.disconnect();

    res.status(200).json({
        numberOfProducts
    });
    
}