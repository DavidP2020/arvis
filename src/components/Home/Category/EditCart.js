import React, { useEffect, useState } from "react";
import { API_URL } from "../../../utils/constant";
import axios from "axios";
import { Box, Button } from "@mui/material";
import swal from "sweetalert";
import { numberWithCommas } from "../../../utils/comma";

const EditCart = ({ data, handleClose, ...props }) => {
  const [qty, setQty] = useState(data.jumlah);
  const [item, setItem] = useState(data);

  //   Update Cart
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      jumlah: qty,
      total_harga: qty * item.product.harga,
      product: item.product,
      keterangan: "",
    };

    axios
      .put(API_URL + "keranjangs/" + item.id, data)
      .then((res) => {
        swal({
          title: "Success Update Order!",
          text: "Sukses Success Update Order " + data.product.nama,
          icon: "success",
          button: false,
          timer: 1500,
        });
        console.log(data);
        handleClose();
        window.location.reload(false);
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };

  //   Menghapus Cart
  const deleteOrder = (id) => {
    axios
      .delete(API_URL + "keranjangs/" + id)
      .then((res) => {
        swal({
          title: "Delete Order!",
          text: "Success Delete Order " + item.product.nama,
          icon: "error",
          button: false,
          timer: 1500,
        });
        handleClose();
        window.location.reload(false);
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };
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
            src={data.product.gambar}
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
          <div className="text-4xl text-center mb-4">{data.product.nama}</div>

          {/* Kode & Category */}
          <div className="flex items-center gap-2 p-2">
            <span className="badge text-sm">{data.product.kode}</span>
            <span className="badge text-sm">{data.product.category.nama}</span>
          </div>

          {/* Price List */}
          <div className="text-lg text-gray-700 leading-6 p-2">
            <span>Rp. {numberWithCommas(data.product.harga)}</span>
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

          <form onSubmit={handleSubmit}>
            <div class="flex leading-none p-2 pt-6">
              <div class="w-1/3">Amount</div>
              <div class="w-2/3 flex space-x-6 justify-center">
                <div class="increment-input flex space-x-3 bg-gray-100 rounded-full overflow-hidden">
                  <span>
                    <input
                      type="number"
                      id="qty"
                      nama="qty"
                      placeholder={data.jumlah}
                      class="bg-gray-500 w-20 text-white focus:outline-none active:outline-none text-center text-md"
                      onChange={(e) => setQty(e.target.value)}
                      required
                    />
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center pt-10">
              <button
                className="buttonCart bg-black text-white"
                type="submit"
                onClick={handleSubmit}
              >
                Update Cart
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Button Close & Delete */}
      <div style={{ textAlign: "right" }}>
        <button
          onClick={() => deleteOrder(data.id)}
          type="button"
          className="buttonCart bg-red-600 w-32 text-white m-2"
        >
          Delete
        </button>
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

export default EditCart;
