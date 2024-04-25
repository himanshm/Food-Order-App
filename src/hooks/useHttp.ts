import { useCallback, useEffect, useState } from 'react';

interface HttpRequestParams {
  url: string;
  config?: RequestInit;
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

function useHttp<T>({ url, config = {} }: HttpRequestParams) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ErrorInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendRequest = useCallback(async () => {
    setIsLoading(true);
    try {
      const resData: T = await sendHttpRequest<T>(url, config);
      setData(resData);
      setIsLoading(false);
    } catch (error) {
      setError({
        message:
          error instanceof Error ? error.message : 'Something went wrong!',
      });
      setIsLoading(false);
    }
  }, [url, config]);

  useEffect(() => {
    if (config && config.method === 'GET') sendRequest();
  }, [sendRequest, config]);

  return { sendRequest, error, isLoading, data };
}

export default useHttp;
