import '../styles/globals.css'
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import {SessionProvider} from "next-auth/react"
import Layout from "./layout";

config.autoAddCss = false

function MyApp({Component, pageProps}) {
    return (
        <SessionProvider session={pageProps.session}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>)
}

export default MyApp
