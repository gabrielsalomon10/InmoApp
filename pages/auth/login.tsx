import { useState, useContext } from 'react';
import NextLink from 'next/link';

import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import { AuthContext } from '../../context';
import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';
import { inmoApi } from '../../api';
import { useRouter } from 'next/router';
import { Navbar } from '../../components/ui';
import LockIcon from '@mui/icons-material/Lock';


type FormData = {
    email   : string,
    password: string,
  };


const LoginPage = () => {

    const router = useRouter();
    const { loginAdmin } = useContext( AuthContext );

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ showError, setShowError ] = useState(false);

    const onLoginAdmin = async( { email, password }: FormData ) => {

        setShowError(false);

        const isValidLogin = await loginAdmin( email, password );

        if ( !isValidLogin ) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
        }



        // Todo: navegar a la pantalla que el usuario estaba
        router.replace('/');

    }


    return (
        <>
            <Navbar />
            <AuthLayout title={'Ingresar'}>
                <form className='form' onSubmit={ handleSubmit(onLoginAdmin) } noValidate>
                    <Box sx={{ width: 350, padding:'10px 20px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
            <Box className='loginBox' >
                <LockIcon />
                Solo administrador 
            </Box>
                                <Typography variant='h1' component="h1" >Iniciar sesión</Typography>
                                <Chip 
                                    label="No reconocemos ese usuario / contraseña"
                                    color="error"
                                    icon={ <ErrorOutline /> }
                                    className="fadeIn"
                                    sx={{ display: showError ? 'flex': 'none' }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    type="email"
                                    label="Correo"
                                    variant="filled"
                                    fullWidth 
                                    { ...register('email', {
                                        required: 'Este campo es requerido',
                                        validate: validations.isEmail
                                        
                                    })}
                                    error={ !!errors.email }
                                    helperText={ errors.email?.message }
                                />

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Contraseña"
                                    type='password'
                                    variant="filled"
                                    fullWidth 
                                    { ...register('password', {
                                        required: 'Este campo es requerido',
                                        minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                                    })}
                                    error={ !!errors.password }
                                    helperText={ errors.password?.message }
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    color="secondary"
                                    className='circular-btn'
                                    size='large'
                                    fullWidth>
                                    Ingresar
                                </Button>
                            </Grid>

                        </Grid>
                    </Box>
            <Box className='loginBox' >
                <LockIcon />
                Solo administrador 
            </Box>
                </form>
            </AuthLayout>
        </>
  )
}

export default LoginPage;