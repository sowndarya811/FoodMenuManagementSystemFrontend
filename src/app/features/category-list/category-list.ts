
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css'
})
export class CategoryList implements OnInit {

  categories: Category[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    this.errorMessage = '';

    this.categoryService.getAll().subscribe({
      next: (data: Category[]) => {
        console.log('Categories received:', data);
        this.categories = data;
        this.loading = false;
        console.log('Loading status:', this.loading);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.errorMessage = 'Unable to load categories.';
        this.loading = false;
      },
      complete: () => {
        console.log('Category API request completed');
      }
    });
  }

  deleteCategory(id: number): void {
    if (!confirm('Are you sure you want to delete this category?')) {
      return;
    }

    this.categoryService.delete(id).subscribe({
      next: () => {
        this.successMessage = 'Category deleted successfully!';
        this.loadCategories();
      },
      error: (error) => {
        console.error('Delete error:', error);
        this.errorMessage =
          error.error?.message || 'Unable to delete category.';
      }
    });
  }
}
