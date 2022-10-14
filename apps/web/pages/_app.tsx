import React from "react";
import "styles/globals.css";
import type { AppProps } from "next/app";
import { AlertProvider } from "store/alertStore";
import { ModalProvider } from "store/modalStore";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ModalProvider>
        <AlertProvider>
          <Component {...pageProps} />
        </AlertProvider>
      </ModalProvider>
    </>
  );
};

export default App;
