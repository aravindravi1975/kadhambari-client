import Header from "../../components/Header";
import Link from "next/link";
import SubCategoryGifts from "../../components/SubCategoryGifts";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { productState } from "../../atoms/SelectProduct";
import axios from "axios";
import ProductsCard from "../../components/ProductsCard";
import { PlusCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { Modal, Button, Input } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { BackTop } from "antd";
import { Skeleton } from "antd";

function Gifts() {
  const [products, setProducts] = useState();
  const [selectProduct, setSelectproduct] = useRecoilState(productState);
  const [addProductVisible, setAddProductVisible] = useState(false);

  const [file, setFile] = useState(null);
  const [productName, setProductName] = useState();
  const [originalPrice, setOriginalPrice] = useState();
  const [storePrice, setStorePrice] = useState();
  const [category, setCategory] = useState();
  const [subCategory, setSubcategory] = useState();
  const [discount, setDiscount] = useState();
  const [description, setDescription] = useState();

  var categoryUrl = "";
  if (typeof window !== "undefined") {
    categoryUrl = window.location.href.split("/")[3];
    // url = window.location.href;
  }

  const getAllProducts = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/getFilteredProductByCategory`,
        {
          category: categoryUrl,
        }
      )
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

  const addProduct = () => {
    // console.log("Add product");
    const formData = new FormData();
    formData.append("productPictures", file);
    formData.append("productPictures", file);
    formData.append("productPictures", file);
    formData.append("productPictures", file);
    formData.append("name", productName);
    formData.append("originalPrice", originalPrice);
    formData.append("storePrice", storePrice);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("discount", discount);
    formData.append("description", description);

    // console.log(formData);
    // const config = {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // };
    axios
      .post(`${process.env.NEXT_PUBLIC_HOST_URL}/api/addProduct`, formData)
      .then((response) => {
        alert("Product Added");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProduct = (id) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_HOST_URL}/api/deleteProduct`, { id })
      .then((response) => {
        alert("Product Deleted");
        getAllProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeAddProductVisible = () => {
    setAddProductVisible(false);
  };

  const okAddProductVisible = () => {
    setAddProductVisible(false);
  };

  const onInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSelectProduct = (product) => {
    setSelectproduct(product._id);
    window.localStorage.setItem("productId", product._id);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Modal
        width="1000px"
        title="Add Product"
        visible={addProductVisible}
        onOk={okAddProductVisible}
        onCancel={closeAddProductVisible}
        footer={null}
      >
        {/* <AddProductForm /> */}
        <form onSubmit={addProduct}>
          <div>
            <p>Product Name:</p>
            <Input
              className="h-10"
              width="200px"
              type="text"
              name="name"
              placeholder="enter the product name"
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div>
            <p className="mt-5">Original Price:</p>
            <Input
              className="h-10"
              width="200px"
              type="number"
              name="originalPrice"
              placeholder="enter the Original Price"
              onChange={(e) => setOriginalPrice(e.target.value)}
            />
          </div>
          <div>
            <p className="mt-5">Store Price:</p>
            <Input
              className="h-10"
              width="200px"
              type="number"
              name="storePrice"
              placeholder="enter the Store Price"
              onChange={(e) => setStorePrice(e.target.value)}
            />
          </div>
          <div>
            <p className="mt-5">Category:</p>
            <Input
              className="h-10"
              width="200px"
              type="text"
              name="category"
              placeholder="enter the category"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div>
            <p className="mt-5">Sub Category:</p>
            <Input
              className="h-10"
              width="200px"
              type="text"
              name="subCategory"
              placeholder="enter the Sub category"
              onChange={(e) => setSubcategory(e.target.value)}
            />
          </div>
          <div>
            <p className="mt-5">Discount:</p>
            <Input
              className="h-10"
              width="200px"
              type="number"
              name="discount"
              placeholder="enter the discount"
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
          <div>
            <p className="mt-5">Description:</p>
            <Input
              className="h-10"
              width="200px"
              type="text"
              name="description"
              placeholder="enter the description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <p className="mt-10">Upload Product Image:</p>
            <input
              className="mt-2"
              type="file"
              name="posterPictures"
              onChange={onInputChange}
            />
          </div>
          <button
            type="submit"
            className="bg-[#344CB7] w-20 h-10 rounded-sm text-white mt-10 ml-[400px]"
          >
            Upload
          </button>
        </form>
      </Modal>
      <Header />

      <SubCategoryGifts />
      <div className="grid gap-2 grid-cols-2 lg:grid-cols-4 lg:grid-rows-4 lg:gap-y-10 w-full lg:h-[100%]">
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

export default Gifts;
