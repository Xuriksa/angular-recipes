import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

const URL = 'https://ng-course-recipe-book-4b058-default-rtdb.firebaseio.com/';

@Injectable({providedIn: 'root'})
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService) {

    }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();

        this.http.put<Recipe[]>(URL + "recipes.json", recipes)
        .subscribe({next: (response) => {
            console.log(response);
        }});
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(URL + "recipes.json")
        .pipe(map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
        }), tap(recipes => {
            this.recipeService.setRecipes(recipes);
        }));
    }
}