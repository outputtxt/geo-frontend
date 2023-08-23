import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HomeIcon from "@mui/icons-material/Home";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import SettingsIcon from "@mui/icons-material/Settings";

export const navData = [
  {
    id: 0,
    icon: <AdminPanelSettingsIcon />,
    text: "Admin Panel",
    link: "/admin",
  },
  {
    id: 1,
    icon: <HomeIcon />,
    text: "Home",
    link: "/",
  },
  {
    id: 2,
    icon: <TravelExploreIcon />,
    text: "Explore",
    link: "explore",
  },
  /* ,
  {
    id: 2,
    icon: <BarChartIcon />,
    text: "Statistics",
    link: "statistics"
  },
  {
    id: 3,
    icon: <SettingsIcon />,
    text: "Settings",
    link: "settings"
  }*/
];
