import {
  UnorderedListOutlined,
  TeamOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

export const MENU_ITEMS = [
  {
    key: "/tasks",
    label: "Tasks",
    icon: <UnorderedListOutlined />,
    roles: ["admin", "member"],
  },
  {
    key: "/users",
    label: "Users",
    icon: <TeamOutlined />,
    roles: ["admin"],
  },
  {
    key: "logout",
    label: "Logout",
    icon: <LogoutOutlined />,
    roles: ["admin", "member"],
  },
];
