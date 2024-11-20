import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const da = await fetch('http://localhost:8000/todos');
        const response = await da.json();
        console.log(response); // Log the response here
        setData(response);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return <>{JSON.stringify(data)}</>;
}

export default App;
