import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

export const sidebarData = [
  {
    id: 0,
    icon: <HomeIcon />,
    text: "Home",
    link: "/",
  },
  {
    id: 1,
    icon: <AdminPanelSettingsIcon />,
    text: "Admin Panel",
    link: "/admin",
  },
  {
    id: 2,
    icon: <TravelExploreIcon />,
    text: "Sorgu",
    link: "sorgu",
  },
];
