import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  slSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('form', {static: false}) slForm: NgForm;

  // @ViewChild("nameInput", {static: false}) nameInputRef : ElementRef;
  // @ViewChild("amountInput", {static: false}) amountRef: ElementRef;
  constructor(private slService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.slSubscription = this.slService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.slService.getIngredientById(index)
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    })
  }

  onAddItem(form: NgForm) {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountRef.nativeElement.value;
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.onEditItem(this.editedItemIndex, this.editedItem)
    } else {
      this.slService.addIngredient(newIngredient)
    }
  }

  ngOnDestroy(): void {
    this.slSubscription.unsubscribe()
  }

}
