import "@/styles/globals.css";
import ProductState from "@/components/Context/Product/ProductState";
import UserState from "@/components/Context/UserContext";
import ShoppingCartState from "@/components/Context/ShopingCartContext";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { HeaderMegaMenu } from "@/components/Header/HeaderMegaMenu";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: {session, ...pageProps} }) {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "color-scheme",
    defaultValue: "light",
  });
  const toggleColorScheme = () => {
    colorScheme === "dark" ? setColorScheme("light") : setColorScheme("dark");
  };
  useHotkeys([["mod+J", () => toggleColorScheme()]]); //CTRL + J in windows


  return (
    <>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <NotificationsProvider position="top-right" autoClose={2500}>
            <UserState>
              <ProductState>
                <ShoppingCartState>
                  <SessionProvider session={session}>

                    <HeaderMegaMenu />

                    <Component {...pageProps} />

                  </SessionProvider>
                </ShoppingCartState>
              </ProductState>
            </UserState>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
