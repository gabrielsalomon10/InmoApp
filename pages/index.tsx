import type { NextPage } from 'next'
import { Typography } from '@mui/material';

import { ShopLayout } from '../components/layouts/ShopLayout';
import { ProductList } from '../components/products';
import { useProducts } from '../hooks';
import { FullScreenLoading } from '../components/ui';




const HomePage: NextPage = () => {

  const { products, isLoading } = useProducts('/products');

  return (
    <ShopLayout title={'Salvador Dengra Inmobiliaria'} pageDescription={'Encuentra la propiedad que mejor se ajuste a tus necesidades'}>
      <Typography variant='h1' component='h1'>Inicio</Typography>
      <Typography variant='h2' sx={{ mb: 1}}>Todas las propiedades</Typography>
      
      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products } />
      }

    </ShopLayout>
  )
}

export default HomePage
