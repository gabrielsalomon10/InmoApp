import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { AppBar, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from "@mui/material";
import { ClearOutlined, SearchOutlined } from '@mui/icons-material';

import { UiContext } from '../../context/ui/UiContext';


export const Navbar = () => {

    const { asPath, push } = useRouter();
    
    const { toggleSideMenu } = useContext( UiContext );

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const onSearchTerm = () => {

        if( searchTerm.trim().length === 0 ) return;
        push(`/search/${ searchTerm }`);

    } 
 
  return (
    <AppBar>
        <Toolbar className='toolbar'>
            <NextLink href='/' passHref>
                <Link display='flex' alignItems='center' className='title'>
                    <Typography variant='h6'> Inmobiliaria | </Typography>
                    <Typography sx={{ ml: 0.5 }} > Salvador Dengra | </Typography>
                </Link>
            </NextLink>

            <Box flex={ 1 } />

            <Box sx={{ display:  isSearchVisible ? 'none' : { xs: 'none', sm:'block' } }} >

                <NextLink href='/category/comprar' passHref>
                    <Link className='prob'>
                        <Button color={ asPath === '/category/comprar' ? 'primary' : 'info' } >Comprar</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/alquilar' passHref>
                    <Link>
                        <Button color={ asPath === '/category/alquilar' ? 'primary' : 'info' }>Alquilar</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/contacto' passHref>
                    <Link>
                        <Button color={ asPath === '/category/contacto' ? 'primary' : 'info' }>Contacto</Button>
                    </Link>
                </NextLink>

            </Box>

            <Box flex={ 1 } />

            {/* Pantallas grandes */}
            {
                isSearchVisible
                ? (
                    <Input
                        sx={{ display: { xs: 'none', sm:'flex' } }}
                        className='fadeIn'
                        autoFocus
                        value={ searchTerm }
                        onChange={ (e) => setSearchTerm( e.target.value ) }
                        onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={ () => { setIsSearchVisible( false )} }
                                    className="fadeIn"
                                >
                                    <ClearOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                )
                : (
                    <IconButton
                        onClick={ () => setIsSearchVisible( true ) }
                        className="fadeIn"
                        sx={{ display: { xs: 'none', sm:'flex' } }}
                    >
                        <SearchOutlined />
                    </IconButton>
                ) 
            }
            {/* Pantallas chiquitas */}
            <IconButton
                sx={{ display: { xs: 'flex', sm: 'none'} }}
                onClick={ toggleSideMenu }
            >
                <SearchOutlined />
            </IconButton>

            

            <Button onClick={ toggleSideMenu }>
                Menú
            </Button>

        </Toolbar>
    </AppBar>
  )
}
