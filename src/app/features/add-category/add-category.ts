
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { CategoryService } from '../../services/category';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css'
})
export class AddCategory {

  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private router = inject(Router);

  loading = false;
  errorMessage = '';

  categoryForm = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100)
    ]],
    description: ['', Validators.maxLength(250)]
  });

  submitCategory(): void {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const formValue = this.categoryForm.getRawValue();

    this.categoryService.create({
      name: formValue.name!.trim(),
      description: formValue.description?.trim() || undefined
    }).subscribe({
      next: () => {
        alert('Category added successfully!');
        this.router.navigate(['/categories']);
      },
      error: (error) => {
        console.error('Create category error:', error);
        this.errorMessage =
          error.error?.message || 'Unable to create category.';
        this.loading = false;
      }
    });
  }
}
