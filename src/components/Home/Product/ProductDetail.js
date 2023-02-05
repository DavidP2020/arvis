import React, { useEffect, useState } from "react";
import { API_URL } from "../../../utils/constant";
import axios from "axios";
import { Box, Button } from "@mui/material";
import swal from "sweetalert";
import { numberWithCommas } from "../../../utils/comma";

const ProductDetail = ({ data, handleClose, ...props }) => {
  const [itemList, setItemList] = useState([]);
  const [cart, setCart] = useState([]);
  const [qty, setQty] = useState([]);

  const addToCart = async (value) => {
    console.log(value);

    try {
      let res = await axios
        .get(API_URL + "keranjangs?product.id=" + value.id)
        .then((res) => {
          if (res.data.length === 0) {
            const cart = {
              jumlah: qty,
              total_harga: value.harga,
              product: value,
            };
            try {
              axios.post(API_URL + "keranjangs", cart).then((res) => {
                swal({
                  title: "Success Add to Cart",
                  text: "Success Add to Cart " + cart.product.nama,
                  icon: "success",
                  buttons: false,
                  timer: 1000,
                });
                handleClose();
                window.location.reload(false);
              });
            } catch (error) {
              console.log(error);
            }
          } else {
            const cart = {
              jumlah: qty,
              total_harga: qty * value.harga,
              product: value,
            };
            try {
              axios
                .put(API_URL + "keranjangs/" + res.data[0].id, cart)
                .then((res) => {
                  swal({
                    title: "Success Add to Cart",
                    text: "Success Add to Cart " + cart.product.nama,
                    icon: "success",
                    buttons: false,
                    timer: 1000,
                  });
                  handleClose();
                  window.location.reload(false);
                });
            } catch (error) {
              console.log(error);
            }
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);
  return (
    // Card Box
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "36ch" },
      }}
      component={"div"}
    >
      <div className="flex flex-wrap mb-10 ">
        {/* Left Side */}
        <div className="left-side w-1/2  bg-gradient bg-gradient-to-bl from-blue-800 to-blue-500">
          <img
            src={data.gambar}
            alt="pangsit"
            width={100}
            height={100}
            priority
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="right-side w-1/2">
          {/* Name */}
          <div className="text-4xl text-center mb-4">{data.nama}</div>

          {/* Kode & Category */}
          <div className="flex items-center gap-2 p-2">
            <span className="badge text-sm">{data.kode}</span>
            <span className="badge text-sm">{data.category.nama}</span>
          </div>

          {/* Price List */}
          <div className="text-lg text-gray-700 leading-6 p-2">
            <span>Rp. {numberWithCommas(data.harga)}</span>
          </div>

          {/* Description */}
          <div className="pt-3 ">
            <span className="text-sm text-gray-700 leading-6 p-2 font-bold">
              Description
            </span>
            <p className="text-sm text-gray-700 pl-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,
            </p>
          </div>

          {/* Amount */}
          <div class="flex leading-none p-2 pt-6">
            <div class="w-1/3">Amount</div>
            <div class="w-2/3 flex space-x-6 justify-center">
              <div class="increment-input flex space-x-3 bg-gray-100 rounded-full overflow-hidden">
                <span>
                  <input
                    type="number"
                    id="qty"
                    nama="qty"
                    placeholder="1"
                    min="1"
                    onChange={(e) => setQty(e.target.value)}
                    class="bg-gray-500 w-20 text-white focus:outline-none active:outline-none text-center text-md"
                  />
                </span>
              </div>
            </div>
          </div>

          {/* Add to Card */}
          <div className="text-center pt-10">
            <button
              className="buttonCart bg-black text-white"
              type="button"
              onClick={() => addToCart(data)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Button Close */}
      <div style={{ textAlign: "right" }}>
        <button
          onClick={handleClose}
          type="button"
          className="buttonCart bg-blue-600 w-32 text-white"
        >
          Cancel
        </button>
      </div>
    </Box>
  );
};

export default ProductDetail;
