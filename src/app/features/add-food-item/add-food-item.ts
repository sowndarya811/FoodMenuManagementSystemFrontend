
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { FoodItemService } from '../../services/food-item';

@Component({
  selector: 'app-add-food-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-food-item.html',
  styleUrl: './add-food-item.css'
})
export class AddFoodItem {

  private fb = inject(FormBuilder);
  private foodService = inject(FoodItemService);
  private router = inject(Router);

  loading = false;
  errorMessage = '';

  foodForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    category: ['', Validators.required],
    description: [''],
    price: [null as number | null, [Validators.required, Validators.min(0.01)]],
    isAvailable: [true]
  });

  get formControls() {
    return this.foodForm.controls;
  }

  submitFoodItem(): void {
    this.errorMessage = '';

    if (this.foodForm.invalid) {
      this.foodForm.markAllAsTouched();
      return;
    }

    const formValue = this.foodForm.getRawValue();

    const foodItem = {
      name: formValue.name!.trim(),
      category: formValue.category!,
      description: formValue.description || '',
      price: Number(formValue.price),
      isAvailable: formValue.isAvailable ?? true
    };

    this.loading = true;

    this.foodService.create(foodItem).subscribe({
      next: () => {
        alert('Food item added successfully!');
        this.loading = false;
        this.router.navigate(['/food-items']);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage =
          error.error?.message || 'Unable to add food item. Please try again.';
      }
    });
  }
}
