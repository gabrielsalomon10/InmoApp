import type { NextPage } from 'next'
import { Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';

import { FullScreenLoading } from '../../components/ui';




const ComprarPage: NextPage = () => {

  
  const { products, isLoading } = useProducts('/products?type=comprar');

  return (
    <ShopLayout title={'Salvador Dengra Inmobiliaria - Comprar'} pageDescription={'Encuentra la propiedad que mejor se ajuste a tus necesidades'}>
      <Typography variant='h1' component='h1'>Comprar</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>Propiedades en venta</Typography>
      
      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products } />
      }

      <ProductList 
          products={ products }
      />
    </ShopLayout>
  )
}

export default ComprarPage;