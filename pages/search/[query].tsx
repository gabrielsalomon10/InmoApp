import type { NextPage, GetServerSideProps } from 'next'
import { Box, Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { ProductList } from '../../components/products';

import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';


interface Props {
    products: IProduct[];
    foundProducts: boolean;
    query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {

    console.log(products)

  return (
    <ShopLayout title={'Salvador Dengra Inmobiliaria'} pageDescription={'Encuentra la propiedad que mejor se ajuste a tus necesidades'}>
      <Typography variant='h1' component='h1'>Buscar propiedades</Typography>

        {
            foundProducts
                ? <Typography variant='h2' sx={{ mb: 1}} textTransform="capitalize">Búsqueda: { query } </Typography>  
                : (
                    <Box display='flex'>
                        <Typography variant='h2' sx={{ mb: 1}}>No encontramos ninguna propiedad</Typography>
                        <Typography variant='h2' sx={{ ml: 1}} color="secondary" textTransform="capitalize"> { query } </Typography>
                    </Box>
                )
        }

      
      
    <Box>
        <ProductList products={ products } />
    </Box>

    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
    const { query = '' } = params as { query: string };

    if( query.length === 0 ) {
        return{
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    // y no hay productos
    let products = await dbProducts.getProductsByTerm( query );
    const foundProducts = products.length > 0;

    if( !foundProducts ) {

        products = await dbProducts.getProductsByTerm('')

    }

    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}

export default SearchPage;

