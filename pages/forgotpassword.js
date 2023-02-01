import { useState } from "react";
import Link from "next/link";
import {  Box, Button, Card, Center, Container, Flex, Paper, Text, TextInput, Title } from "@mantine/core";
import ForgotPasswordImg from '../components/img/forgotpassword.png'
import { IconAt } from "@tabler/icons";
import {ForgotPasswordAPI} from "../APIs/ForgotPasswordAPI";
import { showNotification as notify } from "@mantine/notifications";
import Image from "next/image";

const ForgotPassword = () => {

    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        ForgotPasswordAPI({email})
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            notify({title: 'Email Sent', message: 'Recovery email sent, check your inbox'})
            })
            .catch(function (error) {
                notify({title: 'Error', message: error.response.data.status})
                console.log(error);
            });

    }

  return (
    <Container>
        <Card shadow="sm" p="md" m="lg" radius="md" withBorder>
            <Title mb="sm" order={2}>
                Recover Password
            </Title>
            <Flex shadow="xl" radius="md"  >
                <Image
                    src={ForgotPasswordImg}
                    width={360} height={400}
                    alt="forgot" />
                    
                    <form onSubmit={handleSubmit}>
                    <Flex my="sm" justify="flex-end"
                        align="flex-end"
                        direction="column"
                        wrap="wrap">
                        <Box p="lg" withBorder>

                        <TextInput
                            type="email"
                            label="Email Address"
                            placeholder="Your email"
                            icon={<IconAt size={16} />}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Text fz="xs" c="dimmed">
                            We'll never share your email with anyone else.
                        </Text>
             
                            <Button my="sm" type="submit" fullWidth variant="outline">Recover</Button>
                            <Center>
                                <Text size="sm">
                                    Need an account?
                                    <Link href="/signup">
                                    <Button mx="sm" compact variant="outline" size="xs">
                                        <Text>Sign up here</Text>
                                    </Button>
                                    </Link>
                                </Text>
                            </Center>
                        </Box>
                    </Flex>
                    </form>
                    
                    
            </Flex>


        </Card>
    </Container>
  )
}

export default ForgotPassword
