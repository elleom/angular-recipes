import {Injectable, OnDestroy} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";
import {map, tap} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  db: string = 'https://recipes-angular-5e117-default-rtdb.firebaseio.com/recipes.json'
  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes()
    this.http
      .put(this.db, recipes).subscribe(res => {
      console.log(res)
    })
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.db)
      .pipe(map( recipes => {
        return recipes.map( recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
        })
      }), tap(recipes => {
         this.recipeService.setRecipes(recipes)
      }))
  }
}
