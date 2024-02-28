import React from 'react';
import { message, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

interface ListItem {
  id: string;
  title: string;
  time: string;
  removeItem: (id: string) => void;
  editItem: (id: string) => void;
}

const List: React.FC<ListItem> = ({
  id,
  title,
  time,
  removeItem,
  editItem,
}) => {
  return (
    <div className='flex items-center justify-between mt-2 p-2 bg-gray-100 shadow-md rounded-md text-lg'>
      <p className='text-black'>{title}</p>
      <div className='flex ml-auto'>
        <p className='text-black mt-2 mr-2'>{time}</p>
        <button
          className='px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer mr-2'
          onClick={() => editItem(id)}
        >
          <EditOutlined />
        </button>
        <button
          className='px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer mr-2'
          onClick={() => removeItem(id)}
        >
          <DeleteOutlined />
        </button>
      </div>
    </div>
  );
};

export default List;
