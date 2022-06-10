import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe("Recipe 1", "First", "https://get.pxhere.com/photo/dish-food-cuisine-ingredient-la-carte-food-hors-d-oeuvre-recipe-vegetarian-food-comfort-food-produce-appetizer-Persillade-side-dish-finger-food-meat-garnish-canape-japanese-cuisine-mediterranean-food-1621827.jpg"),
    new Recipe("Recipe 2", "Second", "https://www.logolynx.com/images/logolynx/82/829ba7822e43ebe89394d1ecbbf152b7.jpeg"),
  ];

  @Output() recipeClicked = new EventEmitter<Recipe>();

  constructor() {}

  ngOnInit(): void {}
}
