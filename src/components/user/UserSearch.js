import { Input } from "antd";

export default function UserSearch({ onSearch }) {
  return (
    <Input.Search
      placeholder="Search by name"
      allowClear
      onSearch={onSearch}
      style={{ width: 300 }}
    />
  );
}
