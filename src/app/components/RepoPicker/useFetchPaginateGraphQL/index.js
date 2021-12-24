import { useEffect, useState, useCallback, useDebugValue } from "react";

export const useFetchPaginateGraphQL = (fetchConnection, deps) => {
  const [items, setItems] = useState([]);
  const [pageInfo, setPageInfo] = useState();
  const [error, setError] = useState();
  const [errors, setErrors] = useState();
  const [resetCounter, setResetCounter] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchMore = useCallback(async () => {
    try {
      setIsLoading(true);

      const { connection, errors: theseErrors } = await fetchConnection({
        cursor: pageInfo?.endCursor,
      });

      setIsLoading(false);

      if (theseErrors) {
        setErrors(theseErrors);
        return;
      }

      const { edges, pageInfo: newPageInfo } = connection;
      const newItems = edges.map((edge) => edge.node) ?? [];

      setPageInfo(newPageInfo);
      setItems([...items, ...newItems]);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }, [
    fetchConnection,
    items,
    setItems,
    pageInfo,
    setPageInfo,
    setErrors,
    setIsLoading,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...deps,
  ]);

  useEffect(() => {
    setItems([]);
    setPageInfo(undefined);
    setError(undefined);
    setErrors(undefined);
    setResetCounter(Math.random());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    fetchMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetCounter]);

  useDebugValue({
    items,
    error,
    errors,
    isLoading,
    hasNextPage: pageInfo?.hasNextPage,
  });

  return {
    fetchMore,
    items,
    error,
    errors,
    isLoading,
    hasNextPage: pageInfo?.hasNextPage,
  };
};
