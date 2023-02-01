import login from "@/pages/login"
import Store from "@/pages/store"
import Link from "next/link"
import useSWR from 'swr'
import { HeaderMegaMenu } from "@/components/Header/HeaderMegaMenu";
import { UserContext } from "@/components/Context/UserContext";
import { useRouter } from "next/router";
import { useEffect } from "react";


const Home = () => {

  const router = useRouter();
  useEffect(()=>{
    localStorage.getItem('email') ? null : router.push('/store')
  },[])

  return (
        <>


          {/* {!user && <login userstate={(user)=>setUser(user)} /> } */}

        </>
  )
}

export default Home
