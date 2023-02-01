import React, { use, useContext, useEffect, useRef, useState } from 'react'
import { Avatar, Badge, Box, Button, Card, Container, FileInput, Flex, Group, Image, Paper, Switch, TextInput, Title } from '@mantine/core';
import { showNotification as notify, updateNotification as updateNotify } from "@mantine/notifications";
import { IconCheck, IconX } from '@tabler/icons';
import { UserProfileChangeAvatar, UserProfileGetDetailAPI, UserProfileUpdateAPI, } from '../APIs/UserProfileAPI';
import { UserContext } from '../components/Context/UserContext'
import { getSession } from 'next-auth/react';

const UserProfile = ({updateChange}) => {
    
    const {dispatch, getUser, user, setUser} = useContext(UserContext);
    const [luser, setLUser] = useState()

    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')

    // This variable determines whether password is shown or not
    const [isShown, setIsShown] = useState(false);
    // This variable determines user's profile picture if available or set
    const refAvatar = useRef(null);

    //get users details to render in profile page
    // const getUser = async ()=>{
    //     await UserProfileGetDetailAPI(email)
    //     .then(function (response) {
    //         setUser({_id:response.data.user._id, fullName: response.data.user.fullName,
    //              email:response.data.user.email, profile_pic:response.data.user.profile_pic,
    //               role: response.data.user.role, createdAt: response.data.user.createdAt})
    //         setFile(response.data.user.profile_pic)
    //         })
    //     .catch(function (error) {
    //         notify({title: 'Oooops', message: `Internal Server Error`, color:'red', icon: <IconX /> })
    //         });
    // }


        let avatar
        let userRole

    useEffect(()=>{
        const getUserSessionData = async () => {
            const session = await getSession()
            if(session) {
                const localuser = await getUser(session.user.email)
                setLUser(localuser)
            } 
          }
          getUserSessionData();
        // eslint-disable-next-line 
    },[])


    //function to call axios to backend API to change fullName & Password
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password!==cpassword) {
            return notify({title: 'Oooops', message: `Passwords do not matched`, color:'red', icon: <IconX /> })
          }
          //loading
          notify({id: 'load-data', title: 'Processing...', message: 'Please be patience while we save your changes...', autoClose: false, disallowClose: true, loading: true })
        //   await axios({
        //     url: `${urlHost}/api/users/updateprofile`,
        //     method: 'POST', 
        //     data: {id: user._id, fullName: user.fullName, email: user.email, password: password }
        //   })
        await UserProfileUpdateAPI({id: user._id, fullName: user.fullName, email: user.email, password: password})
          .then((response)=>{
              updateNotify({id: 'load-data', title: 'Success', message: response.data.status , icon: <IconCheck size={20} /> })
              setUser(response.data.user)
          })
          .catch((error)=>{
            // notify({title: 'Oooops', message: 'error.response.data', color:'red', icon: <IconX /> })
            console.log(error);
          })
          await getUser();
    }

    // This function is called when the show password checkbox is checked or unchecked
    const togglePassword = () => {
        setIsShown((isShown) => !isShown);
    };


    //picture clicked to call File click event
    const handlePicClick = () => {
        refAvatar?.current.click()
    }

    //function to change profile picture
    const handleChange = async (e) => {
        if(!e) {
            console.log('no files selected, cancelled');
            return;
        }
        notify({id: 'load-data', title: 'Processing...', message: 'Please be patience while we save your changes...', autoClose: false, disallowClose: true, loading: true })
        setUser({...user, profile_pic: URL.createObjectURL(e)});
        const formData = new FormData();
        formData.append("avatar", e)

        // await axios({
        //     url: `${urlHost}/api/users/avatar/${user._id}`, 
        //     method: 'POST',
        //     headers: { "Content-Type": "multipart/form-data" },
        //     data: formData,
        // })
        UserProfileChangeAvatar(user, formData)
        .then((response)=>{
            // updateChange(response.data.user)
            updateNotify({id: 'load-data', title: 'Success', message: response.data.status , icon: <IconCheck size={20} /> })
            //console.log(response.data)
        })
        .catch((error)=>console.log(error))
    }

    
  return (
    <Container>
        {luser && luser._id && 
        <Card shadow="sm" p="md" m="lg" radius="md" withBorder>
            <Title mb="sm" order={2}>Your Profile Page</Title>
            <Group>
                <Badge sx={{ paddingLeft: 0 }} size="xl" radius="xl" color="teal" leftSection={<Avatar src={user.profile_pic} alt='useravatar' />}>
                    {user.role}
                </Badge>

                <Badge>MongoDB ID : {user._id}</Badge>
                <Badge>Active Since: {user.createdAt}</Badge>
            </Group>
            <Button variant='outline' m="sm"onClick={(e)=>dispatch({type: 'users', value: 1})}>Add User</Button>
            <Button variant='outline' onClick={(e)=>dispatch({type: 'emails', value: 1})}>Read Email</Button>
            <Paper shadow="md" radius="md" p="lg" my="lg">
                <TextInput
                    placeholder={user.email}
                    label="Email Address"
                    description="Your registered email address"
                    disabled/>
            </Paper>
            <Flex justify="space-around"  wrap="wrap">
                <Box>
                    <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
                        <Box my="sm">
                            {user._id && <TextInput
                                label="Full Name"
                                value={user.fullName} 
                                onChange={(e)=>setUser({...user, fullName : e.target.value})}
                                required /> }
                        </Box>
                        <Box my="sm">
                            <TextInput
                                label="Password"
                                type={isShown ? "text" : "password"}
                                value={password} 
                                onChange={(e)=>setPassword(e.target.value)} 
                                required />
                        </Box>
                        <Box my="sm">
                            <TextInput
                                label="Confirm Password"
                                type={isShown ? "text" : "password"}
                                value={cpassword} 
                                onChange={(e)=>setCPassword(e.target.value)} 
                                required />
                        </Box>
                        <Box>
                            <Switch checked={isShown}
                            onChange={togglePassword} 
                            label="Show Password?" />
                        </Box>

                        <Button mt="sm" type="submit" variant='light'>Update Profile</Button>
                    </form>
                </Box>

                <Box>
                    <Flex justify="flex-end" align="flex-end" direction="column"
                        wrap="wrap">
                            <Box>

                        <FileInput type="file" placeholder="Pick profile picture" label="Select Picture" id="avatar" name="avatar" ref={refAvatar} accept="image/png, image/gif, image/jpeg" onChange={handleChange} />
                        {user && user.profile_pic && <Paper shadow="lg" radius="md">
                                    <Image width={200} src={user.profile_pic} 
                                        caption="Click to change" alt="user" 
                                        radius="md" 
                                        onClick={handlePicClick}/>
                                    </Paper>
                                    }
                            </Box>
                    </Flex>
                </Box>
            </Flex>

        </Card>
        }
    </Container>
  )
}

export default UserProfile
