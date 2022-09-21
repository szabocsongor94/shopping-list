import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { DataStorageservice } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";

Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe>{
    recipesService: any;
    constructor(private dataStorageService: DataStorageservice) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipesService.getRecipes();

        if (recipes.length === 0) {
            return this.dataStorageService.fetchRecipes();
        } else {
            return recipes;
        }
    }


}