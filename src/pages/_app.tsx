import { AppProps } from "next/app";
import { useFathom } from "../hooks/useFathom";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useFathom("OINAMUQX", "tagtester.dev");

  return <Component {...pageProps} />;
};

export default MyApp;
