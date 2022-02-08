import Header from "../../components/Header";
import Link from "next/link";
import SubCategoryMatterss from "../../components/SubCategoryMatterss";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { productState } from "../../atoms/SelectProduct";
import axios from "axios";
import ProductsCard from "../../components/ProductsCard";
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

  const getSearchProductBySizeAndThickness = async (size, thickness) => {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/getFilteredProductBySizeAndThickness`,
        {
          size: size,
          subCategory: subCategory,
          thickness: thickness,
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

  const handleSizeChange = (value) => {
    setSize(value);
  };

  const handleThicknessChange = (value) => {
    setThickness(value);
  };

  const onFinish = async () => {
    console.log(form.getFieldValue().size);
    console.log(form.getFieldValue().thickness);
    getSearchProductBySizeAndThickness(
      form.getFieldValue().size,
      form.getFieldValue().thickness
    );
  };

  useEffect(() => {
    getProducts();
  }, [url]);

  useEffect(() => {
    router.push(`/matterss/${subCategory}/${size} ${thickness}`);
  }, [filteredMatterss]);

  const allSizeRecorn = [
    "78x72",
    "78x60",
    "78x48",
    "78x36",
    "78x78",
    "75x72",
    "75x60",
    "75x48",
    "75x44",
    "75x36",
    "72x72",
    "72x60",
    "72x48",
    "72x36",
  ];

  const allSizeSleepkarft = [
    "72x30",
    "72x35",
    "72x36",
    "72x42",
    "72x48",
    "72x60",
    "72x66",
    "72x72",
    "75x30",
    "75x35",
    "75x36",
    "75x42",
    "75x48",
    "75x60",
    "75x66",
    "75x72",
    "78x30",
    "78x35",
    "78x36",
    "78x42",
    "78x48",
    "78x60",
    "78x66",
    "78x72",
    "84x30",
    "84x35",
    "84x36",
    "84x42",
    "84x48",
    "84x60",
    "84x66",
    "84x72",
  ];

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
      <div className="flex space-x-10 mt-5 ml-5">
        <Form
          className="flex gap-x-10"
          form={form}
          name="filterMatterss"
          requiredMark={false}
          initialValues={
            {
              //   remember: true,
            }
          }
          layout="vertical"
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="size"
            // rules={[
            //   {
            //     required: true,
            //     message: "Please select a size!",
            //   },
            // ]}
          >
            {subCategory === "recron" && (
              <Select
                placeholder="Select a size"
                onChange={(value) => handleSizeChange(value)}
                // allowClear
              >
                {allSizeRecorn.map((size) => {
                  return <Option value={size}>{size}</Option>;
                })}
              </Select>
            )}
            {subCategory === "sleepkarft" && (
              <Select
                placeholder="Select a size"
                onChange={(value) => handleSizeChange(value)}
                // allowClear
              >
                {allSizeSleepkarft.map((size) => {
                  return <Option value={size}>{size}</Option>;
                })}
              </Select>
            )}
          </Form.Item>
          <Form.Item
            name="thickness"
            // rules={[
            //   {
            //     required: true,
            //     message: "Please select a thickness!",
            //   },
            // ]}
          >
            {subCategory === "recron" && (
              <Select
                placeholder="Select a thickness"
                onChange={(value) => handleThicknessChange(value)}
                // allowClear
              >
                <Option value="4">4</Option>
                <Option value="5">5</Option>
                <Option value="6">6</Option>
                <Option value="7">7</Option>
                <Option value="8">8</Option>
              </Select>
            )}
            {subCategory === "sleepkarft" && (
              <Select
                placeholder="Select a thickness"
                onChange={(value) => handleThicknessChange(value)}
                // allowClear
              >
                <Option value="4">4</Option>
                <Option value="5">5</Option>
                <Option value="6">6</Option>
                <Option value="7">7</Option>
                <Option value="8">8</Option>
              </Select>
            )}
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="lg:mb-10"
            style={{
              background: "#07393C",
              borderColor: "#07393C",
            }}
          >
            Find
          </Button>
        </Form>
        {/* <Link href={`/matterss/${subCategory}/s`}> */}

        {/* </Link> */}
      </div>
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

export default Matterss;
