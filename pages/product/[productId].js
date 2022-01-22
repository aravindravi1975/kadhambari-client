import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Button, message } from "antd";
import "antd/dist/antd.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState } from "../../atoms/CartAtom";
import { productImageState } from "../../atoms/ProductImageAtom";
import Link from "next/link";
import { productState } from "../../atoms/SelectProduct";
import axios from "axios";
import ProductsCard from "../../components/ProductsCard";
import { cartItemState } from "../../atoms/CostAtom";
import { BackTop } from "antd";
import { Skeleton } from "antd";

axios.defaults.withCredentials = true;

function product() {
  const [cartValue, setCartvalue] = useRecoilState(cartState);
  const [itemCount, setItemCount] = useState(0);
  // const [image, setImage] = useRecoilState(productImageState);
  const [image, setImage] = useState();
  const selectProduct = useRecoilValue(productState);
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  // const [cart, setCart] = useRecoilState(cartItemState);

  var productId = "";
  if (typeof window !== "undefined") {
    productId = window.location.href.split("/")[4];
  }

  // const saveProduct = (product) => {
  //   axios
  //     .post("http://localhost:4001/api/saveItem", product)
  //     .then(function (response) {
  //       console.log("saved:", response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  const getProduct = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_HOST_URL}/api/getOneProduct`, {
        id: productId,
      })
      .then(function (response) {
        // console.log(response);
        if (response.status === 201) {
          setProduct(response.data.product);
          setImage(response.data.product.productPictures[0].img);
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // const updateLocalStorage = (newDatabase) => {
  //   localStorage.setItem("cart", JSON.stringify([newDatabase]));
  // };

  const addToLocalStorage = (product) => {
    // console.log("addToLocalStorage:", product);

    let cartData = {
      temp_id: Math.random().toString(16).slice(2),
      id: product._id,
      name: product.name,
      productId: product.productId,
      slug: product.slug,
      productPictures: product.productPictures[0].img,
      description: product.description,
      discount: product.discount,
      price: product.storePrice,
      quantity: itemCount,
      totalProductPrice: product.storePrice * itemCount,
    };

    const cart = JSON.parse(window.localStorage.getItem("cart"));

    if (cart === null) {
      window.localStorage.setItem("cart", JSON.stringify([cartData]));
    } else {
      const cartItems = cart.filter((item) => item.id === product._id);
      if (cartItems.length > 0) {
        const totalQuantity = cartItems[0].quantity + itemCount;
        const newCart = [
          ...cart.filter((item) => item.id !== product._id),
          { ...cartData, quantity: totalQuantity },
        ];
        window.localStorage.setItem("cart", JSON.stringify(newCart));
        return;
      }
      const getCurrentCart = window.localStorage.getItem("cart");
      const currentCart = JSON.parse(getCurrentCart);

      currentCart.push(cartData);

      window.localStorage.setItem("cart", JSON.stringify(currentCart));
    }
  };

  const totalValue = () => {
    const totalCount = cartValue + itemCount;
    setCartvalue(totalCount);
  };

  const onAdded = () => {
    message.success("Item added to cart", 1);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <Header />
      <div className="lg:flex">
        {loading ? (
          <Skeleton active />
        ) : (
          <>
            {product && (
              <>
                <div className="flex ml-2 mt-2 mb-2 lg:flex-col lg:mt-[170px] lg:ml-5">
                  {product.productPictures.length > 1 && (
                    <>
                      {product.productPictures[1] && (
                        <img
                          src={`${product.productPictures[1].img}`}
                          className="w-[50px] h-[50px] object-cover lg:w-[100px] lg:h-[100px]"
                          onClick={() =>
                            setImage(`${product.productPictures[1].img}`)
                          }
                        />
                      )}
                      {product.productPictures[2] && (
                        <img
                          src={`${product.productPictures[2].img}`}
                          className="w-[50px] h-[50px] object-cover lg:mt-2 lg:w-[100px] lg:h-[100px]"
                          onClick={() =>
                            setImage(`${product.productPictures[2].img}`)
                          }
                        />
                      )}
                    </>
                  )}
                </div>

                <div className="ml-2 lg:ml-8 lg:flex">
                  <img
                    src={image}
                    className="w-[400px] h-[400px] object-contain lg:w-[600px] lg:h-[600px]"
                  />

                  <div className="w-[390px] h-[350px] shadow-xl pt-5 bg-white mt-10 lg:mt-32 lg:ml-14 lg:w-[590px] lg:h-[380px]">
                    <div className="ml-6">
                      <p className="text-lg lg:text-xl font-semibold font-body">
                        {product.name}
                      </p>
                      <p className="text-xs lg:text-sm text-gray-400 font-body">
                        {product.description}
                      </p>
                      <div className="flex gap-10 items-center">
                        {product.originalPrice === product.storePrice ? (
                          <span className="flex gap-2 font-body">
                            <p>MRP:</p>
                            <p>₹{product.storePrice}</p>
                          </span>
                        ) : (
                          <>
                            <span className="flex gap-2 line-through font-body">
                              <p className="hidden lg:block">MRP:</p>
                              <p>₹{product.originalPrice}</p>
                            </span>
                            <span className="flex gap-2 text-lg font-body">
                              <p className="hidden lg:block">Special Price:</p>
                              <p className="font-bold">₹{product.storePrice}</p>
                            </span>
                            <span>
                              <p className="text-orange-600 text-md lg:text-lg font-body">
                                {product.discount}% off
                              </p>
                            </span>
                          </>
                        )}
                      </div>
                      <div>
                        <p className="hidden lg:block">Quantity</p>
                        <div className="flex">
                          {itemCount <= 0 ? (
                            <Button
                              type="primary"
                              className="rounded-full"
                              disabled={true}
                            >
                              -
                            </Button>
                          ) : (
                            <Button
                              type="primary"
                              className="rounded-full"
                              style={{
                                background: "#07393C",
                                borderColor: "#07393C",
                              }}
                              onClick={() => {
                                setItemCount(itemCount - 1);
                              }}
                            >
                              -
                            </Button>
                          )}

                          <div className="w-10 h-10 flex mt-1 justify-center font-semibold">
                            {itemCount > 0 ? itemCount : 0}
                          </div>
                          {itemCount === product.quantity ? (
                            <div className="flex-col">
                              <Button
                                type="primary"
                                className="rounded-full"
                                disabled={true}
                              >
                                +
                              </Button>
                              <p className="mt-2 text-red-600">
                                Sry, We got only {product.quantity} available
                              </p>
                            </div>
                          ) : (
                            <Button
                              type="primary"
                              className="rounded-full"
                              style={{
                                background: "#07393C",
                                borderColor: "#07393C",
                              }}
                              onClick={() => setItemCount(itemCount + 1)}
                            >
                              +
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between mr-5">
                        {itemCount === 0 ? (
                          <Button
                            type="primary mt-[25px] lg:mt-[40px]"
                            disabled={true}
                          >
                            ADD TO CART
                          </Button>
                        ) : (
                          <Button
                            type="primary mt-[25px] lg:mt-[40px]"
                            style={{
                              background: "#07393C",
                              borderColor: "#07393C",
                            }}
                            onClick={() => {
                              setCartvalue(itemCount);
                              // addToCart();
                              // addToState(product);
                              addToLocalStorage(product);
                              totalValue();
                              onAdded();
                            }}
                          >
                            ADD TO CART
                          </Button>
                        )}

                        <Link href="/checkout">
                          <Button
                            type="primary mt-[25px] lg:mt-[40px]"
                            style={{
                              background: "#07393C",
                              borderColor: "#07393C",
                            }}
                          >
                            PROCEED TO CART
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <BackTop />
    </div>
  );
}

export default product;
