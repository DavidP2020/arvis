import {
  Avatar,
  Fade,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Modal,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { numberWithCommas } from "../../../utils/comma";
import EditCart from "./EditCart";
import TotalPrice from "./TotalPrice";

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

const Cart = ({ ...props }) => {
  const [user, setUser] = useState();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();

  //function untuk membuka pop up
  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };
  //function untuk tutup  pop up
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  // Mengambil Data yang diparsing
  const { cart } = props;
  return (
    <div>
      <h4>
        <strong>Cart</strong>
      </h4>
      <hr />
      {cart.length !== 0 && (
        <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          {user ? (
            <>
              <nav aria-label="secondary mailbox folders">
                <List sx={{ width: "100%" }}>
                  {cart.map((data, i) => {
                    return (
                      <ListItem alignItems="flex-start">
                        <ListItemButton
                          key={i}
                          onClick={() => handleOpen(data)}
                        >
                          <ListItemAvatar>
                            <Avatar src={data.product.gambar} />
                          </ListItemAvatar>
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
                                      {data.product.nama}
                                    </div>
                                    <div className="right-side w-1/2 text-right font-bold mt-1">
                                      Rp.{numberWithCommas(data.total_harga)}
                                    </div>
                                  </div>
                                </Typography>
                              </React.Fragment>
                            }
                            secondary={
                              <React.Fragment>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  Price: Rp.
                                  {numberWithCommas(data.product.harga)}
                                </Typography>
                                <div>Quantity : {data.jumlah}</div>
                                <hr />
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
                                <Typography
                                  component="div"
                                  sx={{ flexGrow: 2 }}
                                >
                                  <b className="text-xl">Cart Detail</b>
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
                                <EditCart data={id} handleClose={handleClose} />
                              </Typography>
                            </Box>
                          </Fade>
                        </Modal>
                      </ListItem>
                    );
                  })}
                </List>
              </nav>
              <TotalPrice total={cart} />
            </>
          ) : (
            <div className="mt-4">No Data</div>
          )}
        </Box>
      )}
    </div>
  );
};

export default Cart;
