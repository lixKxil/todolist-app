import Image from 'next/image';
'use client';
import { FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import List from './components/List';
import { message, Button } from 'antd';

export default function Home() {
  const [todo, setTodo] = useState('');
  const [list, setList] = useState<Array<{ id: string; title: string }>>([]);

  function submitData(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!todo) {
      message.error('กรุณาป้อนหัวข้อที่จะเพิ่ม');
    } else {
      const newItem = { id: uuidv4(), title: todo };
      setList([...list, newItem]);
      message.success('บันทึกหัวข้อสำเร็จ');
    }
    setTodo('');
  }

  return (
    <section className='bg-white p-6 mx-auto mt-32 max-w-35rem rounded-lg max-w-screen-md'>
      <h1 className='text-4xl leading-6 text-center text-black'>
        Todolist App
      </h1>
      <form className='mt-4 flex flex-col items-center' onSubmit={submitData}>
        <div className='flex items-center justify-between'>
          <input
            type='text'
            className='border border-gray-300 rounded-md p-2 w-80 text-black' 
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
          />
          <button type="submit" className='px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer mr-2'>
            เพิ่มข้อมูล
          </button>
        </div>
      </form>
      <section className='items-center'>
        {list.map((data, index) => {
          return <List key={index} {...data} />;
        })}
      </section>
    </section>
  );
}

{/* <Button type="primary"  htmlType='submit'>
            เพิ่มข้อมูล
          </Button> */}
