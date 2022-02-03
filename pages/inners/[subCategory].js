import Header from "../../components/Header";
import Link from "next/link";
import SubCategoryInners from "../../components/SubCategoryInners";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { productState } from "../../atoms/SelectProduct";
import axios from "axios";
import ProductsCard from "../../components/ProductsCard";
import { BackTop } from "antd";
import { Skeleton } from "antd";

function Inners() {
  const [products, setProducts] = useState();
  const [selectProduct, setSelectproduct] = useRecoilState(productState);
  const [loading, setLoading] = useState(true);
  var subCategory = "";
  var category = "";
  var url = "";
  if (typeof window !== "undefined") {
    subCategory = window.location.href.split("/")[4];
    url = window.location.href;
  }

  const getProducts = () => {
    // console.log(subCategory);
    axios
      .post(`${process.env.NEXT_PUBLIC_HOST_URL}/api/getFilteredProduct`, {
        category: category,
        subCategory: subCategory,
      })
      .then(function (response) {
        // console.log("expected:", response);
        // console.log(response.data.product);
        if (response.status === 200) {
          setProducts(response.data.product);
          setLoading(false);
        }
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
        <p className="mt-5 ml-5 text-md lg:text-xl text-gray-600">
          Product Variant:
        </p>
        <p className="mt-5 ml-2 text-md lg:text-xl font-bold uppercase">
          {subCategory}
        </p>
      </span>
      {subCategory !== "lungi" && (
        <div className="flex space-x-10 mt-5 ml-5">
          <Link href={`/inners/${subCategory}/s`}>
            <p className="cursor-pointer">S</p>
          </Link>
          <Link href={`/inners/${subCategory}/m`}>
            <p className="cursor-pointer">M</p>
          </Link>
          <Link href={`/inners/${subCategory}/l`}>
            <p className="cursor-pointer">L</p>
          </Link>
          <Link href={`/inners/${subCategory}/xl`}>
            <p className="cursor-pointer">XL</p>
          </Link>
        </div>
      )}

      {loading ? (
        <>
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <div className="grid gap-2 grid-cols-2 lg:grid-cols-4 lg:grid-rows-4 lg:gap-y-10 w-full lg:h-[100%]">
          {products &&
            products.map((product) => {
              return (
                <ProductsCard
                  key={product._id}
                  product={product}
                  handleSelectProduct={handleSelectProduct}
                />
              );
            })}
        </div>
      )}
      <BackTop />
    </>
  );
}

export default Inners;
