import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../recipe.model";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

 @Input() recipe:Recipe
  //Input decorator allows the binding of data from outside => into the component
  constructor() { }

  ngOnInit(): void {
  }

}
