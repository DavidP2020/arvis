import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../../utils/constant";

const ListCategory = ({ ...props }) => {
  const [item, setItem] = useState([]);
  const { changeCategory, chooseCategory } = props;
  const fetchItem = async () => {
    try {
      let res = await axios.get(API_URL + "categories");
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
        <strong>List Category</strong>
      </h4>
      <hr />
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <nav aria-label="secondary mailbox folders">
          <List>
            {item.map((data, i) => {
              return (
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText
                      primary={data.nama}
                      onClick={() => changeCategory(data.nama)}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </nav>
      </Box>
    </div>
  );
};

export default ListCategory;
