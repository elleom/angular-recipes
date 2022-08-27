import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe.model";
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      // if id not undefined then is not new
      this.editMode = params['id'] != null;
      this.initForm()
    })
  }

  private initForm() {
    let recipeName: string = '';
    let recipeImagePath: string = '';
    let recipeDescription: string = '';
    let recipeIngredients: Array<Ingredient> = []

    if (this.editMode) {
      let recipe: Recipe = this.recipeService.getRecipeById(this.id)
      recipeName = recipe.name
      recipeImagePath = recipe.imagePath
      recipeDescription = recipe.description
      recipeIngredients = recipe.ingredients
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription)
    });

  }

  onSubmit() {

  }
}
