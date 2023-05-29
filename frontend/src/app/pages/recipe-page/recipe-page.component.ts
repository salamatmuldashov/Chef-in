import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { UpdateRecipeComponent } from '../update-recipe/update-recipe.component';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private  dialog: MatDialog, private recipeService: RecipeService) {}


  UpdateRecipe() : void{
    const dialogRef = this.dialog.open(UpdateRecipeComponent,{
      width: '700px',
      data: this.data
    })

  }

  DeleteRecipe(): void{
    this.recipeService.deleteRecipe(this.data.id).subscribe(
      (response) => { 
        console.log('Recipe deleted successfully!', response);
      },
      (error) =>{
        console.log('error', error);
      });
    this.dialog.closeAll();
  }
}
