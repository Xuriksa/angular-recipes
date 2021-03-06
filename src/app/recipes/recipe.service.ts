import { Injectable } from '@angular/core';
import { Subject, } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

@Injectable({providedIn: 'root'})
export class RecipeService {  
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];
  // [
  //   new Recipe(      
  //     'Tasty Schnitzel',
  //     'A super-tasty Schnitzel - just awesome!',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     [
  //       new Ingredient("Meat", 1),
  //       new Ingredient("French Fry", 20),
  //     ],
  //   ),
  //   new Recipe(      
  //     'Big Fat Burger',
  //     'What else you need to say?',
  //     'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg', 
  //     [
  //       new Ingredient("Buns", 2),
  //       new Ingredient("Meat", 1),
  //     ],
  //   ),
  //   new Recipe(
  //     'Spaghetti',
  //     'Tasty Spaghetti',
  //     'https://www.mymusclechef.com/dw/image/v2/BDTZ_PRD/on/demandware.static/-/Sites-mmc-master-catalog/default/dwc74cea04/images/hi-res/BE008.jpg',
  //     [
  //       new Ingredient("Noodles", 20),
  //       new Ingredient("Tomato", 3),
  //     ],
  //   ),
  // ];

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    if (index >= 0 && index < this.recipes.length) {
      this.recipes[index] = recipe;
      this.recipesChanged.next(this.recipes.slice());
    }
  }

  deleteRecipe(index: number) {
    if (index >= 0 && index < this.recipes.length) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }
}
