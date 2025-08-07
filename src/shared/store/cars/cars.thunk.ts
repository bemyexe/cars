import {ApiInstanceError} from '../../api/api-instance';
import {createAppAsyncThunk} from '../../helpers';

export const getCarsThunk = createAppAsyncThunk(
  'cars/getCars',
  async (_, {rejectWithValue, extra}) => {
    try {
      const response = await extra.carsService.getCars();
      return response;
    } catch (err) {
      const error = err as ApiInstanceError;
      return rejectWithValue(error.message);
    }
  }
);
