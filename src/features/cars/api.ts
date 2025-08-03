import {ApiInstance} from '../../shared/api';

export interface Car {
  id: number;
  name: string;
  model: string;
  year: number;
  color: string;
  price: number;
  latitude: number;
  longitude: number;
}

class CarsService {
  private carsEndpoint: string = '/test-task/vehicles';

  async getCars(): Promise<Car[]> {
    return ApiInstance<Car[]>(this.carsEndpoint);
  }
}

export const carsService = new CarsService();
