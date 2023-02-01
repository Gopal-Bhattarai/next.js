import { Button, Flex, Text } from "@mantine/core"
import { motion } from "framer-motion"
import { IconBrandFacebook, IconBrandGithub, IconBrandGoogle, IconDisc } from "@tabler/icons";
import { buttonVariant } from "../../motion/LoginMotion";
import {signIn} from 'next-auth/react'


const PassportLogin = () => {
  const MoButton = motion(Button)

  const links = [
    {
        name: 'google',
        icon: <IconBrandGoogle />,
        iconName: 'oogle',
        variant: 'outline',
        variants: buttonVariant,
        whileHover: 'hover',
        onClick: `/api/auth/signin`
    },
    {
        name: 'github',
        icon: <IconBrandGithub />,
        iconName: 'ithub',
        variant: 'outline',
        variants: buttonVariant,
        whileHover: 'hover',
        onClick: `/api/auth/signin`
    },
    {
        name: 'facebook',
        icon: <IconBrandFacebook />,
        iconName: 'acebook',
        variant: 'outline',
        variants: buttonVariant,
        whileHover: 'hover',
        onClick: `/api/auth/signin`
    },
    // {
    //     name: 'email, { email }',
    //     icon: <IconDisc />,
    //     iconName: 'Local',
    //     variant: 'outline',
    //     variants: buttonVariant,
    //     whileHover: 'hover',
    //     onClick: `/api/auth/signin`
    // },
  ]

  return (
    <div>
        <Flex my="lg"
            // sx={{ width: 300 }}
            direction={{ base: 'rows' }}
            gap={{ base: 'sm', sm: 'lg' }}
            justify={{ sm: 'center' }}
            align="center"
            wrap="wrap-reverse"
            >
                <Text mt="xs">Login using</Text>
                {links.map(link=>(
                        <MoButton 
                        key = {link.name}
                        variant = {link.variant}
                        variants = {link.variants} 
                        whileHover = {link.whileHover}
                        onClick = {()=>signIn(`${link.name}`)}
                        >
                        {link.icon}{link.iconName}
                        </MoButton>
                    )
                )}


                 <MoButton variants={buttonVariant} whileHover="hover"  variant="outline" onClick={()=>signIn("email", 'Credentials')}>
                 <IconDisc /> Email
                </MoButton>

                {/*<MoButton variants={buttonVariant} whileHover="hover" mb="md"  variant="outline" onClick={github}>
                  <IconBrandGithub />itHub
                </MoButton>
                <MoButton variants={buttonVariant} whileHover="hover" mb="md"  variant="outline" onClick={facebook}>
                  <IconBrandFacebook/>acebook
                </MoButton> */}
        </Flex>
    </div>
  )
}

export default PassportLogin



