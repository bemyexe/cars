import {carsService} from '../../../features/cars/api';
import {createAppAsyncThunk} from '../../helpers';

export const getCarsThunk = createAppAsyncThunk(
  'cars/getCars',
  async (_, {rejectWithValue}) => {
    try {
      const response = await carsService.getCars();
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
