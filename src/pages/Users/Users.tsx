import React from "react";
import UserTable from "../../components/Users/UserTable";

const Users: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <UserTable />
    </div>
  );
};

export default Users;