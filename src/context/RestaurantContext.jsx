import { createContext, useEffect, useState } from "react";
import { Form } from "antd";
import axios from "axios";
import { API_URL } from "../config/api";
import Swal from "sweetalert2";

export const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  const handleClear = () => {
    form.resetFields();
  };


  // Fetch All Resto
  const fetchAllRestaurant = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/restaurant`);
      if (response.data.status) {
        setRestaurants(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch data. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };


  const addRestaurant = async (newRestaurant) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/restaurant`, newRestaurant);
      if (response.data.status) {
        await fetchAllRestaurant();
        handleClear()
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data.message,
        });
      }
    } catch (error) {
      console.error('Error adding restaurant:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add restaurant. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRestaurants = async (filterValues) => {
    try {
        const response = await axios.get(`${API_URL}/restaurant`, { params: filterValues });
        if (response.data.status) {
          setRestaurants(response.data.data);
        }
    } catch (error) {
        console.log('Failed to fetch restaurants. Please try again.', error);
    }
};



  useEffect(() => {
    fetchAllRestaurant();
  }, []);

  return (
    <RestaurantContext.Provider value={{ restaurants, fetchAllRestaurant, addRestaurant, form, loading, handleClear, fetchRestaurants }}>
      {children}
    </RestaurantContext.Provider>
  );
};
