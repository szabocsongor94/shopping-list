import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    /* private recipes: Recipe[] = [
        new Recipe(
            'A Test Recipe',
            'This is simply a test',
            'https://www.averiecooks.com/wp-content/uploads/2021/01/garlicbutterchicken-5.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]),
        new Recipe(
            'Another Test Recipe',
            'This is simply a test',
            'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574',
            [
                new Ingredient('Meat', 1),
                new Ingredient('Buns', 2)
            ]),
        new Recipe(
            'Spagetti',
            'This is simply a test',
            'https://kep.cdn.indexvas.hu/1/0/1857/18576/185761/18576197_91d66836f8ae3f34f89ef57ab92f2b9e_wm.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('Pasta', 2)
            ])
    ];*/

    private recipes: Recipe[] = [];

    constructor(private shoppinglistService: ShoppingListService) { }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        console.log(this.recipes);
        this.recipesChanged.next(this.recipes.slice());        
    }

    getRecipes() {
        console.log(this.recipes)
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppinglistService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

}