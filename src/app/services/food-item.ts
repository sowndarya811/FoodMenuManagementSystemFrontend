
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FoodItem, CreateFoodItem } from '../models/food-item';

@Injectable({
  providedIn: 'root'
})
export class FoodItemService {

  private http = inject(HttpClient);

  private apiUrl = 'https://localhost:7278/api/fooditems';

  // Get all food items with optional filters
  getAll(category?: string, availableOnly?: boolean): Observable<FoodItem[]> {
    let params = new HttpParams();

    if (category) {
      params = params.set('category', category);
    }

    if (availableOnly !== undefined) {
      params = params.set('availableOnly', availableOnly);
    }

    return this.http.get<FoodItem[]>(this.apiUrl, { params });
  }

  // Get food item by ID
  getById(id: number): Observable<FoodItem> {
    return this.http.get<FoodItem>(`${this.apiUrl}/${id}`);
  }

  // Add food item
  create(foodItem: CreateFoodItem): Observable<FoodItem> {
    return this.http.post<FoodItem>(this.apiUrl, foodItem);
  }

  // Update food item
  update(id: number, foodItem: CreateFoodItem): Observable<FoodItem> {
    return this.http.put<FoodItem>(`${this.apiUrl}/${id}`, foodItem);
  }

  // Delete food item
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
