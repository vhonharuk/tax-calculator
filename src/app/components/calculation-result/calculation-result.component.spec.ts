import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationResultComponent } from './calculation-result.component';
import { CurrencyPipe } from '@angular/common';

describe('CalculationResultComponent', () => {
  let component: CalculationResultComponent;
  let fixture: ComponentFixture<CalculationResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculationResultComponent, CurrencyPipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculationResultComponent);
    component = fixture.componentInstance;
    component.taxResult = {
      annualTaxPaid: 11000,
      grossAnnualSalary: 40000,
      grossMonthlySalary: 3333.33,
      monthlyTaxPaid: 916.67,
      netAnnualSalary: 29000,
      netMonthlySalary: 2416.67
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
