import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaxCalculation } from '../models/TaxCalculation';
import { TaxCalculationService } from './tax-calculation-service.service';

describe('TaxCalculationService', () => {
  let service: TaxCalculationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaxCalculationService]
    });
    service = TestBed.inject(TaxCalculationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate tax', () => {
    const taxResult: TaxCalculation = {
      annualTaxPaid: 11000,
      grossAnnualSalary: 40000,
      grossMonthlySalary: 3333.33,
      monthlyTaxPaid: 916.67,
      netAnnualSalary: 29000,
      netMonthlySalary: 2416.67
    };

    var salary = 40000;

    service.getCalculatedTax(salary).subscribe((response: TaxCalculation) => {
      expect(response).toEqual(taxResult);
    });

    const req = httpTestingController.expectOne('http://localhost:5241/api/TaxCalculation?salary=40000');
    expect(req.request.method).toEqual('GET');

    req.flush(taxResult);
  });
});
