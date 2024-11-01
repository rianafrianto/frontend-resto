import React, { useContext, useState } from 'react';
import RestaurantCard from './RestaurantCard';
import { RestaurantContext } from '../context/RestaurantContext';
import { Empty, Spin, Pagination } from 'antd';

const RestaurantCardList = () => {
    const { restaurants, loading } = useContext(RestaurantContext);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = restaurants.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spin size="large" />
            </div>
        );
    }

    if (restaurants.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <Empty description="No restaurants found" />
            </div>
        );
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-5">List Restaurant</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentItems.map((resto) => (
                    <RestaurantCard key={resto.id} name={resto.name} operating_hours={resto.operating_hours} />
                ))}
            </div>
            <Pagination
                current={currentPage}
                pageSize={itemsPerPage}
                total={restaurants.length}
                onChange={handlePageChange}
                className="mt-4"
            />
        </>
    );
};

export default RestaurantCardList;
