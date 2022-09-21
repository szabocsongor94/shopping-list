import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipeEditComponent } from "../recipes/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "../recipes/recipe-start/recipe-start.component";
import { RecipesDetailComponent } from "../recipes/recipes-detail/recipes-detail.component";

import { RecipesComponent } from "../recipes/recipes.component";
import { RecipesResolverService } from "../recipes/recipes.resolver.service";
import { ShoppingListComponent } from "./shopping-list.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    {
        path: 'recipes', component: RecipesComponent, children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent },
            {
                path: ':id',
                component: RecipesDetailComponent,
                resolve: [RecipesResolverService]
            },
            { 
                path: ':id/edit', 
                component: RecipeEditComponent, 
                resolve: [RecipesResolverService] },

        ]
    },
    { path: 'shopping-list', component: ShoppingListComponent },

]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}