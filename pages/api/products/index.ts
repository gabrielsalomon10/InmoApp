import type { NextApiRequest, NextApiResponse } from 'next'

import { db, SHOP_CONSTANTS } from '../../../database';
import { IProduct } from '../../../interfaces/products';
import { Product } from '../../../models';


type Data = 
    | { message: string }
    | IProduct[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'GET':
            return getProduct( req, res )

        default:
            return res.status( 400 ).json({
                message: 'Bad request'
            })
    }
    
}

const getProduct = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { type = 'all'} = req.query;

    let condition = {};

    if( type !== 'all' && SHOP_CONSTANTS.validType.includes( `${ type }` )) {
        condition = { type };
    }

    await db.connect();
    const products = await Product.find( condition )
                                .select('title images price slug -_id')
                                .lean();
    await db.disconnect();

    const updatedProducts = products.map( product => {
        product.images = product.images.map( image => {
            return image.includes('http') ? image : `${ process.env.HOST_NAME }products/${ image }`
        });

        return product;
    });

    return res.status( 200 ).json( updatedProducts );

}