import { useContext, useState } from "react";

import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import {  LoginOutlined, SearchOutlined, DashboardOutlined } from '@mui/icons-material';
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';
import HouseIcon from '@mui/icons-material/House';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import ReadMoreIcon from '@mui/icons-material/ReadMore';

import { UiContext } from "../../context/ui/UiContext";
import { AuthContext } from '../../context/auth/AuthContext';
import { useRouter } from "next/router";


export const SideMenu = () => {

    const router = useRouter();

    const { admin, isLoggedIn, logout } = useContext( AuthContext );

    const { isMenuOpen, toggleSideMenu } = useContext( UiContext );

    const [searchTerm, setSearchTerm] = useState('');

    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;

        navigateTo(`/search/${ searchTerm}`);
    }

    const navigateTo = ( url: string ) => {

        toggleSideMenu();
        router.push( url );

    }

    const onLogout = () => {

        logout();

    }

  return (
    <Drawer
        open={ isMenuOpen }
        anchor='right'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        onClose={ toggleSideMenu }
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>

                <ListItem>
                    <Input
                        autoFocus
                        value={ searchTerm }
                        onChange={ (e) => setSearchTerm( e.target.value ) }
                        onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={ onSearchTerm }
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>

                <ListItem 
                    button 
                    
                    onClick={ () => navigateTo('/category/comprar')}
                >
                    <ListItemIcon>
                        <HouseIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Comprar'} />
                </ListItem>

                <ListItem 
                    button 
                    
                    onClick={ () => navigateTo('/category/alquilar')}
                >
                    <ListItemIcon>
                        <MapsHomeWorkIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Alquilar'} />
                </ListItem>

                <ListItem 
                    button 
                    
                    onClick={ () => navigateTo('/category/contacto')}
                >
                    <ListItemIcon>
                        <ReadMoreIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Contacto'} />
                </ListItem>


                

                {/* Admin */}
                <Divider />
                <ListSubheader>Admin Panel</ListSubheader>

                {
                    isLoggedIn && (
                    <ListItem 
                        button
                        onClick={ () => navigateTo('/admin/products') }
                    >
                        <ListItemIcon>
                            <DashboardOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Propiedades'} />
                    </ListItem>
                    )
                }

                {
                    isLoggedIn ? (
                    <ListItem 
                        button 
                        onClick={ onLogout }
                    >
                        <ListItemIcon>
                            <LoginOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Salir'} />
                    </ListItem>
                    )
                    :
                    (
                        <ListItem 
                            button 
                            sx={{ justifyContent: 'flex-end'}}
                            onClick={ () => navigateTo('/auth/login') }
                        >
                        <ListItemIcon>
                            <PermDataSettingIcon/>
                        </ListItemIcon>
                         <ListItemText primary={'Administrador'} />
                        </ListItem>
                    )
                }

                
            </List>

                
        </Box>
    </Drawer>
  )
}