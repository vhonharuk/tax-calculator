import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaxCalculation } from './models/TaxCalculation';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CalculationResultComponent } from './components/calculation-result/calculation-result.component';
import { SalaryFormComponent } from './components/salary-form/salary-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SalaryFormComponent, CalculationResultComponent, CommonModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  taxResult: TaxCalculation;

  onTaxCalculation(value: TaxCalculation) {
    this.taxResult = value;
  }

}
