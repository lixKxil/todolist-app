import React, { useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, List, Modal } from 'antd';

interface ListItem {
  id: string;
  title: string;
  time: string;
  removeItem: (id: string) => void;
  editItem: (id: string) => void;
}

const ListData: React.FC<ListItem> = ({
  id,
  title,
  time,
  removeItem,
  editItem,
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    if (windowWidth <= 450) setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <section>
      <List
        className='bg-zinc-100 mt-2 rounded-md'
        itemLayout='horizontal'
        dataSource={[{ id, title, time }]}
        renderItem={(item) => (
          <List.Item
            onClick={showModal}
            actions={
              windowWidth >= 450
                ? [
                    <button
                      className='px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer mr-2'
                      onClick={() => editItem(id)}
                    >
                      <EditOutlined />
                    </button>,
                    <button
                      className='px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer mr-2'
                      onClick={() => removeItem(id)}
                    >
                      <DeleteOutlined />
                    </button>,
                  ]
                : []
            }
          >
            <List.Item.Meta
              className='ml-4 text-base'
              title={item.title}
              description={item.time}
            />
          </List.Item>
        )}
      />
      <Modal open={isModalVisible} onCancel={handleCancel} footer={null}>
        <p>
          <strong>Title:</strong> {title}
        </p>
        <p>
          <strong>Time:</strong> {time}
        </p>
        <div className='flex justify-end'>
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
      </Modal>
    </section>
  );
};

export default ListData;
