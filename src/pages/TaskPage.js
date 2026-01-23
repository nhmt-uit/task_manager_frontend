import { Card, Typography, Row, Col } from "antd";
import { CheckSquareOutlined } from "@ant-design/icons";
import TaskForm from "components/task/TaskForm";
import TaskList from "components/task/TaskList";
import { useState } from "react";

const { Title } = Typography;

const TaskPage = () => {
  const [reload, setReload] = useState(false);

  return (
      // <div style={{ marginBottom: "24px", textAlign: "center" }}>
      //   <Title level={2} style={{ margin: 0, color: "#1890ff" }}>
      //     <CheckSquareOutlined style={{ marginRight: "12px" }} />
      //     Task Management
      //   </Title>
      //   <Typography.Text type="secondary">
      //     Organize and track your tasks efficiently
      //   </Typography.Text>
      // </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={24}>
          <Card
            title={
              <span style={{ fontSize: "16px", fontWeight: "600" }}>
                Create New Task
              </span>
            }
            style={{
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
          >
            <TaskForm onSuccess={() => setReload(!reload)} />
          </Card>
        </Col>

        <Col xs={24} lg={24}>
          <Card
            title={
              <span style={{ fontSize: "16px", fontWeight: "600" }}>
                Task List
              </span>
            }
            style={{
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
          >
            <TaskList reload={reload} />
          </Card>
        </Col>
      </Row>
  );
};

export default TaskPage;
