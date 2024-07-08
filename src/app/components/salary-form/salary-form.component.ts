import { Component, Output, EventEmitter } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { TaxCalculation } from '../../models/TaxCalculation';
import { TaxCalculationService } from '../../services/tax-calculation-service.service';

@Component({
  selector: 'salary-form',
  templateUrl: './salary-form.component.html',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule],
  styleUrl: './salary-form.component.css'
})
export class SalaryFormComponent {
  form = new FormGroup({
    salary: new FormControl('',[Validators.required, Validators.min(0)])
  });

  @Output() taxCalculationEvent = new EventEmitter<TaxCalculation>();

  constructor(private taxCalculationService: TaxCalculationService) { }

  onClick() {
    this.taxCalculationService.getCalculatedTax(Number(this.form.controls.salary.value))
    .subscribe(result => 
      
      this.taxCalculationEvent.emit(result));
  }
  
  isInputValid() {
    return this.form.controls.salary.touched  && this.form.controls.salary.hasError('min') 
     && !this.form.controls.salary.hasError('required')
  }

  isInputEmpty() {
    return this.form.controls.salary.touched && this.form.controls.salary.hasError('required')
  }
}
