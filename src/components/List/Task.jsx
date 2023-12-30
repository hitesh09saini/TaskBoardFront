import React, { useState } from 'react';
import instance from '../../instance';
import { useDrag } from 'react-dnd';

const Task = ({set, item, id }) => {
    const [status, setStatus] = useState(item.status);
    const [input, setInput] = useState(item.taskName);
    const [isEdit, setEdit] = useState(false);
    const key = item._id;

    const changeStatus = async () => {
        try {
            const response = await instance.put(`/api/v1/list/status/${id}/${key}`);
            setStatus(!status);
        } catch (error) {
            console.error('Error changing task status:', error);
        }
    };

    const deleteTask = async () => {
        try {
            const response = await instance.delete(`/api/v1/list/task/${id}/${key}`);
            set(response.data.list.tasks);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const editTask = async () => {
        try {
            const response = await instance.put(`/api/v1/list/task/${id}/${key}`, {
                taskName: input,
            });

            set(response.data.list.tasks);
            setEdit(false);
        } catch (error) {
            console.error('Error editing task:', error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            editTask();
        }
    };

    const [{isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { id: item._id, Text: item.taskName, type: 'TASK' },
        collect: (monitor) => {
            return {
                isDragging: !!monitor.isDragging(),
            };
        },
    });


    return (
        <p
            ref={drag}
            draggable
            key={key}
            className={`relative select-none bg-white px-2 rounded border border-orange-200 ${isDragging ? 'opacity-50' : ''
                }`}
        >
            <i
                onClick={changeStatus}
                className={`${!status
                        ? 'text-green-600 hover:bg-green-300 active:bg-red-300 active:text-red-400  fa-regular fa-square-check'
                        : 'text-red-600 fa-solid fa-ban hover:bg-red-300 active:bg-green-300 active:text-green-400'
                    } my-2 mr-3`}
            ></i>
            {!isEdit ? (
                <input
                    type="text"
                    onDoubleClick={() => setEdit(!isEdit)}
                    title="double click for edit"
                    className="outline-none"
                    readOnly
                    value={input}
                />
            ) : (
                <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    onDoubleClick={() => setEdit(!isEdit)}
                    title="double click for edit"
                    className="outline-none border "
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                    value={input}
                />
            )}

            <i
                onClick={() => {
                    deleteTask();
                }}
                className="absolute right-1 top-3 text-red-600 fa-solid fa-trash-alt hover:bg-red-300 active:bg-green-300  active:text-green-400 ml-3 cursor-pointer text-[10px]"
            ></i>
        </p>
    );
};

export default Task;
