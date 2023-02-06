import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "../../../utils/comma";
import { API_URL } from "../../../utils/constant";

const TotalPrice = ({ total, ...props }) => {
  // Navigasi untuk perpindahaan link
  const navigate = useNavigate();

  //   Fungsi untuk menghitung total bayar
  const totalBayar = total.reduce(function (result, item) {
    return result + item.total_harga;
  }, 0);

  //   Fungsi untuk submit order
  const submitOrder = (totalBayar) => {
    const order = {
      total_bayar: totalBayar,
      menus: total,
    };

    axios.post(API_URL + "pesanans", order).then((res) => {
      navigate("/success-order");
    });
  };
  return (
    <>
      <div className="fixed-bottom">
        <h4>Total Price : Rp. {numberWithCommas(totalBayar)}</h4>
        <div className="mt-4 text-center">
          <button
            className="buttonGoogle bg-black text-white"
            onClick={() => submitOrder(totalBayar)}
          >
            Order
          </button>
        </div>
      </div>
    </>
  );
};

export default TotalPrice;
