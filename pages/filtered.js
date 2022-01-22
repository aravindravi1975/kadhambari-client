import { useState, useEffect } from "react";
import Header from "../components/Header";
import SubCategory from "../components/SubCategory";
import ProductsCard from "../components/ProductsCard";
import { BackTop } from "antd";
import { Skeleton } from "antd";
import { useRecoilState } from "recoil";
import { filteredState } from "../atoms/FilteredProduct";
import LazyLoad from "react-lazyload";

function filtered() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useRecoilState(filteredState);

  const handleSelectProduct = (prod) => {
    // setSelectproduct(prod._id);
    window.localStorage.setItem("productId", prod._id);
  };

  return (
    <>
      <Header />
      <SubCategory />
      {loading ? (
        <div className="h-screen">
          <Skeleton active />
          <Skeleton active />
        </div>
      ) : (
        <div className="grid gap-2 grid-cols-2 lg:grid-cols-4 lg:grid-rows-4 lg:gap-y-[360px] w-full lg:h-screen">
          {product.length > 0 &&
            product.map((prod) => {
              return (
                <LazyLoad height={300} once>
                  <ProductsCard
                    key={prod._id}
                    product={prod}
                    handleSelectProduct={handleSelectProduct}
                  />
                </LazyLoad>
              );
            })}
        </div>
      )}

      <BackTop />
    </>
  );
}

export default filtered;
