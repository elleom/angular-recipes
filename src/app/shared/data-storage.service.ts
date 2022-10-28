import {Injectable, OnDestroy} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";
import {Subscription} from "rxjs";

@Injectable({providedIn: 'root'})
export class DataStorageService implements OnDestroy{
  db: string = 'https://recipes-angular-5e117-default-rtdb.firebaseio.com/recipes.json'
  recipesSubscription: Subscription;
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
    this.recipesSubscription = this.http.get<Recipe[]>(this.db)
      .subscribe(recipes => {
        this.recipeService.setRecipes(recipes);
    })
  }

  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe()
  }
}
