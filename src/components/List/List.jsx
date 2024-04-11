import React, { useState } from 'react';
import './lis.css';
import instance from '../../instance';
import Task from './Task';
import { useDrop } from 'react-dnd';


const List = ({loader, listName, setData, data }) => {



  const [addTask, setAddTask] = useState(false);
  const [taskName, setTask] = useState('');
  const [taskData, setTaskData] = useState(data.tasks);

  const id = data._id;



  const createTask = async () => {
    // e.preventDefault();
    loader(true)
    try {

      if (!taskName) return;
      const res = await instance.post(`/api/v1/list/task/${id}`, {
        taskName
      });

      setTaskData(res.data.list)
    } catch (error) {
      console.error(error);
    } finally {
      setTask('')
      setAddTask(false)
      loader(false)
    }
  }

  const deleteList = async (e) => {
    e.preventDefault();
    loader(true)
    try {
      const res = await instance.delete(`/api/v1/list/${id}`);
      setData(res.data.lists)
    } catch (error) {
      console.error(error);
    }finally{
      loader(false)
    }
  }

  const set = (data) => {
    setTaskData(data);
  }

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      createTask()
    }
  }



  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',

    drop: async (item) => {
      const res = await instance.post(`/api/v1/list/task/${id}`, {
        taskName: item.Text
      });
      setTaskData(res.data.list);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });


  return (
    <div ref={drop} key={data._id} className='bg-white shadow-xl border rounded  min-h-[300px] h-fit w-fit'>
      <div className='relative bg-[#581845] p-2 px-8 min-w-[200px]  text-center text-white font-bold'>
         {listName?listName: "LIST"}
        <i onClick={deleteList} className='absolute right-2 top-4 text-red-400 fa-solid fa-trash-alt  active:text-red-400 ml-3 cursor-pointer text-[15px]'
        ></i>
      </div>
      <div className='p-1'>

        <p className='p-1 rounded border'>
          <label htmlFor="newTask" onClick={() => setAddTask(!addTask)}>
            <i className="text-[10px] fa-solid fa-plus active:text-gray-500 bg-gray-100 hover:bg-gray-200 p-3 rounded-full"></i> Add Task
          </label>
        </p>

        <div className='min-h-[200px] flex flex-col gap-y-1'>
          {addTask ? (
            <p className='bg-white px-2 rounded border border-orange-200 cursor'>
              <input id='newTask' onKeyDown={handleKeyDown} value={taskName} onChange={(e) => setTask(e.target.value)} type="text" className='outline-none p-1' placeholder='Add Task here' />
              <button onClick={createTask} className='p-1 active:text-green-600'>+</button>
            </p>
          ) : (
            ""
          )}



          {
            taskData.map((item) => (
              <Task loader={loader} key={item._id} set={set} item={item} id={id} />
            )
            )
          }

        </div>
      </div>
    </div>
  );
};

export default List;
