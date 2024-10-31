import { Divider } from "antd";
import FormGlobal from "../components/FormGlobal";
import RestaurantCardList from "../components/RestaurantCardList";

const AdminDashboard = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Add New Restaurant</h1>
      <FormGlobal />
      <Divider />
      <RestaurantCardList />

    </>
  );
};

export default AdminDashboard;
