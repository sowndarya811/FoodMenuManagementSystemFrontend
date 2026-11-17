
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodItemService } from '../../services/food-item';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  private foodService = inject(FoodItemService);

  totalItems = 0;
  availableItems = 0;
  unavailableItems = 0;

  loading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;
    this.errorMessage = '';

    this.foodService.getAll().subscribe({
      next: (items) => {
        this.totalItems = items.length;
        this.availableItems = items.filter(
          item => item.isAvailable
        ).length;

        this.unavailableItems =
          this.totalItems - this.availableItems;

        this.loading = false;
      },
      error: () => {
        this.errorMessage =
          'Unable to load dashboard. Please check the backend server.';
        this.loading = false;
      }
    });
  }
}
