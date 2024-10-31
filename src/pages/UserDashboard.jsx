import { Divider } from "antd";
import FormGlobal from "../components/FormGlobal";
import RestaurantCardList from "../components/RestaurantCardList";

const UserDashboard = () => {
    return (
        <>
            <h1 className="text-2xl font-bold mb-5">Filter</h1>
            <FormGlobal isFilter={true} />
            <Divider/>
            <RestaurantCardList />
        </>
    );
};

export default UserDashboard;
