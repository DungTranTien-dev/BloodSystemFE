import React, { useState } from "react";
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
  HeartFilled,
  PlusOutlined,
  BankOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon) {
  return {
    key,
    icon,
    label: <Link to={`/DashboardS/${key}`}>{label}</Link>,
  };
}

const items = [
  getItem("Tổng quan", "overview", <PieChartOutlined />),
  getItem("Yêu cầu hiến máu", "donor-blood", <DesktopOutlined />),
  getItem("Yêu cầu cần máu", "blood-request", <ExperimentOutlined />),
  getItem("Người dùng", "user", <UserOutlined />),
  getItem("Tạo bệnh viện", "create-hospital", <BankOutlined />),
  getItem("Tạo user", "create-user", <PlusOutlined />),
  //   getItem("Tom", "3"),
  //   getItem("Bill", "4"),
  //   getItem("Alex", "5"),
  // ]),
  // getItem("Team", "sub2", <TeamOutlined />, [
  //   getItem("Team 1", "6"),
  //   getItem("Team 2", "8"),
  // ]),
  // getItem("Files", "9", <FileOutlined />),
];

const DashboardS = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("overview");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={220}
        style={{
          background: "linear-gradient(to right, #ef4444, #db2777)", // red-500 to pink-600
        }}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 22,
            letterSpacing: 1,
            borderBottom: "1px solid #fff2",
            marginBottom: 8,
          }}
        >
          <HeartFilled style={{ color: "#fff", fontSize: 28, marginRight: 8 }} />
          {!collapsed && "Hiến máu"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["overview"]}
          selectedKeys={[selectedKey]}
          items={items}
          onClick={handleMenuClick}
          style={{
            background: "transparent",
            fontSize: 16,
            fontWeight: 500,
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#fff",
            borderBottom: "1px solid #f3f4f6",
            minHeight: 56,
            display: "flex",
            alignItems: "center",
            fontWeight: 600,
            fontSize: 20,
            color: "#b91c1c",
            boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
          }}
        >
          <span style={{ marginLeft: 24 }}>Hệ thống quản lý hiến máu</span>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: "calc(100vh - 120px)",
              background: "#f9fafb",
              borderRadius: borderRadiusLG,
              marginTop: 16,
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            }}
          >
            {selectedKey === "overview" && (
              <div style={{ marginBottom: 24 }}>
                <h1 style={{ fontSize: 28, fontWeight: "bold", color: "#1f2937", marginBottom: 16 }}>
                  Xin chào Nhân viên Y tế 👩‍⚕️👨‍⚕️
                </h1>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: 20,
                    marginBottom: 24,
                  }}
                >
                  <div
                    style={{
                      background: "white",
                      padding: 20,
                      borderRadius: 12,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      borderLeft: "4px solid #ef4444",
                    }}
                  >
                    <h3 style={{ fontSize: 18, fontWeight: "bold", color: "#ef4444", marginBottom: 8 }}>
                      Yêu cầu cần xử lý
                    </h3>
                    <p style={{ color: "#6b7280", lineHeight: 1.6 }}>
                      Kiểm tra và xác nhận các yêu cầu hiến máu, yêu cầu cần máu đang chờ xử lý.
                    </p>
                  </div>
                  <div
                    style={{
                      background: "white",
                      padding: 20,
                      borderRadius: 12,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      borderLeft: "4px solid #f59e0b",
                    }}
                  >
                    <h3 style={{ fontSize: 18, fontWeight: "bold", color: "#f59e0b", marginBottom: 8 }}>
                      Quản lý lịch hẹn
                    </h3>
                    <p style={{ color: "#6b7280", lineHeight: 1.6 }}>
                      Theo dõi lịch hẹn hiến máu, sự kiện và sắp xếp thời gian tiếp nhận người hiến máu.
                    </p>
                  </div>
                  <div
                    style={{
                      background: "white",
                      padding: 20,
                      borderRadius: 12,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      borderLeft: "4px solid #10b981",
                    }}
                  >
                    <h3 style={{ fontSize: 18, fontWeight: "bold", color: "#10b981", marginBottom: 8 }}>
                      Thống kê hoạt động
                    </h3>
                    <p style={{ color: "#6b7280", lineHeight: 1.6 }}>
                      Xem số lượng đơn đăng ký, số máu đã tiếp nhận và nhu cầu từng nhóm máu theo thời gian thực.
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    background: "#fef2f2",
                    color: "#991b1b",
                    padding: 24,
                    borderRadius: 12,
                    border: "1px solid #fecaca",
                  }}
                >
                  <h2 style={{ fontSize: 22, fontWeight: "bold", marginBottom: 12 }}>
                    Hướng dẫn nhanh cho nhân viên mới
                  </h2>
                  <ul style={{ paddingLeft: 20, lineHeight: 1.8, color: "#991b1b" }}>
                    <li>✔ Kiểm tra các yêu cầu mới trong mục "Yêu cầu hiến máu".</li>
                    <li>✔ Xác nhận thông tin người hiến máu và lên lịch tiếp nhận.</li>
                    <li>✔ Theo dõi tình hình nhóm máu trong kho để ưu tiên xử lý.</li>
                    <li>✔ Gửi thông báo đến người dùng nếu cần kêu gọi gấp.</li>
                  </ul>
                </div>
              </div>
            )}

            <Outlet />
            {/* đây la body */}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            background: "#fff",
            color: "#b91c1c",
            fontWeight: 500,
            borderTop: "1px solid #f3f4f6",
            letterSpacing: 1,
          }}
        >
          Hiến máu cứu người ©{new Date().getFullYear()} | Kết nối sự sống
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardS;
