
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { FoodItemService } from '../../services/food-item';
import { FoodItem } from '../../models/food-item';

@Component({
  selector: 'app-food-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './food-item-list.html',
  styleUrl: './food-item-list.css'
})
export class FoodItemList implements OnInit {

  private foodService = inject(FoodItemService);
  private cdr = inject(ChangeDetectorRef);

  foodItems: FoodItem[] = [];
  category = '';
  availableOnly = false;

  loading = false;
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    this.loadFoodItems();
  }

  loadFoodItems(): void {
    this.loading = true;
    this.errorMessage = '';
    this.cdr.detectChanges();

    this.foodService.getAll(
      this.category || undefined,
      this.availableOnly ? true : undefined
    ).subscribe({
      next: (items: FoodItem[]) => {

        console.log('Food items received:', items);

        this.foodItems = items;
        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('API Error:', error);

        this.errorMessage = 'Unable to load food items.';
        this.loading = false;

        this.cdr.detectChanges();
      }
    });
  }

  applyFilters(): void {
    this.loadFoodItems();
  }

  clearFilters(): void {
    this.category = '';
    this.availableOnly = false;
    this.loadFoodItems();
  }

  deleteFoodItem(id: number): void {

    if (!confirm('Are you sure you want to delete this food item?')) {
      return;
    }

    this.foodService.delete(id).subscribe({
      next: () => {

        this.successMessage = 'Food item deleted successfully!';
        this.loadFoodItems();
      },

      error: (error) => {

        console.error('Delete error:', error);

        this.errorMessage = 'Unable to delete food item.';
        this.cdr.detectChanges();
      }
    });
  }
}
