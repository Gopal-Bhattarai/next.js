import { useState } from "react"
import { Button, Card, Container, Text, TextInput, Title } from "@mantine/core";
import { IconSend } from "@tabler/icons";
import { EmailVerificationAPI } from "../APIs/EmailVerificationAPI";
import { showNotification as notify } from "@mantine/notifications";
import { useRouter } from "next/router";

const emailverification = () => {
    const [token, setToken] = useState('');
    const router = useRouter();

    const handleVerify = (e) => {
        e.preventDefault();
        EmailVerificationAPI({key: token})
        // axios.get(`${urlHost}/api/users/emailverification?key=${token}`)
            .then(function (response) {
            localStorage.setItem('token', response.data.authtoken);
            localStorage.setItem('email', response.data.user.email);
            notify({title: 'success', message: 'Email successfully verified, you may now continue with login'})
            router.push('/home')
            })
            .catch(function (error) {
              console.log('gettin err');
              notify({title: 'Error', message: 'Invalid Token', color: "red"})
            console.log(error);
            });
    }

  return (
    <Container size="md">
    <Card mx="xl" shadow="lg" withBorder>
      <Title my="sm" order={3}>Email Address verification <IconSend /></Title>
        <Text>You have 60 minutes to verify your email address, after that the token will expire</Text>
        <Text>Please check your email inbox for token key, or you may directly click on the link provided in your email address. </Text> <br />
        <TextInput type="text" value={token} onChange={(e)=>setToken(e.target.value)} /> <br />
        <Button variant="outline" mt="md" onClick={handleVerify}>Verify</Button>
    </Card>
    </Container>
  )
}

export default emailverification
