import { useEffect, useState } from "react";

interface AppWriteState {
  isLoading: boolean;
  isError: boolean;
  error: string;
}

export function useAppWrite<T>(fn: (...params: any[]) => Promise<T>, params: any[] = []) {
  const initialState: AppWriteState = {
    isLoading: true,
    isError: false,
    error: "",
  };

  const [data, setData] = useState<T | []>([]);
  const [state, setState] = useState(initialState);

  const getData = async () => {
    try {
      const posts = await fn(...params);
      setData(posts);
    } catch (error: any) {
      setState((prev) => ({ ...prev, error: error.message, isError: true }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const refetch = () => {
    setState(initialState);
    getData();
  };

  return {
    data,
    refetch,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  };
}
