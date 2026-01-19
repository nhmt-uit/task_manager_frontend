import { Button, Space } from "antd";
import { useState } from "react";
import UserTable from "components/user/UserTable";
import UserSearch from "components/user/UserSearch";
import UserModal from "components/user/UserModal";
import useUsers from "components/user/useUsers";

export default function UserPage() {
  const { users, loading, setKeyword, refetch } = useUsers();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <UserSearch onSearch={setKeyword} />
        <Button type="primary" onClick={() => setOpen(true)}>
          Add User
        </Button>
      </Space>

      <UserTable data={users} loading={loading} />

      <UserModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={refetch}
      />
    </>
  );
}
