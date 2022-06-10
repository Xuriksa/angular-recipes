import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  recipe: Recipe;
  constructor() {}

  ngOnInit(): void {}

  onRecipeSelected(selectedRecipe: Recipe) {
    this.recipe = selectedRecipe;
  }
}
