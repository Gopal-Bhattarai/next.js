import NextAuth from "next-auth";
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials';


export const authOptions = {
    // Configure one or more authentication providers
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials:{
          email: {
            label: 'Email Address',
            type: 'email',
            placeholder: 'youremail@gbtechnology.com',
          },
          password: {label: 'Password', type:'password'}
        },
        async authorize(credentials, req) {
          const payload = {
            email: credentials.email,
            password: credentials.password,
          };
          
          const res = await fetch(`http://localhost:3000/api/users/login`,{
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
              'Content-Type' : 'application/json',
            },
          });

          const user = await res.json();
          console.log(user);
          if(res.ok && user) {
            return user.user;
          }

          return null;
        },
      }),
      
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),

      GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
      
      FacebookProvider({
        clientId: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
      }),
      // ...add more providers here

    ],
    // secret: process.env.NEXT_PUBLIC_JWT_SECRET,
    // pages: {
    //   signin: '/login',
    // },
    // callbacks: {
    //   async jwt({ token, user, account }) {
    //     if(account && user) {
    //       return {
    //         ...token,
    //         accessToken: user.token,
    //         refreshToken: user.refreshToken,
    //       }
    //     }
    //     return token
    //   },
    //   async session({ session, token }) {
    //     session.user.accessToken = token.accessToken;
    //     session.user.refreshToken = token.refreshToken;
    //     session.user.accessTokenExpires = token.accessTokenExpires;
  
    //     return session;
    //   },
    // }
  }
  export default NextAuth(authOptions)