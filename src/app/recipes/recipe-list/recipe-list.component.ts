import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  sub: Subscription;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.sub = this.recipeService.recipesChanged.subscribe({ next: (recipes: Recipe[]) => {
      this.recipes = recipes;
    } });
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
