import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import "antd/dist/antd.css";
import { cartState } from "../atoms/CartAtom";
import Header from "../components/Header";
import { Button } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import Link from "next/link";
import { costState } from "../atoms/CostAtom";
import { BackTop } from "antd";
import { Empty } from "antd";
import Payment from "../components/Payment";

function checkout() {
  const cartValue = useRecoilValue(cartState);
  const [totalCost, setTotalCost] = useRecoilState(costState);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [cart, setCart] = useState();
  // const [cart, setCart] = useState();

  // const getCartItems = () => {
  //   axios
  //     .get("http://localhost:4001/api/getCart")
  //     .then(function (response) {
  //       // console.log(JSON.stringify(response.data.items));
  //       setitems(response.data.items);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  const getCartFromLocal = () => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    setItems(cartData);
  };

  const totalCart = (items) => {
    // console.log(items);
    let total = 0;
    total = items
      .map((item) => item.price * item.quantity)
      .reduce((a, b) => a + b);
    // console.log("total:", total);
    setTotal(total);
    setTotalCost(total);
    window.localStorage.setItem("amountPayable", total);
  };

  // const deleteCart = (id) => {
  //   axios
  //     .post("http://localhost:4001/api/deleteItemCart", {
  //       id,
  //     })
  //     .then(function (response) {
  //       console.log(response.data.product);
  //       getCartItems();
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  const deleteCartFromLocal = (temp_id) => {
    const getCurrentCart = window.localStorage.getItem("cart");
    const currentCart = JSON.parse(getCurrentCart);
    const newItems = currentCart.filter((item) => item.temp_id !== temp_id);
    // console.log("newItems:", newItems);
    window.localStorage.setItem("cart", JSON.stringify(newItems));
    getCartFromLocal();
  };

  const closeModal = () => {
    setIsModalVisible(false);
    // console.log("Close modal was called");
  };

  useEffect(() => {
    // getCartItems();
    getCartFromLocal();
  }, []);

  useEffect(() => {
    if (items !== null && items.length > 0) {
      // console.log(items);
      totalCart(items);
    }
  }, [items]);

  return (
    <>
      <Payment isModalVisible={isModalVisible} closeModal={closeModal} />
      <Header />
      {items !== null ? (
        items.length > 0 ? (
          <>
            {/* <span className="flex">
              <p className="ml-10 mt-5 text-xs lg lg:text-md text-[#07393C] font-body">
                *Add product worth ₹2000 to get 5% discount
              </p>
              <p className="mt-5 lg:ml-[500px] text-lg lg:text-xl text-[#07393C] font-body">
                Cart ({items && items.length})
              </p>
            </span> */}
            <div className="lg:flex gap-[120px] h-screen">
              <div className="h-[500px] lg:h-[700px] overflow-scroll scrollbar-hide">
                {items &&
                  items.map((item) => {
                    return (
                      <div
                        className="w-[350px] h-[210px] border-2 bg-white flex items-center ml-6 lg:ml-10 shadow-lg rounded-lg mt-3 lg:w-[900px] lg:h-[250px]"
                        key={item.temp_id}
                      >
                        <div className="ml-5">
                          <img
                            src={`${item.productPictures}`}
                            className="w-[100px] h-[100px] object-cover rounded-md lg:w-[200px] lg:h-[200px]"
                          />
                        </div>
                        <div className="ml-5">
                          <p className="font-bold text-xs lg:text-lg font-body">
                            {item.name}
                          </p>
                          <p className="font-semibold text-xs lg:text-md text-gray-500 font-body">
                            ₹{item.price} per piece
                          </p>
                          <p className="font-semibold text-gray-500 font-body">
                            Total : ₹{item.price * item.quantity}
                          </p>
                          <p className="font-semibold text-gray-500 font-body">
                            Quantity : {item.quantity}
                          </p>
                          <DeleteFilled
                            onClick={() => deleteCartFromLocal(item.temp_id)}
                          />
                        </div>
                      </div>
                    );
                  })}

                <div className="hidden lg:h-10" />
              </div>
              <div className="flex-col mt-10 ml-16 lg:ml-0">
                <div className="w-[250px] h-[200px] shadow-lg rounded-md border-2 lg:w-[250px] lg:h-[300px]">
                  <span className="flex justify-between ml-2 mr-2">
                    <p className="font-bold text-lg font-body">Price Details</p>
                  </span>

                  <span className="flex justify-between ml-2 mr-2">
                    <p className="font-body">Cart Total</p>
                    <p className="font-body">₹{total}</p>
                  </span>
                  <div className="h-[50px] lg:h-[160px] w-[2px] bg-gray-300 ml-8" />
                  <span className="flex justify-between ml-2 mr-2 mt-[20px]">
                    <p className="font-bold font-body">Amount Payable</p>
                    <p className="font-bold text-lg font-body">₹{total}</p>
                  </span>
                </div>
                {/* <Link href="/payment"> */}
                <Button
                  type="primary mt-5 ml-8 mb-10"
                  style={{
                    background: "#07393C",
                    borderColor: "#07393C",
                  }}
                  onClick={() => setIsModalVisible(true)}
                >
                  PROCEED TO PAYMENT
                </Button>
                {/* </Link> */}
              </div>
            </div>
          </>
        ) : (
          <Empty
            className="h-screen"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Cart Empty"
          />
        )
      ) : (
        <Empty
          className="h-screen"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Cart Empty"
        />
      )}
      <BackTop />
    </>
  );
}

export default checkout;
