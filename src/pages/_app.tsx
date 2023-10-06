import type { AppProps } from "next/app";
import axios from 'axios';
import '../styles/global.css';
axios.defaults.withCredentials = true;

export default function App({Component, pageProps}: AppProps) {
  return <div style={{maxWidth:"1100px", margin:"auto"}}><Component {...pageProps}></Component></div>
}