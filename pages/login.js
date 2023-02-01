import { React, useEffect, useState } from "react";
import {
  Card,
  Container,
  Modal,
  Paper,
  Text,
  Title,
  Flex,
  Divider,

} from "@mantine/core";
import Image from 'next/image'
import loginImg from "../components/img/login.jpg";
import { containerDiv } from "../components/motion/LoginMotion";
import { motion } from "framer-motion";
import PassportLogin from "../components/users/login/PassportLogin";
import LocalLogin from "../components/users/login/LocalLogin";
import {getSession, signIn, signOut} from "next-auth/react"
import { useRouter } from "next/router";


const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true)
  const [opened, setOpened] = useState(false);

  useEffect(()=>{
    const securePage = async () => {
      const session = await getSession()
      if(session) {
        router.push('/home')
      } else {
        setLoading(false)
      }
    }
    securePage();
  },[])

  if(loading) {
    return <h2>Loading...</h2>
  }



  return (
    <motion.div variants={containerDiv} initial="hidden" animate="visible">
      <Container>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Terms of Use"
        >
          <Text>
            Welcome to our website. If you continue to browse and use this
            website, you are agreeing to comply with and be bound by the following
            terms and conditions of use, which together with our privacy policy
            govern GB Technology's relationship with you in relation to this
            website. If you disagree with any part of these terms and conditions,
            please do not use our website. The term 'GB Technology' or 'us' or
            'we' refers to the owner of the website whose registered office is
            [address]. Our company registration number is [company registration
            number and place of registration]. The term 'you' refers to the user
            or viewer of our website. The use of this website is subject to the
            following terms of use: The content of the pages of this website is
            for your general information and use only. It is subject to change
            without notice. This website uses cookies to monitor browsing
            preferences. If you do allow cookies to be used, the following
            personal information may be stored by us for use by third parties:
            [insert list of information]. Neither we nor any third parties provide
            any warranty or guarantee as to the accuracy, timeliness, performance,
            completeness or suitability of the information and materials found or
            offered on this website for any particular purpose. You acknowledge
            that such information and materials may contain inaccuracies or errors
            and we expressly exclude liability for any such inaccuracies or errors
            to the fullest extent permitted by law. Your use of any information or
            materials on this website is entirely at your own risk, for which we
            shall not be liable. It shall be your own responsibility to ensure
            that any products, services or information available through this
            website meet your specific requirements. This website contains
            material which is owned by or licensed to us. This material includes,
            but is not limited to, the design, layout, look, appearance and
            graphics. Reproduction is prohibited other than in accordance with the
            copyright notice, which forms part of these terms and conditions. All
            trade marks reproduced in this website which are not the property of,
            or licensed to, the operator are acknowledged on the website.
            Unauthorised use of this website may give rise to a claim for damages
            and/or be a criminal offence. From time to time this website may also
            include links to other websites. These links are provided for your
            convenience to provide further information. They do not signify that
            we endorse the website(s). We have no responsibility for the content
            of the linked website(s). Your use of this website and any dispute
            arising out of such use of the website is subject to the laws of
            Nepal.
          </Text>
        </Modal>
        <Card shadow="sm" p="md" m="lg" radius="md" withBorder>

        <Title mb="xs" order={2} >Welcome back</Title>
        <Paper shadow="xl" radius="md" withBorder>
              <Image
                radius="md"
                src={loginImg}
                alt="login"
                sx={{ maxWidth: 840 }}
                mx="auto"
              />
        </Paper>
        
        <Flex justify="space-around" gap="md" wrap="wrap">
          
          <PassportLogin />
          {/* <Divider size="sm" py="xl" my="xl" orientation="vertical" /> */}
          {/* <LocalLogin /> */}

        </Flex>

        </Card>
      </Container>
    </motion.div>
  );
};

export default Login;
