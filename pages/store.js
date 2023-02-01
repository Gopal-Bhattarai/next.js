import ProductContext from '@/components/Context/Product/ProductContext';
import StoreItem from '@/components/StoreItem';
import { Container, Pagination, SimpleGrid} from '@mantine/core';
import React, { useContext, useEffect, useState } from 'react'

// import dynamic from 'next/dynamic';


// const StoreItem = dynamic(() => import('../components/StoreItem'), {ssr: false})


const Store = () => {
    const {products, getPublicProducts} = useContext(ProductContext)
    // const [products, setProducts] = useState(data.product)
    const [activePage, setPage] = useState(1);

    useEffect(()=>{
      getPublicProducts();
    },[])

  return (
    <Container size="xl">
    <SimpleGrid cols={4} spacing="sm" breakpoints={[
        { maxWidth: 980, cols: 3, spacing: 'md' },
        { maxWidth: 755, cols: 2, spacing: 'sm' },
        { maxWidth: 600, cols: 1, spacing: 'sm' },
      ]}>

        {products && products.map(product=>(
            <StoreItem key={product._id} product={product}/>
        ))}

    </SimpleGrid>
    <Pagination page={activePage} onChange={setPage} total={3} />;
    </Container>
  )
}

export default Store

// export async function getServerSideProps() {
//   const res = await fetch('http://localhost:3000/api/products/public')
//   const data = await res.json()

//   if (!data) {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: { data }, // will be passed to the page component as props
//   }
// }