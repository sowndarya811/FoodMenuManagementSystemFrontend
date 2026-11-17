
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { FoodItemService } from '../../services/food-item';

@Component({
  selector: 'app-edit-food-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-food-item.html',
  styleUrl: './edit-food-item.css'
})
export class EditFoodItem implements OnInit {

  private fb = inject(FormBuilder);
  private foodService = inject(FoodItemService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  foodId!: number;
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

  ngOnInit(): void {
    this.foodId = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.foodId || this.foodId <= 0) {
      this.errorMessage = 'Invalid food item ID.';
      return;
    }

    this.loadFoodItem();
  }

  loadFoodItem(): void {
    this.loading = true;

    this.foodService.getById(this.foodId).subscribe({
      next: (food) => {
        this.foodForm.patchValue({
          name: food.name,
          category: food.category,
          description: food.description || '',
          price: food.price,
          isAvailable: food.isAvailable
        });

        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load food item.';
        this.loading = false;
      }
    });
  }

  updateFoodItem(): void {
    this.errorMessage = '';

    if (this.foodForm.invalid) {
      this.foodForm.markAllAsTouched();
      return;
    }

    const value = this.foodForm.getRawValue();

    const updatedFood = {
      name: value.name!.trim(),
      category: value.category!,
      description: value.description || '',
      price: Number(value.price),
      isAvailable: value.isAvailable ?? true
    };

    this.loading = true;

    this.foodService.update(this.foodId, updatedFood).subscribe({
      next: () => {
        alert('Food item updated successfully!');
        this.loading = false;
        this.router.navigate(['/food-items']);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage =
          error.error?.message || 'Unable to update food item.';
      }
    });
  }
}
