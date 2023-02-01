import { createStyles, Box, Card, Container, SimpleGrid, Title,  Text, Paper } from "@mantine/core"
import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import Logo from '../components/img/GB_Tech_Logo.png'
import LogoDark from '../components/img/logo_dark.png'
import SignUpImg from '../components/img/signup.png'
import ResetImg from '../components/img/resetpassword.png'
import ForgotImg from '../components/img/forgotpassword.png'
// import ChartTest from "../components/Chart";
// import ChartUsers from "../components/ChartUsers";
import SubscribeForm from "../components/SubscribeForm";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { UserContext } from "@/components/Context/UserContext";
import { getSession } from "next-auth/react";
// import ChartProducts from "../components/ChartProducts";

const useStyles = createStyles((theme) => ({

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

const Home = () => {
  const { theme } = useStyles();
  const router = useRouter();
  const {user, getUser} = useContext(UserContext)


  useEffect(()=>{
    const securePage = async () => {
      const session = await getSession()
      if(!session) {
        router.push('/login')
      } 
    }
    securePage();
    // localStorage.getItem('email') ? getUser() : router.push('/login')
  },[])

  return (
    <Container size="xl" mt="sm">
      <Card shadow="lg">
        <SimpleGrid cols={3} breakpoints={[
        { maxWidth: 980, cols: 3, spacing: 'md' },
        { maxWidth: 755, cols: 2, spacing: 'sm' },
        { maxWidth: 600, cols: 1, spacing: 'sm' },
      ]}>
          <Box align="center">
            <Image src={theme.colorScheme === 'dark' ? LogoDark : Logo } alt="GB Technology"  />
          </Box>
          <Box align="center">
            <Title order={1}>Who are we?</Title>
            <Box my="sm">
              <Text>
                We are bunch of Supernatural idiots!
              </Text>
            </Box>
          </Box>
          <Box align="center">
            <Title order={1}>Next.js</Title>
            <Box my="sm">
              <Text>
                This app is built using Nextjs
              </Text>
            </Box>
          </Box>
        </SimpleGrid>
      </Card>
      <Carousel
        withIndicators
        height={200}
        slideSize="33.333333%"
        slideGap="md"
        breakpoints={[
          { maxWidth: 'md', slideSize: '50%' },
          { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
        ]}
        loop
        align="start"
      >
      <Carousel.Slide><Image priority src={SignUpImg} alt="signup" /></Carousel.Slide>
      <Carousel.Slide><Image priority src={ResetImg} alt="reset password" /></Carousel.Slide>
      <Carousel.Slide><Image priority src={ForgotImg} alt="forgot password" /></Carousel.Slide>
      {/* ...other slides */}
    </Carousel>

    <SimpleGrid cols={3} my="md" breakpoints={[
        { maxWidth: 980, cols: 3, spacing: 'md' },
        { maxWidth: 755, cols: 2, spacing: 'sm' },
        { maxWidth: 600, cols: 1, spacing: 'sm' },
      ]}>

        <Paper shadow="md" align="center">
          {/* <ChartTest type="bar" /> */}
        </Paper>

        <Paper shadow="md" align="center">
          {/* <ChartTest type="line" /> */}
        </Paper>

        <Paper shadow="md" align="center">
          {/* <ChartTest type="area" /> */}
        </Paper>


        <Paper shadow="lg" align="center" p="xs" mb="md" withBorder>
          {/* <ChartUsers type="bar" /> */}
        </Paper>

        <Paper shadow="lg" align="center" p="xs" mb="md" withBorder>
          {/* <ChartProducts type="bar" /> */}
        </Paper>

        <Paper shadow="lg" align="center" p="xs" mb="md" withBorder>
          <SubscribeForm />
        </Paper>

    </SimpleGrid>

    

    </Container>
  )
}

export default Home
