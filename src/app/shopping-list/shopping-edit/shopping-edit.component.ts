import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  form: FormGroup;
  sub: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
        this.amountValidator,
      ]),
    });

    this.sub = this.shoppingListService.startedEditing.subscribe({
      next: (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.form.setValue({
          'name': this.editedItem.name,
          'amount': this.editedItem.amount,
        });
      },
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit() {
    const ingredientName = this.form.get('name').value;
    const ingredientAmount = +this.form.get('amount').value;

    if (ingredientName && ingredientName !== '' && ingredientAmount > 0) {
      const newIngredient = new Ingredient(ingredientName, ingredientAmount);

      if (this.editMode) {
        this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
      }
      else {
        this.shoppingListService.addIngredients([newIngredient]);
      }
      
      this.onClear();
    }
  }

  onDelete() {
    if (this.editMode) {
      this.shoppingListService.deleteIngredient(this.editedItemIndex);    
      this.onClear();
    }    
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  onEditAmount(event: KeyboardEvent): boolean {
    const key: number = parseInt(event.key);
    const value: number = parseInt(
      (<HTMLInputElement>event.target).value + event.key
    );

    const editingKey = ['Backspace'].includes(event.key);

    if (!editingKey && (isNaN(key) || isNaN(value) || value === 0)) {
      event.preventDefault();
      return false;
    }
  }

  amountValidator(control: FormControl): { [s: string]: boolean } {
    const amount = +control.value;

    if (!isNaN(amount) && amount !== 0) {
      return null;
    } else {
      return { 'Invalid Amount': true };
    }
  }
}
