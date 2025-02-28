import { GridColDef } from "@mui/x-data-grid";

interface UserRow {
  id: string;
  img: string;
  username: string;
  email: string;
  address: string;
  role: string; // Changed from status to role
}

interface RenderCellParams {
  row: UserRow;
}

export const userColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params: RenderCellParams) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "role",
    headerName: "Role",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithRole ${params.row.role}`}>
          {params.row.role}
        </div>
      );
    },
  },
];
