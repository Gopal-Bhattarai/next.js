import { Button, Container } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";



function productById ({product}) {
    const router = useRouter();

    return (

        <Container>
            <Button variant="outline" onClick={()=>router.back()}>Go Back</Button>
            <h1>Product Name: {product.productName}</h1>
            <h3>Description: <div dangerouslySetInnerHTML={{__html: product.description}} /></h3>
        </Container>
        )

}

export default productById


export async function getServerSideProps(context) {
    const {params} = context;
    const {productid} = params;
    const response = await fetch(`${process.env.API_SERVER_URL}/api/products/public/${productid}`)
    const json = await response.json();

    return{
        props:{
            product: json
        }
    }
}
