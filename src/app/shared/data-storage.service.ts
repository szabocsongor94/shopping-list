import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from 'rxjs/operators';

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable({ providedIn: 'root' })
export class DataStorageservice {

    constructor(private http: HttpClient, private recipeService: RecipeService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        console.log(recipes);

        this.http
            .put(
                'https://ng-course-recipe-book-6fbcb-default-rtdb.europe-west1.firebasedatabase.app/recipe.json',
                recipes
            )
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        return this.http
            .get<Recipe[]>(
                'https://ng-course-recipe-book-6fbcb-default-rtdb.europe-west1.firebasedatabase.app/recipe.json'
            )
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients ? recipe.ingredients : []
                        };
                    });
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                })
            )
    }



}