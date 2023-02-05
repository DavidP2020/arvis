import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils/constant";

const TransactionComplete = () => {
  const [itemList, setItemList] = useState([]);
  const fetchItem = async () => {
    try {
      await axios.get(API_URL + "keranjangs").then((res) => {
        const cart = res.data;
        cart.map(function (item) {
          return axios
            .delete(API_URL + "keranjangs/" + item.id)
            .then((result) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchItem();
  }, []);
  return (
    <div className="screen text-center bg-gray-200 mt-0">
      <img src="assets/images/thankyou.svg" width={500} height={500} />
      <h2 className="font-bold text-2xl mt-4">Success Order</h2>
      <p>Thank you for order</p>
      <div className="text-center mt-5">
        <Link
          to="/"
          className="buttonCart bg-black text-white pt-2 pb-2 pl-24 pr-24"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default TransactionComplete;
