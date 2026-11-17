
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { EditFoodItem } from './edit-food-item';

describe('EditFoodItem', () => {
  let component: EditFoodItem;
  let fixture: ComponentFixture<EditFoodItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFoodItem],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditFoodItem);
    component = fixture.componentInstance;
  });

  it('should create the edit food item component', () => {
    expect(component).toBeTruthy();
  });
});
