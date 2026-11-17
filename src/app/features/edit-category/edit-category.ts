
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { CategoryService } from '../../services/category';
import { Category } from '../../models/category';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css'
})
export class EditCategory implements OnInit {

  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  categoryId = 0;
  loading = false;
  saving = false;
  errorMessage = '';

  categoryForm = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100)
    ]],
    description: ['', Validators.maxLength(250)],
    isActive: [true, Validators.required]
  });

  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.categoryId || this.categoryId < 1) {
      this.router.navigate(['/categories']);
      return;
    }

    this.loadCategory();
  }

  loadCategory(): void {
    this.loading = true;

    this.categoryService.getById(this.categoryId).subscribe({
      next: (category: Category) => {
        this.categoryForm.patchValue({
          name: category.name,
          description: category.description || '',
          isActive: category.isActive
        });

        this.loading = false;
      },
      error: (error) => {
        console.error('Load category error:', error);
        this.errorMessage = 'Unable to load category.';
        this.loading = false;
      }
    });
  }

  updateCategory(): void {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.errorMessage = '';

    const value = this.categoryForm.getRawValue();

    this.categoryService.update(this.categoryId, {
      name: value.name!.trim(),
      description: value.description?.trim() || undefined,
      isActive: value.isActive ?? true
    }).subscribe({
      next: () => {
        alert('Category updated successfully!');
        this.router.navigate(['/categories']);
      },
      error: (error) => {
        console.error('Update category error:', error);
        this.errorMessage =
          error.error?.message || 'Unable to update category.';
        this.saving = false;
      }
    });
  }
}
