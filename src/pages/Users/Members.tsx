import React from "react";
import MemberTable from "../../components/Users/MemberTable";

const Users: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <MemberTable />
    </div>
  );
};

export default Users;