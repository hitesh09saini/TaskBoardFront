import React, { useState } from 'react';
import instance from '../../instance';
import Task from './Task';
import { useDrop } from 'react-dnd';

const List = ({ loader, listName, setData, data }) => {
  const [addTask, setAddTask] = useState(false);
  const [taskName, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [taskData, setTaskData] = useState(data.tasks);
  const id = data._id;

  const createTask = async () => {
    if (!taskName.trim()) return;
    loader(true);
    try {
      const res = await instance.post(`/api/v1/list/task/${id}`, { taskName, description });
      setTaskData(res.data.list.tasks || []);
    } catch (error) {
      console.error(error);
    } finally {
      setTask('');
      setDescription('');
      setAddTask(false);
      loader(false);
    }
  };

  const deleteList = async (e) => {
    e.preventDefault();
    loader(true);
    try {
      const res = await instance.delete(`/api/v1/list/${id}`);
      setData(res.data.lists || []);
    } catch (error) {
      console.error(error);
    } finally {
      loader(false);
    }
  };

  const set = (data) => {
    setTaskData(data);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      createTask();
    }
  };

  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: async (item) => {
      const res = await instance.post(`/api/v1/list/task/${id}`, {
        taskName: item.Text,
      });
      setTaskData(res.data.list.tasks || []);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      key={data._id}
      className={`bg-white shadow-lg border border-gray-300 rounded-lg h-[420px] overflow-hidden flex flex-col transition-shadow duration-300
        ${isOver ? 'shadow-2xl ring-2 ring-purple-500' : ''}
      `}
    >
      {/* Header */}
      <div className="relative bg-purple-700 p-3 text-center text-white font-extrabold tracking-wide select-none rounded-t-lg">
        {listName || 'LIST'}
        <button
          onClick={deleteList}
          aria-label="Delete List"
          className="absolute right-3 top-3 text-red-400 hover:text-red-600 transition-colors duration-200"
          title="Delete List"
        >
          <i className="fa-solid fa-trash-alt text-lg"></i>
        </button>
      </div>

      {/* Add Task Section */}
      <div className="p-3 border-b border-gray-200">
        <button
          onClick={() => setAddTask(!addTask)}
          className="flex items-center gap-2 text-purple-700 font-semibold hover:text-purple-900 focus:outline-none"
        >
          <i className="fa-solid fa-plus-circle text-lg"></i>
          Add Task
        </button>

        {addTask && (
          <div className="mt-3 flex flex-col gap-2">
            <input
              id="newTask"
              type="text"
              placeholder="Enter task name"
              value={taskName}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border border-purple-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
              autoFocus
            />
            <textarea
              className="border border-purple-300 rounded-md px-3 py-2 resize-none focus:ring-2 focus:ring-purple-400 outline-none"
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
            <button
              onClick={createTask}
              className="self-start bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors duration-200"
            >
              Add
            </button>
          </div>
        )}
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
        {taskData.length > 0 ? (
          taskData.map((item) => (
            <Task key={item._id} loader={loader} set={set} item={item} id={id} />
          ))
        ) : (
          <p className="text-center text-gray-400 mt-6 select-none">No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default List;
