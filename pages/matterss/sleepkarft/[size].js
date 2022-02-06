import Header from "../../../components/Header";
import Link from "next/link";
import SubCategoryMatterss from "../../../components/SubCategoryMatterss";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { productState } from "../../../atoms/SelectProduct";
import axios from "axios";
import ProductsCard from "../../../components/ProductsCard";
import { BackTop } from "antd";
import { Skeleton, Select, Form, Button } from "antd";
import { useRouter } from "next/router";

const { Option } = Select;

function Matterss() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [products, setProducts] = useState();
  const [selectProduct, setSelectproduct] = useRecoilState(productState);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState("");
  const [thickness, setThickness] = useState("");
  const [filteredMatterss, setFilteredMatterss] = useState([]);

  var subCategory = "";
  var category = "";
  var url = "";
  var sizeAndThickness = "";
  if (typeof window !== "undefined") {
    subCategory = window.location.href.split("/")[4];
    sizeAndThickness = window.location.href.split("/")[5];
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

  const getSearchProductBySizeAndThickness = async () => {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/getFilteredProductBySizeAndThickness`,
        {
          size: sizeAndThickness.split("%20")[0],
          subCategory: subCategory,
          thickness: Number(sizeAndThickness.split("%20")[1]),
        }
      )
      .then(function (response) {
        console.log(response.data.product);
        setFilteredMatterss(response.data.product);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSelectProduct = (product) => {
    setSelectproduct(product._id);
    window.localStorage.setItem("productId", product._id);
  };

  // const handleSizeChange = (value) => {
  //   setSize(value);
  // };

  // const handleThicknessChange = (value) => {
  //   setThickness(value);
  // };

  // const onFinish = async () => {
  //   console.log(form.getFieldValue().size);
  //   console.log(form.getFieldValue().thickness);
  //   getSearchProductBySizeAndThickness();
  // };

  useEffect(() => {
    getProducts();
  }, [url]);

  useEffect(() => {
    getSearchProductBySizeAndThickness();
  }, []);

  return (
    <>
      <Header />

      <SubCategoryMatterss />
      <span className="flex">
        <p className="mt-5 ml-5 text-xl text-gray-600 font-body">
          Product Variant:
        </p>
        <p className="mt-5 ml-2 text-xl font-bold uppercase font-body">
          {subCategory}
        </p>
      </span>
      <Link href="/matterss/sleepkarft" replace={true}>
        <p className="cursor-pointer ml-5 text-blue-700 underline">
          Need a different Size?
        </p>
      </Link>
      {loading ? (
        <>
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <div className="grid gap-2 grid-cols-2 lg:grid-cols-4 lg:grid-rows-4 lg:gap-y-10 w-full lg:h-[100%]">
          {filteredMatterss &&
            filteredMatterss.map((product) => {
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

export default Matterss;
