import React, { useState } from 'react';
import instance from '../../instance';

const CreateList = ({ fetch }) => {
  const [listName, setName] = useState('');

  const handleCreateList = async (e) => {
    e.preventDefault();

    if (!listName.trim()) {
      alert('List Name is Required!');
      return;
    }

    try {
      await instance.post('/api/v1/list/createList', {
        listName,
        tasks: [],
      });

      setName('');
      fetch();
    } catch (error) {
      console.error('Error creating list:', error);
    }
  };

  return (
    <form
      onSubmit={handleCreateList}
      className="bg-white border border-gray-300 rounded-lg shadow-md p-4 w-full max-w-md"
    >
      <h2 className="text-xl font-semibold mb-3 text-[#581845]">Create New List</h2>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Enter List Name"
          value={listName}
          onChange={(e) => setName(e.target.value)}
          className="flex-grow border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-[#581845]"
          aria-label="List Name"
          autoComplete="off"
        />
        <button
          type="submit"
          className="bg-[#581845] hover:bg-[#7b1e7c] text-white px-4 rounded-md transition"
          aria-label="Create List"
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </form>
  );
};

export default CreateList;
