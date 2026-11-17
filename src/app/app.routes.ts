
import { Routes } from '@angular/router';

// Module 1 - Food Item Management
import { Dashboard } from './features/dashboard/dashboard';
import { FoodItemList } from './features/food-item-list/food-item-list';
import { AddFoodItem } from './features/add-food-item/add-food-item';
import { EditFoodItem } from './features/edit-food-item/edit-food-item';

// Module 2 - Category Management
import { CategoryList } from './features/category-list/category-list';
import { AddCategory } from './features/add-category/add-category';
import { EditCategory } from './features/edit-category/edit-category';

export const routes: Routes = [

  // Dashboard
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: Dashboard
  },

  // Module 1
  {
    path: 'food-items',
    component: FoodItemList
  },
  {
    path: 'add-food-item',
    component: AddFoodItem
  },
  {
    path: 'edit-food-item/:id',
    component: EditFoodItem
  },

  // Module 2
  {
    path: 'categories',
    component: CategoryList
  },
  {
    path: 'add-category',
    component: AddCategory
  },
  {
    path: 'edit-category/:id',
    component: EditCategory
  },

  // Invalid routes
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
