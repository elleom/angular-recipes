import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from "../../recipe.model";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  //Input decorator allows the binding of data from outside => into the component
  @Input() recipe: Recipe;
  @Output() selectedRecipe = new EventEmitter<void>();


  constructor() { }

  ngOnInit(): void {
  }

  onSelectRecipe() {
    this.selectedRecipe.emit()
  }
}
