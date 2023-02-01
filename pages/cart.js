import React, { useContext, useEffect, useState } from 'react'
import CartItem from '../components/CartItem'
import { ShoppingCartContext } from '../components/Context/ShopingCartContext'
import { Box, Button, Card, Container, Divider, Flex, Paper, SimpleGrid, Text } from '@mantine/core'
import Link from 'next/link'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'

const Cart = () => {
    const {cart, clearCart} = useContext(ShoppingCartContext)
    const [isLoading, setIsLoading] = useState(false)

    console.log('cart.js',cart);
    useEffect(()=>{

      cart.cart && cart.cart.length>0 ? setIsLoading(true) : void 0
    },[])

return (
        <>
       { isLoading && cart.cart.map(product=>(
            <CartItem key={product._id} product={product} />
        ))
       }
    <Container>
    <Divider px="lg" mx="xl" />
      <Card shadow="md" mx="lg" radius="md" >
       {isLoading && cart.cart.length === 0 ? 'No items in cart' : void 0 }
      <SimpleGrid my="sm" cols={5}>
        <Box><Button variant ="outline" component={Link} href="/store">Continue Shopping</Button></Box>
        <Box></Box>
        <Box></Box>
        <Box></Box>
        <Box> {isLoading && cart.cart.length !== 0 && <Button variant='default' color="red" onClick={()=>clearCart(cart.cart)}>CLEAR CART</Button> } </Box>
      </SimpleGrid>
            <Divider mx="xs" />
        <Flex justify="flex-end" m="md">
          <Paper shadow="xs" p="sm" withBorder>
            <Flex gap="xl" wrap="wrap">
              <Box>
                <Text>Sub-Total:</Text>
                <Text>Shipping:</Text>
                <Text my="sm">TOTAL:</Text>
              </Box>
              <Box sx={{textAlign: 'right'}}>
                <Text> { new Intl.NumberFormat('en-NP', { style: 'currency', currency: 'NPR'}, { maximumSignificantDigits: 3 }).format(cart.total_price) }</Text>
                <Text> { new Intl.NumberFormat('en-NP', { style: 'currency', currency: 'NPR'}, { maximumSignificantDigits: 3 }).format(cart.total_price>0 ? cart.shipping_fee : 0) }</Text>
                <Text my="sm">{ new Intl.NumberFormat('en-NP', { style: 'currency', currency: 'NPR'}, { maximumSignificantDigits: 3 }).format(cart.total_price>0 ? cart.shipping_fee+cart.total_price : 0) }</Text>
              </Box>
            </Flex>
            <Button disabled={cart.total_price===0} fullWidth  variant="default" rightIcon={<IoMdCheckmarkCircleOutline size={20} />}> Checkout</Button>
          </Paper>
        </Flex>
      </Card>

    </Container>
      </>
  )
}

export default Cart
