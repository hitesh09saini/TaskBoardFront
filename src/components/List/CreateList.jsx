import React from 'react'
import instance from '../../instance';


const CreateList = ({fetch}) => {
     
  const handleCreateList= async (e)=>{
       e.preventDefault()
      try {
        const res = await instance.post('/api/v1/list/createList', {
          "tasks": [
        ]
        })
         
        fetch();
      } catch (error) {
        console.log(error);
      }
  }
   
  return (
    <div className='border w-fit h-fit' >
       <div className='bg-gray-400 p-2 px-8 w-fit'>
        Create New List
       </div>
       
       <div onClick={handleCreateList}  className='bg-gray-300  p-2 text-4xl flex justify-center items-center font-thin'>
        <i className="fa-solid fa-plus active:text-gray-500 text-gray-300 hover:bg-gray-200 bg-gray-100 p-3 rounded-full "></i>
       </div>
    </div>
  )
}

export default CreateList
