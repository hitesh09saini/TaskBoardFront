import React, { useEffect, useState } from 'react';
import CreateList from '../List/CreateList';
import List from '../List/List';
import instance from '../../instance';

const Main = ({loader}) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      loader(true)
      const response = await instance.get('/api/v1/list');
      setData(response.data.list);
    } catch (error) {
      if (error.response) {
        console.log('Server Error:', error.response.data);
        console.log('Status Code:', error.response.status);
      } else if (error.request) {
        console.log('No response received');
      } else {
        console.log('Error:', error.message);
      }
    }finally{
      loader(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='min-h-[87vh] p-4 relative flex '>
      <div className='flex flex-wrap gap-5 '>

        {data.map((item, index) => (
          <List loader={loader} key={item._id} index={index + 1} setData={setData} data={item} />
        ))}
        <CreateList fetch={fetchData} />
      </div>
    </div>
  );
};

export default Main;
