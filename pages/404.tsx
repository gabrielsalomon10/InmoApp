import { ShopLayout } from '../components/layouts';
import { Box, Typography } from '@mui/material';


const Custom404 = () => {
    return (
        <>
            <div className="content">
            <ShopLayout title='Pagina no encontrada' pageDescription='No hay nada que mostrar'>
                <Box 
                    display='flex' 
                    justifyContent='center' 
                    alignItems='center' 
                    height='calc(100vh - 200px)'
                    sx={{ flexDirection: { xs: 'column', sm: 'row'} }}
                >
                <Box 
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    height='calc(100vh - 200px)'
                    sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
                > <img src='/chems.jpeg' /> </Box>
                    <Typography variant='h1' component='h1' fontSize={80} fontWeight={200}>404 |</Typography>
                    <Typography marginLeft={2}>No encontramos ninguna pagina |</Typography>
                </Box>
            </ShopLayout>
            </div>
        </>
    )
}

export default Custom404;