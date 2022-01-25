import { useEffect } from "react";
import { Input } from "antd";
import Head from "next/head";

import Posters from "../components/Posters";
import Header from "../components/Header";
import Link from "next/link";
import { BackTop } from "antd";
import Image from "next/image";

import bedspread from "../public/bedspread.jpeg";
import blanket from "../public/blanket.jpeg";
import inner from "../public/inner.jpeg";
import mat from "../public/mat.jpeg";
import towel from "../public/towel.jpeg";
import matters from "../public/matterrs.jpeg";

const { Search } = Input;

export default function Home() {
  const guestId = () => {
    const guestId = Math.random().toString(16).slice(2);
    // console.log(guestId);
    localStorage.setItem("guestId", guestId);
  };

  // useEffect(() => {
  //   guestId();
  // }, []);

  return (
    <div className="h-screen pb-5">
      <Head>
        <title>Kadhambari</title>
        <link rel="icon" href="/favicon.ico" />
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Elsie:wght@900&display=swap');
        </style>
      </Head>
      <Header />
      <div>
        <Posters />
      </div>
      <div>
        <h1 className="font-semibold font-body text-center mt-12 text-lg lg:mt-10 lg:text-2xl">
          CATEGORIES
        </h1>
      </div>
      <div className="bg-gray-100">
        <div className="flex gap-6 mt-12 lg:mt-10 lg:gap-4">
          <Link href="/bedspread">
            <div className="ml-2 w-[135px] h-[135px] md:w-[300px] md:h-[300px] border relative cursor-pointer hover:shadow-2xl lg:ml-5 lg:w-[450px] lg:h-[450px]">
              <Image
                src={bedspread}
                layout="fill"
                className="md:w-[300px] md:h-[300px] object-cover absolute hover:w-[455px] hoverlg::h-[455px] lg:w-[450px] lg:h-[450px] "
              />
              <div className="font-bold text-md ml-1 z-50 absolute text-slate-600 outline-4 font-body lg:text-2xl lg:ml-3">
                Bedsheet
              </div>
            </div>
          </Link>
          <Link href="/blankets">
            <div className="w-[135px] h-[135px] md:w-[300px] md:h-[300px] border relative cursor-pointer hover:shadow-2xl lg:ml-5 lg:w-[450px] lg:h-[450px]">
              <Image
                src={blanket}
                layout="fill"
                className="md:w-[300px] md:h-[300px] object-cover absolute hover:w-[455px] lg:hover:h-[455px] lg:w-[450px] lg:h-[450px]"
              />
              <div className="font-bold text-md ml-1 z-50 absolute text-slate-600 outline-4 font-body lg:text-2xl lg:ml-3">
                Blankets
              </div>
            </div>
          </Link>
          <Link href="/mats">
            <div className="w-[135px] h-[135px] md:w-[300px] md:h-[300px] border relative cursor-pointer hover:shadow-2xl lg:ml-5 lg:w-[450px] lg:h-[450px]">
              <Image
                src={mat}
                layout="fill"
                className="md:w-[300px] md:h-[300px] object-cover absolute hover:w-[455px] lg:hover:h-[455px] lg:w-[450px] lg:h-[450px]"
              />
              <div className="font-bold text-md ml-1 z-50 absolute text-slate-600 outline-4 font-body lg:text-2xl lg:ml-3">
                Mats
              </div>
            </div>
          </Link>
        </div>

        <div className="flex  gap-6 mt-10 lg:mt-10 lg:gap-4">
          <Link href="/towels">
            <div className="ml-2 w-[135px] h-[135px] md:w-[300px] md:h-[300px] border relative cursor-pointer hover:shadow-2xl lg:ml-5 lg:w-[450px] lg:h-[450px]">
              <Image
                layout="fill"
                src={towel}
                className="w-[135px] h-[135px] md:w-[300px] md:h-[300px] object-cover absolute hover:w-[455px] hoverlg::h-[455px] lg:w-[450px] lg:h-[450px]"
              />
              <div className="font-bold text-md ml-1 z-50 absolute text-slate-600 outline-4 font-body lg:text-2xl lg:ml-3">
                Towels
              </div>
            </div>
          </Link>
          <Link href="/matterss">
            <div className="w-[135px] h-[135px] md:w-[300px] md:h-[300px] border relative cursor-pointer hover:shadow-2xl lg:ml-5 lg:w-[450px] lg:h-[450px]">
              <Image
                layout="fill"
                src={matters}
                className="w-[135px] h-[135px] md:w-[300px] md:h-[300px] object-cover absolute hover:w-[455px] lg:hover:h-[455px] lg:w-[450px] lg:h-[450px]"
              />
              <div className="font-bold text-md ml-1 z-50 absolute text-slate-600 outline-4 font-body lg:text-2xl lg:ml-3">
                Matterss
              </div>
            </div>
          </Link>
          <Link href="/inners">
            <div className="w-[135px] h-[135px] mb-10 md:w-[300px] md:h-[300px] border relative cursor-pointer hover:shadow-2xl lg:ml-5 lg:w-[450px] lg:h-[450px]">
              <Image
                layout="fill"
                src={inner}
                className="w-[135px] h-[135px] md:w-[300px] md:h-[300px] object-cover absolute hover:w-[455px] lg:hover:h-[455px] lg:w-[450px] lg:h-[450px]"
              />
              <div className="font-bold text-md ml-1 z-50 absolute text-slate-600 outline-4 font-body lg:text-2xl lg:ml-3">
                Inners
              </div>
            </div>
          </Link>
        </div>
      </div>
      <BackTop />
    </div>
  );
}

//SSR for getting the posters
// export const getServerSideProps = async () => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_HOST_URL}/api/poster/getposter`
//   );
//   const data = await res.json();
//   const poster = data?.poster;

//   return {
//     props: {
//       poster,
//     },
//   };
// };
