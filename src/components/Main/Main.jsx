import React, { useEffect, useState } from 'react';
import CreateList from '../List/CreateList';
import List from '../List/List';
import instance from '../../instance';
import { useNavigate } from "react-router-dom";

const Main = ({ loader }) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      loader(true)
      const response = await instance.get('/api/v1/list');
      if(response?.data?.list){
        loader(false)
        setData(response.data.list);
        setFetchError(null);
        navigate("/");
      }
    } catch (error) {
      loader(false)
      setFetchError('Error fetching data. Please try again.');
      if (error.response) {
        console.log('Server Error:', error.response.data);
        console.log('Status Code:', error.response.status);
      } else if (error.request) {
        console.log('No response received');
      } else {
        console.log('Error:', error.message);
      }
    }
  };

  useEffect(() => {  
    fetchData();
  }, []);

  return (
    <div className='min-h-[87vh] p-4 relative flex '>
      <div className='flex flex-wrap gap-5 '>
        {fetchError && <p className="text-red-500">{fetchError}</p>}
        {data.map((item, index) => (
          <List loader={loader} key={item._id} index={index + 1} setData={setData} data={item} />
        ))}
        <CreateList fetch={fetchData} />
      </div>
    </div>
  );
};

export default Main;
