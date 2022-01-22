import { useState } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Radio, Modal } from "antd";
import Header from "./Header";
import { useRecoilValue } from "recoil";
import { costState } from "../atoms/CostAtom";
import axios from "axios";
import Swal from "sweetalert2";
import { BackTop } from "antd";
import { useRouter } from "next/router";

const { TextArea } = Input;

function Payment({ isModalVisible, closeModal }) {
  const router = useRouter();
  const [form] = Form.useForm();
  const [isDirect, setIsDirect] = useState(false);
  // const total = useRecoilValue(costState);
  var total;
  if (typeof window !== "undefined") {
    total = window.localStorage.getItem("amountPayable");
  }

  const onFinish = (values) => {
    // console.log("Success:", values);
    done();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const createOrder = () => {
    const data = {
      orders: JSON.parse(window.localStorage.getItem("cart")),
      status: "pending",
      details: {
        email: form.getFieldValue().email,
        fullname: form.getFieldValue().fullname,
        address: form.getFieldValue().address,
        pincode: form.getFieldValue().pincode,
        phone: form.getFieldValue().phone,
        payment: form.getFieldValue().payment,
      },
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_HOST_URL}/api/createOrder`, data)
      .then((response) => {
        // console.log(response);
        Swal.fire(
          "Order Placed Successfully!",
          "You will recieve a confirmation email. Incase any queries, Please contact: 0422 249 9995",
          "success"
        );
        completed();
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const getAndEditQuantity = async (productId) => {
    const data = {
      productId: productId,
    };

    await axios
      .post(`${process.env.NEXT_PUBLIC_HOST_URL}/api/getQuantity`, data)
      .then((response) => {
        // console.log(response.data.product.quantity);
        const totalQuantity = response.data.product.quantity;
        const productId = response.data.product.productId;
        const cartItems = JSON.parse(window.localStorage.getItem("cart"));

        const item = cartItems.find((obj) => {
          return obj.productId === productId;
        });
        // console.log("result:", item);
        const updatedQuantity = totalQuantity - item.quantity;
        editQuantity(productId, updatedQuantity, cartItems);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editQuantity = (productId, quantity, cartItems) => {
    const data = {
      productId: productId,
      quantity: Number(quantity),
    };

    axios
      .put(`${process.env.NEXT_PUBLIC_HOST_URL}/api/updateProductDetails`, data)
      .then((response) => {
        console.log("Edited Quantity");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const done = async () => {
    // console.log("Total:", total);
    const cartItems = JSON.parse(window.localStorage.getItem("cart"));
    // console.log(cartItems);
    await cartItems.map((item) => {
      getAndEditQuantity(item.productId);
    });
    createOrder();
  };

  const completed = () => {
    closeModal();
    form.resetFields();
    window.localStorage.clear();
    router.push("/");
  };

  return (
    <Modal
      title="Payment"
      width={900}
      visible={isModalVisible}
      onCancel={closeModal}
      footer={null}
    >
      <>
        <div className="flex-col">
          <div className="w-[20em] lg:w-[700px] mt-10 ml-5 lg:ml-10">
            <Form
              form={form}
              name="payment"
              requiredMark={false}
              initialValues={
                {
                  //   remember: true,
                }
              }
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div>
                <Form.Item
                  label={
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      Email
                    </p>
                  }
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                    {
                      type: "email",
                    },
                  ]}
                >
                  <Input placeholder="Enter Your Email" className="text-left" />
                </Form.Item>

                <Form.Item
                  label={
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      Full Name
                    </p>
                  }
                  name="fullname"
                  rules={[
                    {
                      required: true,
                      message: "Please input your name!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Your Full Name"
                    className="text-left"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      Address
                    </p>
                  }
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please input your address!",
                    },
                  ]}
                >
                  <TextArea rows={4} />
                </Form.Item>

                <Form.Item
                  label={
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      Pincode
                    </p>
                  }
                  name="pincode"
                  rules={[
                    {
                      required: true,
                      message: "Please input your pincode!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your pincode"
                    className="text-left"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      Phone
                    </p>
                  }
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="Enter your phone number"
                    className="text-left"
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  name="payment"
                  label={
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      Payment
                    </p>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please pick a payment method!",
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value="cod" onClick={() => setIsDirect(false)}>
                      COD
                    </Radio>
                    <Radio value="direct" onClick={() => setIsDirect(true)}>
                      Direct
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              {isDirect && (
                <p className="text-green-700 w-[500px]">
                  NOTE: Direct is allowed for items quantity greater than 15.
                  The merchant would directly take available products on the
                  selected category to your doorstep.You could select the
                  required products.
                </p>
              )}

              <Button type="primary" htmlType="submit" className="lg:mb-10">
                Place Order
              </Button>
            </Form>
          </div>
          {/* <div className="flex-col ml-10 mt-10 lg:ml-20 lg:mt-28">
            <div className="w-[25em] h-[180px] shadow-lg rounded-md border-2 lg:w-[400px] lg:h-[180px]">
              <span className="flex justify-between ml-2 mr-2">
                <p className="font-bold text-lg font-body">Order Summary</p>
              </span>

              <span className="flex justify-between ml-2 mr-2">
                <p className="font-body">Cart Total</p>
                <p className="font-body">₹{total}</p>
              </span>
              <span className="flex justify-between ml-2 mr-2">
                <p className="font-body">Shipping Cost</p>
                <p className="font-body">₹0</p>
              </span>
              <span className="flex justify-between ml-2 mr-2 mt-[20px]">
                <p className="font-bold font-body">Order Total</p>
                <p className="font-bold text-lg font-body">₹{total}</p>
              </span>
            </div>
          </div> */}
        </div>
        <BackTop />
      </>
    </Modal>
  );
}

export default Payment;
