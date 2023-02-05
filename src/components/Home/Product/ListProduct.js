import React, { useEffect, useState } from "react";
import eye from "../../../assets/images/eye.svg";
import love from "../../../assets/images/love.svg";
import { API_URL } from "../../../utils/constant";
import axios from "axios";
import { Box, Fade, Modal, Toolbar, Typography } from "@mui/material";
import ProductDetail from "./ProductDetail";
import pangsit from "../../../assets/images/cemilan/pangsit.jpg";
import cheese from "../../../assets/images/cemilan/cheese-burger.jpg";
import kentang from "../../../assets/images/cemilan/kentang-goreng.jpg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ListProduct = () => {
  const [item, setItem] = useState([]);
  const [open, setOpen] = useState(false);

  const [id, setId] = useState();

  //function untuk membuka pop up
  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };
  //function untuk tutup  pop up
  const handleClose = () => setOpen(false);

  //function untuk mengambil data product
  const fetchItem = async () => {
    try {
      let res = await axios.get(API_URL + "products");
      console.log(res.data);
      setItem(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //function untuk menjalankan functuin dari fetchItem
  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <div>
      <h4>
        <strong>List Product</strong>
      </h4>
      <hr />

      {/* Tampilan Card */}
      <div
        className="flex flex-row flex-wrap h-screen justify-center justify-items-center items-center gap-10 border bg-gray-100"
        style={{ paddingTop: "20px" }}
      >
        {/* Mapping Data Product yang didapatkan dari fetchItem */}
        {item.map((data, i) => {
          return (
            <div className="card" key={i}>
              <img
                src={pangsit}
                alt="pangsit"
                width={100}
                height={100}
                priority
                className="w-full h-full object-cover"
              />
              <div className="p-5 flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="badge">{data.kode}</span>
                  <span className="badge">{data.category.nama}</span>
                </div>

                <h2 className="product-title">{data.nama}</h2>

                <div>
                  <span className="text-xl font-bold">Rp. {data.harga}</span>
                </div>

                <div className="mt-5 flex gap-2">
                  <button className="button-primary">Add to Cart</button>

                  <button className="button-icon">
                    <img
                      src={love}
                      alt="header-splash"
                      width={25}
                      height={25}
                      priority
                      className="opacity-50"
                    />
                  </button>

                  <button
                    className="button-icon"
                    onClick={() => handleOpen(data.id)}
                  >
                    <img
                      src={eye}
                      alt="header-splash"
                      width={25}
                      height={25}
                      priority
                      className="opacity-50"
                    />
                  </button>

                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={open}>
                      <Box sx={style} style={{ background: "white" }}>
                        <Toolbar style={{ marginLeft: "-1rem" }}>
                          <Typography component="div" sx={{ flexGrow: 2 }}>
                            <b className="text-xl">Product Detail</b>
                          </Typography>
                          <i
                            className="icon fa fa-times"
                            aria-hidden="true"
                            onClick={handleClose}
                          ></i>
                        </Toolbar>
                        <Typography
                          id="transition-modal-description"
                          sx={{ mt: 2 }}
                        >
                          <ProductDetail data={id} handleClose={handleClose} />
                        </Typography>
                      </Box>
                    </Fade>
                  </Modal>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
