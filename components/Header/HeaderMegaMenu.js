import {
    createStyles,    Header,    Group,    Button,
    Divider,    Box,    Burger,    Drawer,    ScrollArea,     ActionIcon, Indicator, Flex,
  } from '@mantine/core';
  import noImage from '../img/noImage.png'
  import Logo from '../img/GB_Tech_Logo.png'
  import LogoDark from '../img/logo_dark.png'
  import { useDisclosure } from '@mantine/hooks';

import Link from 'next/link';
import Image from 'next/image'
import { ColorScheme } from './ColorScheme';
import { IconBuildingStore, IconHome, IconLogin, IconLogout, IconUserPlus, IconUsers } from '@tabler/icons';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/UserContext';
import { TiShoppingCart } from 'react-icons/ti';
import { ShoppingCartContext } from '../Context/ShopingCartContext';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';

  
  const useStyles = createStyles((theme) => ({
    link: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
      textDecoration: 'none',
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontWeight: 500,
      fontSize: theme.fontSizes.sm,
  
      [theme.fn.smallerThan('sm')]: {
        height: 42,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      },
  
      ...theme.fn.hover({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      }),
    },
  
    subLink: {
      width: '100%',
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
      borderRadius: theme.radius.md,
  
      ...theme.fn.hover({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      }),
  
      '&:active': theme.activeStyles,
    },
  
    dropdownFooter: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      margin: -theme.spacing.md,
      marginTop: theme.spacing.sm,
      padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
      paddingBottom: theme.spacing.xl,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
    },
  
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
  
  
  export function HeaderMegaMenu() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const { classes, theme } = useStyles();

    const { count, getUser,  setUser  } = useContext(UserContext);
    const {cart } = useContext(ShoppingCartContext)
    const [user, setLUser] = useState({})

    const router = useRouter()
    const {data: session, status} = useSession()
    // console.log('session', session);

    const handleSignOut = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('userid');
      router.push('/api/auth/signout')
      setUser(null)
      // setUser(null)
      // window.open(location, "_self");
    }

    useEffect(()=>{
      const securePage = async () => {
        const session = await getSession()
        if(session) {
          const contextuser = await getUser(session.user.email)
          setLUser(contextuser)
        } 
      }
      securePage();
    },[])

    console.log(user);

    return (
      <Box pb={20}>
        <Header height={60} px="md">
          <Group position="apart" sx={{ height: '100%' }}>
            <Image priority src={theme.colorScheme === 'dark' ? LogoDark : Logo } height={50} alt="GB Technology" />
  
            <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>

              <Link href="/store" className={classes.link}>
                <IconHome /> Store
              </Link>


            { user && user.profile_pic ?  
              (
                <>
                  <Link href="/home" className={classes.link}>
                    <IconHome /> Home
                  </Link>

                {user ? user.role==='admin' ? (
                  
                <Link href="/admin/ManageUser" className={classes.link}>
                  <Indicator inline label={count.totalUsers} position="top-start" size={16}>
                    <Flex align="center"><IconUsers /> Users</Flex>
                  </Indicator>
                </Link>
                  ) : void 0 : void 0 }

                {user ? user.type==='vendor' || user.type==='both' ? (
                <Link href="/products" className={classes.link}>
                  <IconBuildingStore /> Products
                </Link> ) : void 0 : void 0 }

                <Group className={classes.hiddenMobile}>
 
                  <Link href="/UserProfile" className={classes.link}>
                  <Indicator label={count.totalEmails} size={16} color="red">
                   <Image src={user.profile_pic==="null" ? noImage : user.profile_pic  } width={32} height={32} radius="50%" fit="contain" alt='user' />
                  </Indicator> &nbsp;
                      {user.fullName.substring(0,user.fullName.indexOf(" "))}
                  </Link> 
                  

                  {/* <Tooltip label="Sign out to protect your data">
                    <Button radius="xl" variant="gradient" gradient={{ from: 'orange', to: 'red' }} onClick={handleSignOut}> &nbsp;Log out</Button>
                  </Tooltip> */}
                    <ActionIcon variant="outline" mx="sm" onClick={handleSignOut} title="Sign out to protect your privacy" >
                      <IconLogout />
                    </ActionIcon>
                </Group>
                </> 
              ) 
            : (
              <>
                <Group className={classes.hiddenMobile}>
                  <Link href="/login"><Button variant="default" ><IconLogin /> Log in</Button></Link>
                  <Link href="/signup"><Button variant="default" mr="md" ><IconUserPlus /> Sign up</Button></Link>
                </Group>
              </>
            ) }
                <Group >
                  <Indicator label={cart.total_item} showZero={false} dot={false} inline size={16} >
                    <ActionIcon component={Link} href= "/cart" variant='outline' radius="lg">
                        <TiShoppingCart />
                    </ActionIcon>
                  </Indicator>
                  <ColorScheme />
                </Group>
            </Group>

            <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
          </Group>
        </Header>
  
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Navigation"
          className={classes.hiddenDesktop}
          zIndex={1000000}
        >
          <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx="-md">
            <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
  
            <Link href="/" className={classes.link}>
              Home
            </Link>
            <Link href="/userprofile" className={classes.link}>
              Profile
            </Link>
            <Link href="/admin/users" className={classes.link}>
              Users
            </Link>
  
            <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
  
            <Group position="center" grow pb="xl" px="md">
              <Link href="/login"><Button variant="default">Log in</Button></Link>
              <Link href="/signup"><Button variant="default">Sign up</Button></Link>
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
    );
  }