import React from 'react';
import { message, Button } from 'antd';

interface ListItem {
  id: string;
  title: string;
}

const List: React.FC<ListItem> = ({ id, title }) => {
  return (
    <div className='flex items-center justify-between mt-2 p-2 bg-gray-100 shadow-md rounded-md text-lg'>
      <p className='text-black'>{title}</p>
      <div className='flex ml-auto'>
        <button className='px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer mr-2'>
          แก้ไข
        </button>
        <button className='px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer mr-2'>
          ลบ
        </button>
      </div>
    </div>
  );
};

export default List;
