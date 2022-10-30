import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipe.model";
import {DataStorageService} from "../shared/data-storage.service";
import {RecipeService} from "./recipe.service";

@Injectable({providedIn: 'root'})
export class RecipesResolver  implements Resolve<Recipe[]>{
  constructor(private dataStorage: DataStorageService, private recipeService: RecipeService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes()
    if( recipes.length > 1) {
      return this.dataStorage.fetchRecipes();
    } else {
      return recipes;
    }
  }

}
