import { useCallback, useEffect, useState } from 'react';

interface HttpRequestParams {
  url: string;
  config: RequestInit;
}

interface ErrorInfo {
  message: string;
}

async function sendHttpRequest<T>(
  url: string,
  config: RequestInit
): Promise<T> {
  const res = await fetch(url, config);
  const resData = await res.json();

  if (!res.ok) {
    const errorMessage: string =
      resData.message || 'Something went wrong, failed to send request!';
    throw new Error(errorMessage);
  }

  return resData as T;
}

function useHttp<T>({ url, config }: HttpRequestParams) {
  const [data, setData] = useState<T | null>();
  const [error, setError] = useState<ErrorInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function clearData() {
    setData(null);
  }

  const sendRequest = useCallback(
    async (requestData?: any) => {
      setIsLoading(true);
      try {
        const resData: T = await sendHttpRequest<T>(url, {
          ...config,
          body: requestData ? JSON.stringify(requestData) : undefined,
        });
        setData(resData);
        setIsLoading(false);
      } catch (error) {
        setError({
          message:
            error instanceof Error ? error.message : 'Something went wrong!',
        });
        setIsLoading(false);
      }
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && config.method === 'GET') || !config.method || !config)
      sendRequest();
  }, [sendRequest, config]);

  return { sendRequest, error, isLoading, data, clearData };
}

export default useHttp;
