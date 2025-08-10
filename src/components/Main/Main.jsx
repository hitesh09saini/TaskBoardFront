import React, { useEffect, useState } from 'react';
import CreateList from '../List/CreateList';
import List from '../List/List';
import instance from '../../instance';
import { useNavigate } from 'react-router-dom';

const Main = ({ loader }) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    loader(true);
    try {
      const response = await instance.get('/api/v1/list');
      if (response?.data?.list) {
        setData(response.data.list);
      }
      setFetchError(null);
      navigate('/');
    } catch (error) {
      setFetchError('Error fetching data. Please try again.');
      if (error.response) {
        console.error('Server Error:', error.response.data);
        console.error('Status Code:', error.response.status);
      } else if (error.request) {
        console.error('No response received');
      } else {
        console.error('Error:', error.message);
      }
    }
    loader(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="min-h-[87vh] p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <CreateList fetch={fetchData} />

        {fetchError && (
          <p className="text-red-600 font-semibold text-center">{fetchError}</p>
        )}

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.length > 0 ? (
            data.map((item) => (
              <List
                loader={loader}
                key={item._id}
                listName={item.listName}
                setData={setData}
                data={item}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full select-none">
              No lists available.
            </p>
          )}
        </section>
      </div>
    </main>
  );
};

export default Main;
