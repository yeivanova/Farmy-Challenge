import React from "react";
import Head from "next/head";
import "../styles/globals.scss";
import { store } from "../services/store";
import { Provider } from "react-redux";

const App = ({ Component, pageProps, router }) => {
    return (
        <Provider store={store}>
            <Head>
                <title>Mel's Kitchen | Join a Salad Club</title>
                <meta
                    property="og:url"
                    content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}
                />
                <meta property="og:locale" content="en_EN" />
            </Head>
            <Component {...pageProps} />
        </Provider>
    );
};

export default App;
