import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild("nameInput", {static: false}) nameInputRef: ElementRef;
  @ViewChild("amountInput", {static: false}) amountInputRef: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  onAddItem() {
    const ingredientName: string = this.nameInputRef.nativeElement.value;
    const ingredientAmount = +this.amountInputRef.nativeElement.value;

    if (ingredientName && ingredientName !== '' && ingredientAmount > 0) {
      const newIngredient = new Ingredient(ingredientName, ingredientAmount);
      this.ingredientAdded.emit(newIngredient);
    }    
  }

  onEditAmount(event: KeyboardEvent): boolean {
    const key: number = parseInt(event.key);
    const value: number = parseInt((<HTMLInputElement>event.target).value + event.key);
    
    const editingKey = ["Backspace"].includes(event.key);

    if (!editingKey && (isNaN(key) || isNaN(value) || value === 0)) {
      event.preventDefault();
      return false;
    }
  }
}
