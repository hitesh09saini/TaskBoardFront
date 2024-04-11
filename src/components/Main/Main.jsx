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
    loader(true)
    try {
      const response = await instance.get('/api/v1/list');
      if (response?.data?.list) {
        setData(response.data.list);
      }
      setFetchError(null);
      navigate("/");

    } catch (error) {

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
    loader(false)
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='min-h-[87vh] p-4 relative flex '>
      <div >
        <CreateList fetch={fetchData} />
        {fetchError && <p className="text-red-500">{fetchError}</p>}
        <div className='flex flex-wrap gap-5 mt-5'>
          {data.map((item, index) => (
            <List loader={loader} key={item._id} listName={item.listName} setData={setData} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
