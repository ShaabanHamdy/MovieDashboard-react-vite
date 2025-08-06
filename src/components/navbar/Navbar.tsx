import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContainerContext } from "../context/MoviesContext";

const Navbar = () => {
  const { userdata, logout,isDrawerOpen ,setIsDrawerOpen } = useContext(ContainerContext);
  
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <nav className="bg-blue-500 text-white px-6 py-4 flex items-center justify-between shadow-md">
      {/* Left Logo and Title */}
      <Link to="/" className="flex items-center space-x-2">
        <span className="text-3xl">🎬</span>
        <div>
          <h1 className="text-xl font-bold leading-tight">MovieHub</h1>
          <p className="text-xs text-gray-300 -mt-1">Your Movie & TV Manager</p>
        </div>
      </Link>

      {/* Desktop Nav Buttons */}
      <div className="hidden md:flex items-center gap-4">
        {userdata ? (
          <Button
            onClick={handleLogout}
            variant="outlined"
            size="small"
            color="inherit"
            className="hover:bg-white hover:text-black transition"
          >
            Logout
          </Button>
        ) : (
          <Link to="/login">
            <Button
              variant="contained"
              size="small"
              color="info"
              className="bg-blue-600 hover:bg-blue-700 transition"
            >
              Login
            </Button>
          </Link>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <IconButton onClick={toggleDrawer(true)} className="text-white">
          <MenuIcon />
        </IconButton>

        {/* Drawer */}
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
        >
          <div className="w-64 p-4 bg-white h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-black">Menu</h2>
              <IconButton onClick={toggleDrawer(false)}>
                <CloseIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
              {userdata ? (
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      handleLogout();
                      setIsDrawerOpen(false);
                    }}
                  >
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              ) : (
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate("/login");
                      setIsDrawerOpen(false);
                    }}
                  >
                    <ListItemText primary="Login" />
                  </ListItemButton>
                </ListItem>
              )}
            </List>
          </div>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
