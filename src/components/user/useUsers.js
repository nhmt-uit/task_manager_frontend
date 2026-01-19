import { useEffect, useState } from "react";
import { userService } from "services/user.service";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await userService.getUsers({ search: keyword });
      setUsers(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [keyword]);

  return {
    users,
    loading,
    setKeyword,
    refetch: fetchUsers,
  };
}
