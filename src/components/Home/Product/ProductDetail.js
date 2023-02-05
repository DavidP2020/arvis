import React, { useEffect, useState } from "react";
import { API_URL } from "../../../utils/constant";
import axios from "axios";
import { Box, Button } from "@mui/material";
import pangsit from "../../../assets/images/cemilan/pangsit.jpg";

const ProductDetail = ({ data, handleClose, ...props }) => {
  const [itemList, setItemList] = useState([]);
  const fetchItem = async () => {
    try {
      let res = await axios.get(API_URL + "products?id=" + data);
      setItemList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  return (
    // Card Box
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "36ch" },
      }}
      component={"div"}
    >
      {itemList.map((item, i) => {
        return (
          <div className="flex flex-wrap mb-10 ">
            {/* Left Side */}
            <div className="left-side w-1/2  bg-gradient bg-gradient-to-bl from-blue-800 to-blue-500">
              <img
                src={pangsit}
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
              <div className="text-4xl text-center mb-4">{item.nama}</div>

              {/* Kode & Category */}
              <div className="flex items-center gap-2 p-2">
                <span className="badge text-sm">{item.kode}</span>
                <span className="badge text-sm">{item.category.nama}</span>
              </div>

              {/* Price List */}
              <div className="text-lg text-gray-700 leading-6 p-2">
                <span>Rp. {item.harga}</span>
              </div>

              {/* Description */}
              <div className="pt-3 ">
                <span className="text-sm text-gray-700 leading-6 p-2 font-bold">
                  Description
                </span>
                <p className="text-sm text-gray-700 pl-2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s,
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
                        id="jumlah"
                        class="bg-gray-500 w-20 text-white focus:outline-none active:outline-none text-center text-md"
                      />
                    </span>
                  </div>
                </div>
              </div>

              {/* Add to Card */}
              <div className="text-center pt-10">
                <button className="buttonCart" type="button">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Button Close */}
      <div style={{ textAlign: "right" }}>
        <Button
          style={{
            margin: "5px",
            color: "black",
            border: "1px solid",
            borderRadius: "5px",
          }}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </div>
    </Box>
  );
};

export default ProductDetail;
