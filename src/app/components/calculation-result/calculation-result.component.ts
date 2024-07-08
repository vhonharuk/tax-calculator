import { Component, Input } from '@angular/core';
import { TaxCalculation } from '../../models/TaxCalculation';
import { CurrencyPipe } from '@angular/common';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'calculation-result',
  standalone: true,
  imports: [ CurrencyPipe, MatListModule ],
  templateUrl: './calculation-result.component.html',
  styleUrl: './calculation-result.component.css'
})
export class CalculationResultComponent {
  @Input() 
  taxResult: TaxCalculation;
}
