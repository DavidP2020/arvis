import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
const Cart = ({ ...props }) => {
  const { cart } = props;
  console.log(cart);
  return (
    <div>
      <h4>
        <strong>Cart</strong>
      </h4>
      <hr />
      {cart.length !== 0 && (
        <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          <nav aria-label="secondary mailbox folders">
            <List sx={{ width: "100%" }}>
              {cart.map((data, i) => {
                return (
                  <ListItem alignItems="flex-start" key={i}>
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
                                Rp.{data.total_harga}
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
                            Price: Rp.{data.product.harga}
                          </Typography>
                          <div>Quantity : {data.jumlah}</div>
                          <hr />
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          </nav>
        </Box>
      )}
    </div>
  );
};

export default Cart;
