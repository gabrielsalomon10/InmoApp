import { NextPage, GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";

import { dbProducts } from "../../database";
import { ShopLayout } from "../../components/layouts";
import { ProductSlideshow } from '../../components/products/ProductSlideshow';
import { IProduct } from "../../interfaces";
import Call from "../../components/layouts/call";


interface Props {
    product: IProduct
}

const ProductPage:NextPage<Props> = ({ product }) => {

    // const router = useRouter();

    // const { products: product, isLoading } = useProducts(`/products/${ router.query.slug }`);

    // if ( isLoading ) {
    //     return <h1>Cargando</h1>
    // }
    const type = product.type;

    return(
        <ShopLayout title={ product.title } pageDescription={ product.description }>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                    <ProductSlideshow 
                        images={ product.images }
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Box display='flex' flexDirection='column'>
                        {/* titulos */}
                        <Typography variant='h1' component='h1'> { product.title } </Typography>
                        {
                            type === 'comprar' ?
                            (
                                <Typography variant='subtitle1' component='h2'>Valor: USD${ product.price } </Typography>        
                            )
                            :
                            (
                                <Typography variant='subtitle1' component='h2'>Valor: ${ `${ product.price }` } </Typography>
                            )
                        }
                        {/* <Typography variant='subtitle1' component='h2'>Valor: ${ `${ product.price }` } </Typography> */}

                        {/* <Chip label='No hay disponibles' color='error' variant='outlined' /> */}
                        <Box sx={{ mt: 3, mb: 3 }}>
                            <Typography variant='subtitle2'>Descripci??n</Typography>
                            <Typography variant='body2'> { product.description } </Typography>
                        </Box>
                        <Typography>
                        <Call/>
                            <p sx={{ mt: 2}}>Tel??fono de l??nea: 4604-2563</p>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
//     const { slug } = params as { slug: string };
//     const product = await dbProducts.getProductBySlug( slug );

//     if( !product ) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false
//             }
//         }
//     }

//     return {
//         props: {
//             product
//         }
//     }
// }

// You should use getStaticPaths if you???re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const productSlugs = await dbProducts.getAllProductsSlug();


    return {
        paths: productSlugs.map( ({ slug }) => ({
                params: {
                    slug
                }
        }) ),
        fallback: "blocking"
    }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user???s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast ??? getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug = '' } = params as { slug: string };
    const product = await dbProducts.getProductBySlug( slug );

    if( !product ) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            product
        }
    }
}

export default ProductPage;