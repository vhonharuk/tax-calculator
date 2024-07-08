import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryFormComponent } from './salary-form.component';
import { TaxCalculation } from '../../models/TaxCalculation';
import { of } from 'rxjs';
import { TaxCalculationService } from '../../services/tax-calculation-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SalaryFormComponent', () => {
  let component: SalaryFormComponent;
  let fixture: ComponentFixture<SalaryFormComponent>;

  const taxCalculatorServiceMock = jasmine.createSpyObj(
    TaxCalculationService,
    { 'getCalculatedTax': of({
      annualTaxPaid: 11000,
      grossAnnualSalary: 40000,
      grossMonthlySalary: 3333.33,
      monthlyTaxPaid: 916.67,
      netAnnualSalary: 29000,
      netMonthlySalary: 2416.67
    } as TaxCalculation) },
  );
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatFormFieldModule, MatFormFieldModule, MatButtonModule, HttpClientTestingModule, NoopAnimationsModule],
      providers: [
        { provide: TaxCalculationService, useValue: taxCalculatorServiceMock  }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalaryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit taxCalculationEvent when onClick is executed', () => {
    const salaryControl = component.form.controls.salary;
    salaryControl.setValue('40000');
    fixture.detectChanges();
    
    spyOn(component.taxCalculationEvent, 'emit');

    component.onClick();

    fixture.detectChanges();

    expect(taxCalculatorServiceMock.getCalculatedTax).toHaveBeenCalledWith(40000);
    expect(component.taxCalculationEvent.emit).toHaveBeenCalled();
  });

  it('isInputValid should respect Validators.min', () => {
    const salaryControl = component.form.controls.salary;
    salaryControl.setValue('-1');
    salaryControl.markAllAsTouched();

    fixture.detectChanges();

    expect(component.isInputValid()).toBeTrue();
  });

  it('isInputEmpty should respect Validators.required', () => {
    const salaryControl = component.form.controls.salary;
    salaryControl.setValue('');
    salaryControl.markAllAsTouched();

    fixture.detectChanges();

    expect(component.isInputEmpty()).toBeTrue();
  });
});
