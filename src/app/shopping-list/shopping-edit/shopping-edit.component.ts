import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  // @ViewChild("nameInput", {static: false}) nameInputRef : ElementRef;
  // @ViewChild("amountInput", {static: false}) amountRef: ElementRef;
    constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddItem(form: NgForm) {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountRef.nativeElement.value;
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount);
    this.slService.addIngredient(newIngredient)
  }
}
