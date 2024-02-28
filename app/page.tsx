'use client';
import { FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ListData from './components/List';
import { message, Modal } from 'antd';

export default function Home() {
  const [todo, setTodo] = useState('');
  const [list, setList] = useState<
    { id: string; title: string; time: string }[]
  >([]);
  const [checkEditItem, setEditItem] = useState(false);
  const [editId, setEditId] = useState('');

  const submitData = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!todo) {
      message.error('กรุณาป้อนข้อมูลที่จะเพิ่ม');
    } else {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()}/${
        currentDate.getMonth() + 1
      }/${currentDate.getFullYear()}, ${currentDate.toLocaleTimeString()}`;
      const newItem = {
        id: uuidv4(),
        title: todo,
        time: formattedDate,
      };
      setList([...list, newItem]);
      message.success('บันทึกข้อมูลสำเร็จ');
    }
    setTodo('');
  };

  const removeItem = (id: string) => {
    setList(list.filter((item) => item.id !== id));
    message.error('ลบข้อมูลสำเร็จ');
  };

  const editItem = (id: string) => {
    setEditItem(true);
    setEditId(id);
    const resultEditItem = list.find((item) => item.id === id);
    if (resultEditItem) {
      setTodo(resultEditItem.title);
    }
  };

  const updeta = () => {
    if (checkEditItem && todo) {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()}/${
        currentDate.getMonth() + 1
      }/${currentDate.getFullYear()}, ${currentDate.toLocaleTimeString()}`;
      const result = list.map((item) =>
        item.id === editId
          ? { ...item, title: todo, time: formattedDate }
          : item
      );
      setList(result);
      setEditItem(false);
      setTodo('');
      message.success('แก้ไขข้อมูลสำเร็จ');
    } else {
      setEditItem(false);
      setTodo('');
      message.error('แก้ไขข้อมูลไม่สำเร็จ');
    }
  };

  const handleCancel = () => {
    setEditItem(false);
    setTodo('');
  };

  return (
    <>
      <Modal open={checkEditItem} footer={null} onCancel={handleCancel}>
        <p className='text-3xl font-bold'>แก้ไขข้อมูล</p>
        <div className='mt-2 flex justify-center'>
          <input
            type='text'
            className='border border-gray-300 rounded-md p-2 w-80 text-black'
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            maxLength={35}
          />
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer mr-2 whitespace-nowrap'
            onClick={updeta}
          >
            แก้ไข
          </button>
        </div>
      </Modal>
      <section className='bg-white p-6 mx-auto mt-32 max-w-35rem rounded-lg max-w-screen-md'>
        <h1 className='text-4xl leading-6 text-center text-black font-semibold whitespace-nowrap'>
          Todolist App
        </h1>
        <form className='mt-4 flex flex-col items-center' onSubmit={submitData}>
          <div className='flex items-center justify-between'>
            <input
              type='text'
              className='border border-gray-300 rounded-md p-2 sm:w-80 md:w-96 lg:w-120 text-black'
              onChange={(e) => setTodo(e.target.value)}
              value={todo}
              maxLength={35}
            />
            <button
              type='submit'
              className='px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer mr-2 whitespace-nowrap'
            >
              เพิ่มข้อมูล
            </button>
          </div>
        </form>
        <section>
          {list.map((data, index) => (
            <ListData
              key={index}
              {...data}
              removeItem={removeItem}
              editItem={editItem}
            />
          ))}
        </section>
      </section>
    </>
  );
}
