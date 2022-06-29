import { CardMedia, Box, Grid, Card, CardActionArea } from '@mui/material';



const OtrosScreen = () => {

    return (
      <>
       
        <Grid 
          className='tarjetas'
          item 
          xs={5} 
          sm={3} 
        >
          <p className='texto'>Ventas</p>
        </Grid>
        <Grid
          className='tarjetas'
          item 
          xs={6} 
          sm={3} 
        >
          <p className='texto'>Compras</p>
        </Grid>
        <Grid
          className='tarjetas'
          item 
          xs={6} 
          sm={3} 
        >
          <p className='texto'>Alquileres</p>
        </Grid>
        <Grid
          className='tarjetas'
          item 
          xs={6} 
          sm={3} 
        >
          <p className='texto'>Tasaciones</p>
        </Grid>
        <Grid
          className='tarjetas'
          item 
          xs={6} 
          sm={3} 
        >
          <p className='texto'>Administracion</p>
        </Grid>
        <Grid
          className='tarjetas'
          item 
          xs={6} 
          sm={3} 
        >
          <p className='texto'>Permutas</p>
        </Grid>
        <Grid
          className='tarjetas'
          item 
          xs={6} 
          sm={3} 
        >
          <p className='texto'>Hipotecas</p>
        </Grid>
        <Grid
          className='tarjetas'
          item 
          xs={6} 
          sm={3} 
        >
          <p className='texto'>Desalojos</p>
        </Grid>
        <Grid
          className='tarjetas'
          item 
          xs={6} 
          sm={3} 
        >
          <p className='texto'>Sucesiones</p>
        </Grid>
        <Box
          className='tarjetas'
        >
          <p className=' finan'>Financiación privada</p>
        </Box>
      </>
    )

}

export default OtrosScreen;