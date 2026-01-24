import { Button, Space } from "antd";
import { useState } from "react";
import UserTable from "components/user/UserTable";
import UserSearch from "components/user/UserSearch";
import UserModal from "components/user/UserModal";
import useUsers from "components/user/useUsers";

export default function UserPage() {
  const { users, loading, setKeyword, refetch } = useUsers();
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleOpen = () => {
    setEditingUser(null);
    setOpen(true);
  };

  const handleClose = () => {
    setEditingUser(null);
    setOpen(false);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setOpen(true);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 16,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flexGrow: 1, minWidth: 240, maxWidth: 350 }}>
          <UserSearch onSearch={setKeyword} />
        </div>
        <Button
          type="primary"
          onClick={handleOpen}
          style={{
            minWidth: 120,
            fontWeight: 500,
            fontSize: 16,
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(24,144,255,0.08)"
          }}
        >
          + Add User
        </Button>
      </div>

      <UserTable 
        data={users} 
        loading={loading} 
        onUserUpdate={refetch}
        onEditUser={handleEditUser}
      />

      <UserModal
        open={open}
        user={editingUser}
        onClose={handleClose}
        onSuccess={refetch}
      />
    </>
  );
}
