import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const sidebarData = [
  {
    id: 0,
    icon: <AccountCircleIcon />,
    text: "Profil",
    link: "/profile",
  },
  {
    id: 1,
    icon: <AdminPanelSettingsIcon />,
    text: "Admin",
    link: "/admin",
  },
  {
    id: 2,
    icon: <TravelExploreIcon />,
    text: "Sorgu",
    link: "sorgu",
  },
  {
    id: 3,
    icon: <HomeIcon />,
    text: "Home",
    link: "/",
  },
];
