import React, { useState } from 'react'
import instance from '../../instance';


const CreateList = ({ fetch }) => {
  const [listName, setName] = useState('')

  const handleCreateList = async (e) => {
    e.preventDefault()
    try {
      if(!listName){
        alert('List Name is Required!')
        return
      }
      const res = await instance.post('/api/v1/list/createList', {
        listName,
        "tasks": [
        ],
      })

      setName('')
      fetch();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='border w-fit h-fit' >
      <div className='bg-[#581845] p-2 px-8 text-center text-white font-bold'>
        Create New List
      </div>

      <div className='bg-white border  p-1 text-xl font-thin'>
        <input onChange={(e) => setName(e.target.value)} id='input' value={listName} type="text" className='p-1 outline-none border rounded ' placeholder='Enter List Name' />
        <i onClick={handleCreateList} className="fa-solid fa-plus text-white active:bg-blue-700 bg-blue-500 p-3"></i>
      </div>
    </div>
  )
}

export default CreateList
