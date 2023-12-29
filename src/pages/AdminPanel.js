import { useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { StyledEngineProvider } from "@mui/material/styles";
import UserFormDialog from "./user/UserFormDialog";
import useConfirm from "../components/confirm/ConfirmDialog";
import User from "../model/User";
import "./AdminPanel.css";

// const editUser = async () => {
//   const choice = await confirm({
//     title: "Delete all",
//     description: "Are you sure you want to delete everything?",
//     confirmBtnLabel: "Yes",
//   });
//   console.log("Edit User clicked");
// };

const deactivateUser = () => {
  console.log("Deactivate User clicked");
};

const rows = [
  { username: "Snow", active: true, role: "roleAdmin" },
  { username: "Lannister", active: true, role: "roleAdliAdmin" },
  { username: "Jaime", active: false, role: "roleOnleyiciAdmin" },
  { username: "Stark", active: true, role: "roleQueryAdmin" },
  { username: "Targaryen", active: true, role: "roleLeaQueryAdmin" },
  { username: "Melisandre", active: false, role: "roleAdmin" },
  { username: "Clifford", active: false, role: "roleAdmin" },
  { username: "Frances", active: true, role: "roleAdmin" },
  { username: "Roxie", active: false, role: "roleAdmin" },

  { username: "Snow2", active: true, role: "roleAdmin" },
  { username: "2Lannister", active: true, role: "roleAdliAdmin" },
  { username: "2Jaime", active: false, role: "roleOnleyiciAdmin" },
  { username: "2Stark", active: true, role: "roleQueryAdmin" },
  { username: "2Targaryen", active: true, role: "roleLeaQueryAdmin" },
  { username: "2Melisandre", active: false, role: "roleAdmin" },
  { username: "2Clifford", active: false, role: "roleAdmin" },
  { username: "2Frances", active: true, role: "roleAdmin" },
  { username: "2Roxie", active: false, role: "roleAdmin" },

  { username: "3Snow", active: true, role: "roleAdmin" },
  { username: "3Lannister", active: true, role: "roleAdliAdmin" },
  { username: "3Jaime", active: false, role: "roleOnleyiciAdmin" },
  { username: "3Stark", active: true, role: "roleQueryAdmin" },
  { username: "3Targaryen", active: true, role: "roleLeaQueryAdmin" },
  { username: "3Melisandre", active: false, role: "roleAdmin" },
  { username: "3Clifford", active: false, role: "roleAdmin" },
  { username: "3Frances", active: true, role: "roleAdmin" },
  { username: "3Roxie", active: false, role: "roleAdmin" },
];
// https://medium.com/@jaredloson/a-replacement-for-window-confirm-using-promises-and-react-hooks-cfc011e76a7a

const AdminPanel = () => {
  const confirm = useConfirm();
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState(null);

  const editUser = async () => {
    const choice = await confirm({
      title: "Delete all",
      description: "Are you sure you want to delete everything?",
      confirmBtnLabel: "Yes",
    });
    console.log("Edit User clicked");
  };

  const refresh = () => {
    console.log("refresh user list");
  };

  const newUserClick = () => {
    setUser(null);
    setOpenDialog(true);
    console.log("new user click");
  };

  const updateUserClick = () => {
    const user = new User({
      username: "kullanici",
      active: false,
      role: "roleOnleyiciAdmin",
    });
    setUser(user);
    setOpenDialog(true);
    console.log("new user click");
  };

  const columns = [
    { field: "username", headerName: "Kullanıcı Adı", flex: 40 },
    {
      field: "active",
      headerName: "Aktif",
      flex: 10,
      align: "center",
      headerAlign: "center",
      renderCell: (item) => {
        return item.row.active ? (
          <CheckIcon
            style={{
              color: "green",
            }}
          />
        ) : (
          <CloseIcon
            style={{
              color: "darkred",
            }}
          />
        );
      },
    },
    {
      field: "role",
      headerName: "Rol",
      flex: 25,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "edit",
      headerName: "",
      width: 10,
      sortable: false,
      disableColumnMenu: true,
      align: "center",
      renderCell: (params) => {
        return (
          <button
            className="logoutBtn"
            onClick={editUser}
            title="Güncelle"
            style={{
              background: "transparent",
              border: "none",
              color: "#0066b2",
            }}
          >
            <EditNoteIcon />
          </button>
        );
      },
    },
    {
      field: "delete",
      headerName: "",
      width: 10,
      sortable: false,
      disableColumnMenu: true,
      align: "center",
      renderCell: (params) => {
        return (
          <button
            className="logoutBtn"
            onClick={deactivateUser}
            title="Kullanıcı Aktifliğini Kaldır"
            style={{
              background: "transparent",
              border: "none",
              color: "darkred",
            }}
          >
            <NoAccountsIcon />
          </button>
        );
      },
    },
  ];

  return (
    <div className="admin-panel" style={{ overflow: "hidden" }}>
      <div>
        <StyledEngineProvider injectFirst>
          <Button
            onClick={updateUserClick}
            // onClick={refresh}
            variant="contained"
            startIcon={<RefreshIcon />}
            className="sorgu-button"
          >
            Yenile
          </Button>
          <Button
            onClick={newUserClick}
            variant="contained"
            startIcon={<PersonAddIcon />}
            className="sorgu-button"
            style={{ marginLeft: "15px" }}
          >
            Yeni Kullanıcı
          </Button>
        </StyledEngineProvider>
      </div>

      <div
        style={{
          // height: 600,
          width: "60%",
          // overflowY: "scroll",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.username}
          hideFooter={true}
          rowHeight={40}
          autoHeight={false}
          style={{
            border: "2px solid white",
            maxHeight: 600,
          }}
          sx={{
            ".MuiDataGrid-columnSeparator": {
              display: "none",
            },
            "&.MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "var(--background-color-4)",
              color: "white",
              fontSize: 14,
              fontWeight: "bold",
            },

            "& .MuiDataGrid-row": {
              "&:nth-of-type(even)": {
                backgroundColor: "var(--background-color-5)",
                borderBottom: "2px solid white",
              },
              "&:nth-of-type(odd)": {
                backgroundColor: "var(--background-color-6)",
                borderBottom: "2px solid white",
              },
              "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
                outline: "none !important",
              },
              "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus":
                {
                  outline: "none !important",
                },
            },
          }}
        />
      </div>

      {openDialog && (
        <UserFormDialog
          title="Baslik"
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          user={user}
        />
      )}
    </div>
  );
};

export default AdminPanel;
