import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../utils/constant";
import Navbar from "../Navbar/Navbar";
import ListCategory from "./Category/ListCategory";
import Result from "./Category/Result";
import ProductDetail from "./Product/ProductDetail";
import { Box, Fade, Modal, Toolbar, Typography } from "@mui/material";
import pangsit from "../../assets/images/cemilan/pangsit.jpg";
import eye from "../../assets/images/eye.svg";
import love from "../../assets/images/love.svg";
import Login from "../Auth/Login";
import { Link } from "react-router-dom";

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

const Home = () => {
  const [item, setItem] = useState([]);
  const [category, setCategory] = useState("Makanan");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState();
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
      let res = await axios.get(API_URL + "products?category.nama=" + category);
      console.log(res.data);
      setItem(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //function untuk menjalankan functuin dari fetchItem
  useEffect(() => {
    fetchItem();
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const changeCategory = async (value) => {
    setCategory(value);
    try {
      let res = await axios.get(API_URL + "products?category.nama=" + value);
      console.log(res.data);
      setItem(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className="flex mt-20 text-xl p-6">
        <div className="flex-auto w-12 ...">
          <ListCategory changeCategory={changeCategory} category={category} />
        </div>
        <div className="flex-auto w-2/4">
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
                        <span className="text-xl font-bold">
                          Rp. {data.harga}
                        </span>
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

                        {user ? (
                          <>
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
                                    <Typography
                                      component="div"
                                      sx={{ flexGrow: 2 }}
                                    >
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
                                    <ProductDetail
                                      data={id}
                                      handleClose={handleClose}
                                    />
                                  </Typography>
                                </Box>
                              </Fade>
                            </Modal>
                          </>
                        ) : (
                          <>
                            <Link to="/login" className="button-icon">
                              <img
                                src={eye}
                                alt="header-splash"
                                width={25}
                                height={25}
                                priority
                                className="opacity-50"
                              />
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex-auto w-12">
          <Result />
        </div>
      </div>
    </div>
  );
};

export default Home;
