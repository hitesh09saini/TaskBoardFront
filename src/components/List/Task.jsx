import React, { useState } from 'react';
import instance from '../../instance';
import { useDrag } from 'react-dnd';

const Task = ({ loader, set, item, id }) => {
  const [status, setStatus] = useState(item.status);
  const [input, setInput] = useState(item.taskName);
  const [description, setDescription] = useState(item.description || '');
  const [isEdit, setEdit] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const key = item._id;

  // Converts URLs in text into clickable links
  const linkifyText = (text, showFull) => {
    if (!text) return '';
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 break-all"
          >
            {showFull ? part : part.length > 30 ? `${part.substring(0, 27)}...` : part}
          </a>
        );
      }
      return (
        <span key={index}>
          {showFull ? part : part.length > 30 ? `${part.substring(0, 27)}...` : part}
        </span>
      );
    });
  };

  const changeStatus = async () => {
    loader(true);
    try {
      await instance.put(`/api/v1/list/status/${id}/${key}`);
      setStatus((prev) => !prev);
    } catch (error) {
      console.error('Error changing task status:', error);
    } finally {
      loader(false);
    }
  };

  const deleteTask = async () => {
    loader(true);
    try {
      const response = await instance.delete(`/api/v1/list/task/${id}/${key}`);
      set(response.data.list.tasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      loader(false);
    }
  };

  const editTask = async () => {
    if (!input.trim()) return; // Optional: prevent empty task names
    loader(true);
    try {
      const response = await instance.put(`/api/v1/list/task/${id}/${key}`, {
        taskName: input,
        description,
      });
      set(response.data.list.tasks);
      setEdit(false);
    } catch (error) {
      console.error('Error editing task:', error);
    } finally {
      loader(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      editTask();
    }
  };

  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: item._id, Text: item.taskName, type: 'TASK' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      draggable={!isEdit}
      className={`bg-white border rounded-lg p-4 mt-3 shadow-sm transition-all duration-200
        ${isDragging ? 'opacity-50' : 'hover:shadow-md'} relative`}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-2 items-start flex-1">
          <i
            onClick={changeStatus}
            className={`p-1 rounded cursor-pointer text-lg fa-solid ${
              !status ? 'text-green-600 hover:bg-green-200 fa-square-check' : 'text-red-600 hover:bg-red-200 fa-ban'
            }`}
            title={status ? 'Mark as Completed' : 'Mark as Pending'}
          ></i>

          {isEdit ? (
            <div className="flex flex-col w-full">
              <input
                type="text"
                placeholder="Task Name"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                className="w-full border p-2 rounded outline-none focus:border-blue-400 mb-1"
                autoFocus
              />
              <textarea
                className="w-full border p-2 rounded outline-none focus:border-blue-400 resize-none"
                value={description}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                onKeyDown={handleKeyDown}
              />
            </div>
          ) : (
            <div className="break-words max-w-[300px]">
              <h4 className={`font-medium ${status ? 'line-through text-gray-400' : ''}`}>
                {linkifyText(item.taskName, false)}
              </h4>
              <p className="text-sm text-gray-500 break-words">
                {item.description ? linkifyText(item.description, false) : 'No description provided'}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col ml-3 space-y-1">
          <i
            onClick={() => setShowDetails(true)}
            title="View Details"
            className="fa-solid fa-eye text-blue-500 hover:bg-blue-200 p-1 rounded cursor-pointer text-sm"
          ></i>
          <i
            onClick={deleteTask}
            title="Delete Task"
            className="fa-solid fa-trash-alt text-red-500 hover:bg-red-200 p-1 rounded cursor-pointer text-sm"
          ></i>

          {isEdit ? (
            <i
              title="Save Task"
              onClick={editTask}
              className="fa-solid fa-check text-green-600 hover:bg-green-200 p-1 rounded cursor-pointer text-sm"
            ></i>
          ) : (
            <i
              title="Edit Task"
              onClick={() => {
                setEdit(true);
                setInput(item.taskName);
                setDescription(item.description || '');
              }}
              className="fa-solid fa-edit text-sky-600 hover:bg-sky-200 p-1 rounded cursor-pointer text-sm"
            ></i>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-2">
          <div className="bg-white rounded-lg w-full max-w-[500px] max-h-[80vh] shadow-lg overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b p-4 bg-gray-50">
              <h3 className="text-lg font-semibold">Task Details</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-500 hover:text-red-500 text-xl font-bold"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            {/* Modal Content (Scrollable) */}
            <div className="p-4 overflow-y-auto flex-1">
              <p className="font-medium text-base mb-2 break-words">{linkifyText(item.taskName, true)}</p>
              <p className="text-sm text-gray-700 mb-4 break-words">
                {item.description ? linkifyText(item.description, true) : 'No description provided'}
              </p>
              <div className="text-xs text-gray-500 space-y-1">
                <p>Status: {status ? 'Pending' : 'Completed'}</p>
                <p>Created At: {new Date(item.createdAt).toLocaleString()}</p>
                <p>Updated At: {new Date(item.updatedAt).toLocaleString()}</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t p-3 bg-gray-50 flex justify-end">
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
