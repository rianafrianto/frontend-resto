import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Sidebar from "./components/Sidebar";
import { RestaurantProvider } from "./context/RestaurantContext";
import { Layout } from "antd";
import NotFound from "./components/NotFound";

const { Header, Content, Sider } = Layout;

const App = () => {
  return (
    <RestaurantProvider>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider width={200} className="site-layout-background">
            <Sidebar />
          </Sider>

          <Layout>
            <Header className="bg-blue-500 text-white text-center" style={{ padding: 0 }}>
              <h1 className="text-xl font-semibold mt-4">Restaurant Apps</h1>
            </Header>

            <Content style={{ padding: '24px', margin: 0, minHeight: 280 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user" element={<UserDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="*" element={<NotFound/>} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </RestaurantProvider>
  );
}

export default App;
