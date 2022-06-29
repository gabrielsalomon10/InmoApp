import { FC, useMemo, useState } from 'react';
import NextLink from 'next/link';
import { Grid, Card, CardActionArea, Divider, CardMedia, Box, Typography, Link } from "@mui/material";

import { IProduct } from '../../interfaces';

interface Props {
    product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {

  const [ isHovered, setIsHovered ] = useState( false );

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const productImage = useMemo(() => {
    return isHovered
    ? product.images[1]
    : product.images[0]
  }, [ isHovered, product.images ]);

  return (
    <Grid item 
          xs={6} 
          sm={3} 
          key={ product.slug }
          onMouseEnter={ () => setIsHovered( true ) }
          onMouseLeave={ () => setIsHovered( false ) }
    >
      <Card sx={{ mt:1}}>
        <NextLink href={`/product/${ product.slug }`} passHref prefetch={ false }>
          <Link>
            <CardActionArea>
              <CardMedia
                component='img'
                sx={{ mb: 1 }}
                className='fadeIn tarjeta'
                image={ productImage }
                alt={ product.title }
                onLoad={ () => setIsImageLoaded }
              />
                <Box>
                  <Typography className="titulo">{ product.type } .{ product.title }</Typography> 
                  <Typography sx={{ mt:2}}>{ product.title.includes('Alquiler') ? `$${ product.price }` : `USD${ product.price }` }</Typography> 
                </Box>
                {/* <div className='card'><span className='carDiv'> , </span></div> */}
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>

      <NextLink href={`/product/${ product.slug }`} passHref prefetch={ false }>
        <Link>
          <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'>
            <Typography> { product.title }</Typography>
            <Typography> ${ `$${product.price}` }</Typography>
          </Box>
        </Link>
      </NextLink>
    </Grid>
  )
} 
