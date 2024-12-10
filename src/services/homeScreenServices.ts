// homeScreenService.ts
import axios from 'axios';
import { FoodItem } from '../types/Data';

// Define the structure of the Food item


// Service class to fetch food data
export class HomeScreenService {
  private static readonly BASE_URL = process.env.BASE_URL as string ;

  /**
   * @returns {Promise<FoodItem[]>} - A promise that resolves to an array of FoodItem objects
   */
  static async getFoodData(): Promise<FoodItem[]> {
    try {
      const response = await axios.get<FoodItem[]>(`${this.BASE_URL}foods/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching food data:', error);
      throw new Error('Failed to fetch food data');
    }
  }

  /**
   * @param {string} id - The ID of the food item
   * @returns {Promise<FoodItem>} - A promise that resolves to a FoodItem object
   */
  static async getFoodDetails(id: string): Promise<FoodItem> {
    try {
      const response = await axios.get<FoodItem>(`${this.BASE_URL}foods/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching details for food item with ID: ${id}`, error);
      throw new Error('Failed to fetch food details');
    }
  }
}
