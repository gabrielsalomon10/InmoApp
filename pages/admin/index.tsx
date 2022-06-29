import { DashboardOutlined, OtherHouses } from '@mui/icons-material';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import { AdminLayout } from '../../components/layouts';
import useSWR from 'swr';
import { DashboardSummaryResponse } from '../../interfaces';

const DasboardPage = () => {

    const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
        refreshInterval: 30 * 1000 //30 segundos
    });

    if( !error && !data ) {
        return <></>
    }

    if( error ) {
        console.log(error);
        return <Typography>Error al cargar la información.</Typography>
    }

    const { numberOfProducts } = data!;

  return (
    <AdminLayout
        title='Dashboard'
        subTitle='Estadísticas generales'
        icon={ <DashboardOutlined /> }
    >

        <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={3}>
                <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <OtherHouses color='secondary' sx={{ fontSize: 40 }} />
                    </CardContent>
                    <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='h3'>{ numberOfProducts }</Typography>
                        <Typography variant='h3'>Propiedades totales</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    </AdminLayout>
  )
}

export default DasboardPage