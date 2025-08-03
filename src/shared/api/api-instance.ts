export class ApiInstanceError extends Error {
  constructor(response: Response) {
    super('ApiInstanceError:' + response.status);
  }
}

export const ApiInstance = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new ApiInstanceError(response);
  }

  const data: T = await response.json();
  return data;
};
