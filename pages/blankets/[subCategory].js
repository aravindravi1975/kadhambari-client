import Header from "../../components/Header";
import Link from "next/link";
import SubCategoryBlankets from "../../components/SubCategoryBlankets";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { productState } from "../../atoms/SelectProduct";
import axios from "axios";
import ProductsCard from "../../components/ProductsCard";
import { BackTop } from "antd";
import { Skeleton } from "antd";

function Blankets() {
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

      <SubCategoryBlankets />
      <span className="flex">
        <p className="mt-5 ml-5 text-xl text-gray-600 font-body">
          Product Variant:
        </p>
        <p className="mt-5 ml-2 text-xl font-bold uppercase font-body">
          {subCategory}
        </p>
      </span>
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

export default Blankets;
