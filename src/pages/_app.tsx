import type { AppProps } from "next/app";

export default function App({Component, pageProps}: AppProps) {
  return <div style={{maxWidth:"1100px", margin:"auto"}}><Component {...pageProps}></Component></div>
}