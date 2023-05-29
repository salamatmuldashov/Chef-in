import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { RecipeService } from 'src/app/services/recipe.service';
import { IRecipe, ICategoriesList, ICategory } from 'src/app/models/models';
import { CreateRecipeComponent } from '../create-recipe/create-recipe.component';
import { getCategories } from 'src/app/layouts/main/generator';
@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.scss']
})
export class UpdateRecipeComponent implements OnInit {
  selectedCategory: any;
  categoriesList: ICategory[] = [];
  username: string = '';
  // category!: ICategory;
  category!: IRecipe;
  updatedCategory !: IRecipe;
  categories: ICategoriesList[] = [];
  category_id !: number;
  updateRecipeForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    image: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    category: new FormControl(null, Validators.required),
    steps: new FormControl('', Validators.required),
  });

  constructor(private recipeService: RecipeService, @Inject(MAT_DIALOG_DATA) public curRecipe: any, private dialogRef: MatDialogRef<UpdateRecipeComponent>) { }
   
  ngOnInit(): void {
    this.categoriesList = getCategories;
    this.category = this.curRecipe;    
    this.username = this.curRecipe.username;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void{
    if(this.updateRecipeForm.valid){
      const formData = this.updateRecipeForm.value;
      const name = formData.name;
      const image = formData.image;
      const description = formData.description;
      const category = formData.category
      const stepsArray = formData.steps

      

      this.recipeService.getCategoryByID(Number(category!)).subscribe(data => {
        this.category_id = data.id;

        
        const updatedRecipe: any = {
          username: this.username,
          name: name!,
          description: description!,
          image : image!,
          steps: stepsArray!,
          category_id : this.category_id,
        }

        this.recipeService.updateRecipe(updatedRecipe, this.category.id).subscribe(
          (response) => { 
            console.log('Recipe updated successfully!', response);
          },
          (error) =>{
            console.log('error', error);
          });
        
          this.dialogRef.close();
      })

    }
  }
  isValidCategory(category: any): boolean {
    const validCategories = ['Salad', 'Italian', 'Meat', 'Burger', 'Soup'];
    return validCategories.includes(category);
  }
}
