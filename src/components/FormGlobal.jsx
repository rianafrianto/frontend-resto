import React, { useContext, useEffect, useState } from 'react';
import { Form, Input, Button, Select, TimePicker, Row, Col } from 'antd';
import { EditOutlined, SearchOutlined, ClearOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs'; 
import { RestaurantContext } from '../context/RestaurantContext';

const { Option } = Select;

const FormGlobal = ({ isFilter = false }) => {
    const { form, addRestaurant, loading, fetchRestaurants, fetchAllRestaurant } = useContext(RestaurantContext);

    const handleClearAndRefetch = async () => {
        form.resetFields();
        await fetchAllRestaurant()
    };

    const onFinish = async (values) => {
        const operating_hours = values.timeRanges.map((item) => {
            const openingTime = item.time && item.time[0] ? dayjs(item.time[0]) : null;
            const closingTime = item.time && item.time[1] ? dayjs(item.time[1]) : null;
    
            return {
                day: item.day,
                opening_time: openingTime ? openingTime.format("HH:mm:ss") : null,
                closing_time: closingTime ? closingTime.format("HH:mm:ss") : null,
            };
        });
    
        const payload = {
            name: values["name-restaurant"],
            operating_hours,
        };
        
        await addRestaurant(payload);
    };

    const handleFilter = () => {
        const values = form.getFieldsValue();
        const timeRange = values.timeRanges && values.timeRanges[0]?.time ? values.timeRanges[0].time : null;

        const filterPayload = {
            name: values["name-restaurant"] || '',
            day: values.timeRanges && values.timeRanges[0]?.day ? values.timeRanges[0].day : '',
            opening_time: timeRange && timeRange[0] ? dayjs(timeRange[0]).format("HH:mm:ss") : null,
            closing_time: timeRange && timeRange[1] ? dayjs(timeRange[1]).format("HH:mm:ss") : null,
        };

        fetchRestaurants(filterPayload);
    };
    

    useEffect(() => {
        if (isFilter) {
            form.setFieldsValue({
                timeRanges: [{ day: null, time: [] }],
            });
        }
    }, [isFilter, form]);

    return (
        <Form form={form} layout="vertical" onFinish={isFilter ? handleFilter : onFinish}>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item
                        name="name-restaurant"
                        label={"Name Restaurant"}
                        rules={[{ required: isFilter ? false : true, message: 'Please input the Name Restaurant!' }]}
                    >
                        <Input
                            placeholder='Input Name Restaurant'
                            prefix={<EditOutlined />}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Form.List name="timeRanges" initialValue={[{ day: null, time: [] }]}>
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Row gutter={24} key={key} align="middle">
                                <Col span={isFilter ? 12 : 10}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'day']}
                                        label="Select Day"
                                        rules={[{ required: isFilter ? false : true, message: 'Please select a day!' }]}
                                    >
                                        <Select placeholder='Select day'>
                                            <Option value="Monday">Monday</Option>
                                            <Option value="Tuesday">Tuesday</Option>
                                            <Option value="Wednesday">Wednesday</Option>
                                            <Option value="Thursday">Thursday</Option>
                                            <Option value="Friday">Friday</Option>
                                            <Option value="Saturday">Saturday</Option>
                                            <Option value="Sunday">Sunday</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col span={isFilter ? 12 : 10}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'time']}
                                        label="Time Range Operation"
                                        rules={[{ required: isFilter ? false : true, message: 'Please select a time range!' }]}
                                    >
                                        <TimePicker.RangePicker
                                            style={{ width: '100%' }}
                                            format="HH:mm"
                                            minuteStep={15}
                                            placeholder={['Start Time', 'End Time']}
                                        />
                                    </Form.Item>
                                </Col>

                                {!isFilter && (
                                    <>
                                        <Col span={2}>
                                            <Button
                                                type="dashed"
                                                onClick={() => add()}
                                                icon={<PlusOutlined />}
                                                style={{ marginRight: '8px', width: "100%" }}
                                            >
                                                Add
                                            </Button>
                                        </Col>
                                        <Col span={2}>
                                            <Button
                                                type="dashed"
                                                onClick={() => remove(name)}
                                                icon={<MinusOutlined />}
                                                disabled={fields.length === 1}
                                                style={{ marginRight: '8px', width: "100%" }}
                                            >
                                                Delete
                                            </Button>
                                        </Col>
                                    </>
                                )}
                            </Row>
                        ))}
                    </>
                )}
            </Form.List>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    icon={isFilter ? <SearchOutlined /> : <EditOutlined />}
                    loading={loading}
                >
                    {isFilter ? 'Filter' : 'Save'}
                </Button>
                {isFilter && (
                    <Button
                        type="primary"
                        style={{ marginLeft: '8px' }}
                        onClick={handleClearAndRefetch}
                        icon={<ClearOutlined />}
                    >
                        Clear
                    </Button>
                )}
            </Form.Item>
        </Form>
    );
};

export default FormGlobal;
