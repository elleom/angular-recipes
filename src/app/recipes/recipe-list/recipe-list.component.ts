import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipesObservable: Subscription

  recipes: Recipe[];

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute
  ) {
  }

  ngOnDestroy(): void {
    this.recipesObservable.unsubscribe()
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();

    this.recipesObservable = this.recipeService.recipesChanged.subscribe((recipesData: Recipe[]) => {
      this.recipes = recipesData;
    })
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }
}
