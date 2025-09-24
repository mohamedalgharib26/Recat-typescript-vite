import React, { useState, useEffect, useCallback } from "react";

// 1. Define the props interface for the component.
interface DataFetcherProps {
  id: string; // Assuming 'id' is a string, which is common for APIs.
}

// 2. Define the type for the fetched data. Use a union type with 'null'
// to account for the initial state before data is fetched.
interface Data {
  // Define the structure of your data here.
  // For a generic example, we'll just say it has an 'id' and a 'name'.
  id: number;
  title: string;
  // ...other properties
}

const DataFetcher: React.FC<DataFetcherProps> = ({ id }) => {
  // 3. Type the state using the 'Data' interface, allowing it to be either 'Data' or 'null'.
  const [data, setData] = useState<Data | null>(null);

  // 4. Type the async function passed to useCallback.
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result: Data = await response.json();
      setData(result);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setData(null);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      {data ? (
        <div>
          <h2>Data Fetched:</h2>
          <p>ID: {data.id}</p>
          <p>Name: {data.title}</p>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default DataFetcher;
