import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  id: number;
  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const recipe = this.recipeService.getRecipe(+params['id']);

      if (recipe) {
        this.id = +params['id'];
        this.recipe = recipe;
      } else {
        this.id = -1;
        this.recipe = {
          name: '',
          description: '',
          ingredients: [],
          imagePath: '',
        };
        this.router.navigate(['../']);
      }
    });
  }

  addToShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
