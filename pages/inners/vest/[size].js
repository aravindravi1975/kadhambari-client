import Link from "next/link";
import Header from "../../../components/Header";
import SubCategoryInners from "../../../components/SubCategoryInners";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { productState } from "../../../atoms/SelectProduct";
import axios from "axios";
import ProductsCard from "../../../components/ProductsCard";
import { BackTop } from "antd";
import { Skeleton } from "antd";
import LazyLoad from "react-lazyload";

function Size() {
  const [products, setProducts] = useState();
  const [selectProduct, setSelectproduct] = useRecoilState(productState);
  const [loading, setLoading] = useState(true);
  var subCategory = "";
  var url = "";
  var size = "";
  if (typeof window !== "undefined") {
    url = window.location.href;
    subCategory = window.location.href.split("/")[4];
    size = window.location.href.split("/")[5];
  }

  const getProducts = () => {
    // console.log(size);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/getFilteredProductBySize`,
        {
          subCategory: subCategory,
          size: size,
        }
      )
      .then(function (response) {
        // console.log("expected:", response);
        // console.log(response.data.product);
        setProducts(response.data.product);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSelectProduct = (product) => {
    setSelectproduct(product._id);
    window.localStorage.setItem("productId", product._id);
  };

  useEffect(() => {
    getProducts();
  }, [url]);

  return (
    <>
      <Header />
      <SubCategoryInners />
      <span className="flex">
        <p className="mt-5 ml-5 text-xl text-gray-600 font-body">
          Product Variant:
        </p>
        <p className="mt-5 ml-2 text-xl font-bold uppercase font-body">
          {subCategory}
        </p>
        <p className="mt-5 ml-2 text-lg font-semibold uppercase">({size})</p>
      </span>
      <div className="flex space-x-10 mt-5 ml-5">
        <Link href="/inners/vest/s">
          <p className="cursor-pointer">S</p>
        </Link>
        <Link href="/inners/vest/m">
          <p className="cursor-pointer">M</p>
        </Link>
        <Link href="/inners/vest/l">
          <p className="cursor-pointer">L</p>
        </Link>
        <Link href="/inners/vest/xl">
          <p className="cursor-pointer">XL</p>
        </Link>
      </div>
      <div class="grid gap-4 gap-y-[450px] grid-cols-4 grid-rows-4 w-full h-screen">
        {products &&
          products.map((product) => {
            return (
              <ProductsCard
                product={product}
                handleSelectProduct={handleSelectProduct}
              />
            );
          })}
      </div>
      <BackTop />
    </>
  );
}

export default Size;
