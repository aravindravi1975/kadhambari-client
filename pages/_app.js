import "../styles/globals.css";

import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <div className="bg-gray-100">
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  );
}

export default MyApp;
