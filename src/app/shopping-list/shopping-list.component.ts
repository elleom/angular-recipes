import {Component, OnDestroy, OnInit} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: 'shopping-list.component.html',
  styleUrls: ['shopping-list.css'],
  providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients : Ingredient[];
  shoppingListSubscription: Subscription

  constructor(private shoppingListService : ShoppingListService){ }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListSubscription = this.shoppingListService
      .ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
    })
  }

  onIngredientWasAdded(ingredient : Ingredient) {
    this.ingredients.push(ingredient);
  }

  ngOnDestroy(): void {
    this.shoppingListSubscription.unsubscribe()
  }

  onEditIngredient(index: number) {
      this.shoppingListService.startedEditing.next(index)
  }
}
