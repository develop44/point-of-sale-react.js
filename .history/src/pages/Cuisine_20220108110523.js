import * as React from 'react';
import { useFormik } from 'formik';
import { useState, useRef } from 'react';
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  ProductSort,
  ProductCartWidget,
  ProductFilterSidebar
} from '../components/_dashboard/products';
//
import PRODUCTS from '../_mocks_/products';
import AddOrder from '../components/AddOrder'
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import { request_get } from 'src/config';

// material
import { Grid } from '@mui/material';
import ShopProductCard from '../components/_dashboard/products/ProductCard';
// ----------------------------------------------------------------------

export default function Cuisine() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const orders = useSelector(p => p.orders)
  const p = useSelector(p => p)

  console.log('***********************', p)

  React.useEffect(function(){
    onGetOrder()
  }, [])

  async function onGetOrder(){
    try {
      const result =  await request_get('commandes?archived=false&status.task_name=en_attente')
      if(result&&result['hydra:member']&&result['hydra:member'].length > 0){
        dispatch({type: 'CMD', orders: result['hydra:member']})
      }
    } catch (error) {
      console.log('onLoadTyeOnWait', error)
    }

  }
  

  return (
    <Page title="Commandes">
        <div style={{padding: '30px'}}>
            
            <ProductList products={orders} />
        </div>
    </Page>
  );
}


function ProductList({ products, ...other }) {
    return (
      <Grid container spacing={3} {...other}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={3}>
            <ShopProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    );
  }
