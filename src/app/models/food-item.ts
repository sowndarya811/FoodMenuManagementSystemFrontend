
export interface FoodItem {
  id: number;
  name: string;
  category: string;
  description?: string;
  price: number;
  isAvailable: boolean;
}

export interface CreateFoodItem {
  name: string;
  category: string;
  description?: string;
  price: number;
  isAvailable: boolean;
}
