
import { Routes } from '@angular/router';

import { Dashboard } from './features/dashboard/dashboard';
import { FoodItemList } from './features/food-item-list/food-item-list';
import { AddFoodItem } from './features/add-food-item/add-food-item';
import { EditFoodItem } from './features/edit-food-item/edit-food-item';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: Dashboard
  },
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
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
