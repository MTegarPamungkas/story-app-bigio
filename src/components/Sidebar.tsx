import React, { useEffect, useRef } from "react";
import { Sidebar as SB, Menu, MenuItem } from "react-pro-sidebar";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const contentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {!isMobile && (
        <SB>
          <Menu>
            <MenuItem icon={<HomeIcon />} component={<NavLink to="/" />}>
              Home
            </MenuItem>
            <MenuItem
              icon={<AddIcon />}
              component={<NavLink to="/add-story" />}
            >
              Add Story
            </MenuItem>
          </Menu>
        </SB>
      )}
      <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto" }} ref={contentRef}>
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
