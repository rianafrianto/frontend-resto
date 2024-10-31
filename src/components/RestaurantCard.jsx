import React from 'react';
import { Card, Empty } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

const RestaurantCard = (props) => {
  const { name, operating_hours } = props;

  return (
    <Card className="m-2" title={name} bordered={true} hoverable>
      {operating_hours.length > 0 ? (
        <div>
          <h3 className="text-md font-semibold">Operating Hours:</h3>
          <ul className="list-disc pl-5">
            {operating_hours.map((hour) => (
              <li key={hour.id} className="flex items-center mb-2">
                <ClockCircleOutlined className="mr-2" />
                <span>
                  <strong>{hour.day}:</strong> {hour.opening_time} - {hour.closing_time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Empty description="No operating hours available." />
      )}
    </Card>
  );
};

export default RestaurantCard;
