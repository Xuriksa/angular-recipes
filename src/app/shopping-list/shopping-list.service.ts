import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  constructor() {}

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredients(ingredients: Ingredient[]) {
    for (let ingredient of ingredients) {
      const ingredientIndex = this.ingredients.findIndex(
        (ing) => ing.name.toLowerCase() === ingredient.name.toLowerCase()
      );

      if (ingredientIndex >= 0) {
        this.ingredients[ingredientIndex].amount += ingredient.amount;
      } else {
        this.ingredients.push(ingredient);
      }
    }

    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
