import React, { useEffect, useState } from "react";
import { numberWithCommas } from "../../../utils/comma";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

const OrderDetail = ({ data, handleClose, ...props }) => {
  console.log(data);
  return (
    // Card Box
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "36ch" },
      }}
      component={"div"}
    >
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <nav aria-label="secondary mailbox folders">
          <List sx={{ width: "100%" }}>
            {data.menus.map((item, i) => {
              return (
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src={item.product.gambar} />
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
                              {item.product.nama}
                            </div>
                            <div className="right-side w-1/2 text-right font-bold mt-1">
                              Rp.{numberWithCommas(item.total_harga)}
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
                          {numberWithCommas(item.product.harga)}
                        </Typography>
                        <div>Quantity : {item.jumlah}</div>
                        <hr />
                      </React.Fragment>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </nav>
        <div className="fixed-bottom text-right font-bold pt-4 pb-8">
          <h4>Total Price : Rp. {numberWithCommas(data.total_bayar)}</h4>
        </div>
      </Box>
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

export default OrderDetail;
