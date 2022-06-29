import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  index: number;


  constructor( private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
          this.index = +params['id'];
        }
      )
    this.recipe = this.recipeService.getRecipeByIndex(this.index);
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients)
  }
}
