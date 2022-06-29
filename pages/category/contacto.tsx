import type { NextPage } from 'next';
import { Typography, Box, Divider, Grid } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';

import { FullScreenLoading } from '../../components/ui';
import OtrosScreen from '../../components/ui/OtrosScreen';




const ContactoPage: NextPage = () => {

  
  const { products, isLoading } = useProducts('/products?contacto');

  return (
    <ShopLayout title={'Salvador Dengra Inmobiliaria - Contacto'} pageDescription={'Encuentra la propiedad que mejor se ajuste a tus necesidades'}>
      <Typography variant='h1' component='h1'>Contacto</Typography>
        <Divider />

      <Divider />
      <Typography variant='h2' sx={{ mt: 4 }}>Encontranos en Guamini 5380</Typography>
      <Typography variant='h2' sx={{ mt: 2 }}>Villa Lugano - C.A.B.A</Typography>
      <Typography variant='h2' sx={{ mt: 2, mb: 2 }}>Telefono: 4604 - 2563 / Celular: 1161451216</Typography>
      <Box className='mapa' overflow='hidden'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3280.5410653634617!2d-58.471407600000006!3d-34.6915306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcceaf0a383b59%3A0x2225497f4cf8967d!2sGuamin%C3%AD%205380%2C%20C1439HAR%20CABA!5e0!3m2!1ses-419!2sar!4v1656340232814!5m2!1ses-419!2sar" width="600" height="450" loading="lazy"></iframe>
      </Box>
      <Box className='tar'><OtrosScreen /></Box>

      <aside id="lateral-contact">
        <h3>REDES SOCIALES</h3>
          <div id="social">
              <div><a href="https://wa.link/5z6cfy" target="_blank"><WhatsAppIcon />Whatsapp</a></div>
              <div className='face'><a href="https://www.facebook.com/dengrapropiedades" target="_blank"><FacebookIcon />Facebook</a></div>
          </div>
      </aside>
    </ShopLayout>
  )
}

export default ContactoPage;