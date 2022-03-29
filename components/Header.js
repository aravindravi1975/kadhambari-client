import { useState, useEffect } from "react";
import { ShoppingCartOutlined, PhoneFilled } from "@ant-design/icons";
import { Menu, Dropdown, Modal } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import {
  bedsheet,
  blankets,
  matterss,
  pillows,
  towels,
  inners,
  mats,
  gifts,
} from "../components/Menu";
import ShoppingCart, { HomeIcon } from "./ShoppingCart";
import Link from "next/link";
import Image from "next/image";
import iconWhite from "../public/iconWhite.png";
import axios from "axios";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { filteredState } from "../atoms/FilteredProduct";

function Header() {
  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [product, setProduct] = useRecoilState(filteredState);

  const getSearchProductByName = async (term) => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_HOST_URL}/api/getSearchProductByName`, {
        search: term,
      })
      .then(function (response) {
        if (response.status === 200) {
          response.data.product.map((prod) => {
            setProduct((prev) => [...prev, prod]);
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setProduct([]);
    const searchTerms = search.split(" ");
    searchTerms.map((term) => {
      getSearchProductByName(term);
    });
    await router.push("/filtered");
    // console.log(searchTerms);
  };

  // useEffect(() => {
  //   console.log("product", product);
  // }, [product]);

  return (
    <>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
      >
        <span className="flex">
          <p className="font-bold mr-2">Address</p>
          <p>947, Cross Cut Rd, Ram Nagar, Gandhipuram, Tamil Nadu 641012</p>
        </span>
        <span className="flex">
          <p className="font-bold mr-2">Phone</p>
          <p>0422 249 9995</p>
        </span>
      </Modal>
      <div className="flex items-center justify-between w-full h-[50px] bg-[#07393C] lg:pl-5 lg:pr-8 lg:h-20 lg:pt-2 ">
        <div className="flex items-center gap-x-5 lg:gap-x-10 hover:shadow-2xl cursor-pointer ml-2 md:ml-4 lg:ml-0">
          <HomeIcon />

          <PhoneFilled
            className="text-[20px] text-white cursor-pointer"
            style={{ color: "white" }}
            onClick={() => setModalVisible(true)}
          />
        </div>

        <Link href="/">
          {/* <span className="flex justify-center items-center lg:flex-col"> */}
          {/* <h1 className="text-white text-lg cursor-pointer font-body md:text-xl lg:text-2xl lg:ml-[200px]">
              Kadhambari
            </h1>
            <p className="hidden lg:block text-xs ml-[235px] text-white font-body">
              Since 1976
            </p> */}
          <div className="ml-[1%] lg:ml-[15%] justify-end cursor-pointer">
            <span>
              <p className="text-lg lg:text-2xl font-bold text-white h-0">
                Kadhambari
              </p>
              <p className="text-right pt-1 text-xs text-white">Since 1976</p>
            </span>
            {/* <Image
              src={iconWhite}
              // style={{ width: "50%", height: "100%" }}
              width="190px"
              height="50px"
              alt=""
            /> */}
          </div>
          {/* </span> */}
        </Link>
        <div className="flex">
          <form onSubmit={handleSearch}>
            <input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search a product"
              className="hidden lg:block outline-none bg-[#07393C] border border-solid w-[250px] h-[30px] border-slate-500 rounded-md pl-16 mr-10 text-white"
            />
          </form>
          <ShoppingCart />
        </div>
      </div>
      <div className="hidden md:flex lg:flex justify-evenly shadow-sm h-16 items-center bg-[#2C666E]">
        <Dropdown overlay={bedsheet}>
          <a
            className="ant-dropdown-link text-white font-body"
            onClick={(e) => e.preventDefault()}
          >
            BEDSPREAD <DownOutlined />
          </a>
        </Dropdown>

        <Dropdown overlay={blankets}>
          <a
            className="ant-dropdown-link text-white font-body"
            onClick={(e) => e.preventDefault()}
          >
            BLANKETS <DownOutlined />
          </a>
        </Dropdown>

        {/* <Dropdown overlay={pillows}> */}
        <Link href="/pillows">
          <a
            className="ant-dropdown-link text-white font-body"
            // onClick={(e) => e.preventDefault()}
          >
            PILLOWS <DownOutlined />
          </a>
        </Link>
        {/* </Dropdown> */}

        <Dropdown overlay={towels}>
          <a
            className="ant-dropdown-link text-white font-body"
            onClick={(e) => e.preventDefault()}
          >
            TOWELS <DownOutlined />
          </a>
        </Dropdown>

        <Dropdown overlay={matterss}>
          <a
            className="ant-dropdown-link  text-white font-body"
            onClick={(e) => e.preventDefault()}
          >
            MATTRESS <DownOutlined />
          </a>
        </Dropdown>

        <Dropdown overlay={mats}>
          <a
            className="ant-dropdown-link text-white font-body"
            onClick={(e) => e.preventDefault()}
          >
            MATS <DownOutlined />
          </a>
        </Dropdown>

        <Dropdown overlay={inners}>
          <a
            className="ant-dropdown-link text-white font-body"
            onClick={(e) => e.preventDefault()}
          >
            OTHERS <DownOutlined />
          </a>
        </Dropdown>

        <Dropdown overlay={gifts}>
          <a
            className="ant-dropdown-link text-white font-body"
            onClick={(e) => e.preventDefault()}
          >
            GIFT COMBO <DownOutlined />
          </a>
        </Dropdown>

        <Link href="/offers">
          <a
            className="ant-dropdown-link text-white font-body"
            // onClick={(e) => e.preventDefault()}
          >
            OFFERS <DownOutlined />
          </a>
        </Link>
      </div>
    </>
  );
}

export default Header;
