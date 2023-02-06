import {
  Box,
  Fade,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { numberWithCommas } from "../../../utils/comma";
import { API_URL } from "../../../utils/constant";
import Navbar from "../../Navbar/Navbar";
import OrderDetail from "./OrderDetail";

// style untuk pop up
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

const Order = () => {
  const [order, setOrder] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();

  //function untuk membuka pop up
  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };
  //function untuk tutup  pop up
  const handleClose = () => setOpen(false);

  const fetchOrder = async () => {
    try {
      let res = await axios.get(API_URL + "pesanans");
      setOrder(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="screen bg-gray-200 ">
        <h4>
          <strong>Order List</strong>
        </h4>
        <hr />
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <nav aria-label="secondary mailbox folders">
            <List sx={{ width: "100%" }}>
              {order.map((data, i) => {
                return (
                  <ListItem alignItems="flex-start">
                    <ListItemButton key={i} onClick={() => handleOpen(data)}>
                      <ListItemText
                        primary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              <div className="flex flex-wrap mb-2">
                                <div className="left-side w-1/2 text-lg font-bold">
                                  {data.id}
                                </div>
                                <div className="right-side w-1/2 text-right font-bold mt-1">
                                  Rp.{numberWithCommas(data.total_bayar)}
                                </div>
                              </div>
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItemButton>

                    {/* Modal Pop Up */}
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
                              <b className="text-xl">Order Detail</b>
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
                            {/* Isi Pop Up */}
                            <OrderDetail data={id} handleClose={handleClose} />
                          </Typography>
                        </Box>
                      </Fade>
                    </Modal>
                  </ListItem>
                );
              })}
            </List>
          </nav>
        </Box>
      </div>
    </div>
  );
};

export default Order;
