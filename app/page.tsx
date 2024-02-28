'use client';
import { FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import List from './components/List';
import { message, Modal } from 'antd';

export default function Home() {
  const [todo, setTodo] = useState('');
  const [list, setList] = useState<{ id: string; title: string; time: string }[]>([]);
  const [checkEditItem, setEditItem] = useState(false);
  const [editId, setEditId] = useState('');

  const submitData = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!todo) {
      message.error('กรุณาป้อนข้อมูลที่จะเพิ่ม');
    } else {
      const newItem = { id: uuidv4(), title: todo, time: new Date().toLocaleString() };
      setList([...list, newItem]);
      message.success('บันทึกข้อมูลสำเร็จ');
    }
    setTodo('');
  };

  const removeItem = (id: string) => {
    setList(list.filter(item => item.id !== id));
    message.error('ลบข้อมูลสำเร็จ');
  };

  const editItem = (id: string) => {
    setEditItem(true);
    setEditId(id);
    const resultEditItem = list.find(item => item.id === id);
    if (resultEditItem) {
      setTodo(resultEditItem.title);
    }
  };

  const updeta = () => {
    if (checkEditItem && todo) {
      const result = list.map(item => (item.id === editId ? { ...item, title: todo, time: new Date().toLocaleString() } : item));
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
        <div className='mt-2'>
          <input
            type='text'
            className='border border-gray-300 rounded-md p-2 w-80 text-black'
            onChange={e => setTodo(e.target.value)}
            value={todo}
            maxLength={30}
          />
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer mr-2'
            onClick={updeta}
          >
            แก้ไข
          </button>
        </div>
      </Modal>
      <section className='bg-white p-6 mx-auto mt-32 max-w-35rem rounded-lg max-w-screen-md'>
        <h1 className='text-4xl leading-6 text-center text-black not-italic'>
          Todolist App
        </h1>
        <form className='mt-4 flex flex-col items-center' onSubmit={submitData}>
          <div className='flex items-center justify-between'>
            <input
              type='text'
              className='border border-gray-300 rounded-md p-2 w-80 text-black'
              onChange={e => setTodo(e.target.value)}
              value={todo}
              maxLength={30}
            />
            <button
              type='submit'
              className='px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer mr-2'
            >
              เพิ่มข้อมูล
            </button>
          </div>
        </form>
        <section>
          {list.map((data, index) => (
            <List key={index} {...data} removeItem={removeItem} editItem={editItem} />
          ))}
        </section>
      </section>
    </>
  );
}