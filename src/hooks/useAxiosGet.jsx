import {
  useCallback, useEffect, useState
} from 'react';
import axios from 'axios';

const useAxiosGet = (url) => {
  const [data, setData] = useState({ contacts: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      setData(response.data);
    } catch (errorFetch) {
      setError(errorFetch);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    fetchData
  };
};

export default useAxiosGet;
