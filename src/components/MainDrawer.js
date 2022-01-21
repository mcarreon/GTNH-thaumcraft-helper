import { Divider, Drawer } from "@mui/material";
import Options from "./Options";

import VersionPicker from './VersionPicker'

const drawerWidth = 360

const MainDrawer = () => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <VersionPicker />
      <Options />
    </Drawer>
  );
};

export default MainDrawer;
