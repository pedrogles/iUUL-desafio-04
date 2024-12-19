import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupportedCodesService } from '../../shared/services/supported-codes/supported-codes.service';
import { Coin } from '../../shared/models/supported-codes.model';
import { PairConversionService } from '../../shared/services/pair-conversion/pair-conversion.service';
import { ConversionData } from '../../shared/models/pair-conversion.model';
import { LocalStorageService } from '../../shared/services/local-storage/local-storage.service';
import { Conversion } from '../../shared/models/local-storage.model';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './views/currency-converter.component.html',
  styleUrl: './views/currency-converter.component.scss'
})

export class CurrencyConverterComponent {
  resultContainer: boolean = false;
  converterForm!: FormGroup;
  coins!: Coin[];
  date = new Date();
  isHighValue!: boolean;
  conversionResult: ConversionData = {
    from: undefined,
    to: undefined,
    value: undefined,
    conversion_rate: undefined,
    conversion_result: undefined
  };

  constructor(
      private supportedCodesService: SupportedCodesService, 
      private pairConversionService: PairConversionService,
      private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.loadCoins();
    this.initForm();
  }

  private loadCoins() {
    this.supportedCodesService.getCodes().subscribe({
      next: (coins) => this.coins = coins,
      error: (err) => console.error('Erro ao carregar moedas:', err.message)
    });
  }

  private initForm() {
    this.converterForm = new FormGroup({
      from: new FormControl<string | null | undefined>('', Validators.required),
      to: new FormControl<string | null | undefined>('', Validators.required),
      value: new FormControl<number | null | undefined>(undefined, [Validators.required, Validators.min(1)])
    });
  }

  handleSubmit() {
    if(this.converterForm.valid) {
      const conversionData = {
        from: this.converterForm.value.from,
        to: this.converterForm.value.to,
        value: this.converterForm.value.value
      }
      this.pairConversionService.getPairConversion(conversionData).subscribe({
        next: (response) => {
          this.conversionResult = {
            ...conversionData,
            conversion_rate: response.conversion_rate, 
            conversion_result: response.conversion_result
          }
          this.resultContainer = true;
          this.checkAndStoreConversion();
        },
        error: (err) => console.error('Erro ao realizar conversão:', err.message)
      });
    }
  }

  private checkAndStoreConversion() {
    const conversionData = {
      from: this.conversionResult.to,
      to: 'USD',
      value: this.conversionResult.conversion_result
    }

    this.pairConversionService.getPairConversion(conversionData).subscribe({
      next: (response) => {
        response.conversion_result! > 1000 ? this.isHighValue = true : this.isHighValue = false
        this.updateConversionHistory()
      },
      error: (err) => console.error('Erro ao realizar conversão:', err.message)
    });
  }

  private updateConversionHistory() {
    if(this.localStorageService.getItem('conversion-history')){
      const conversionHistory: Conversion[] | null = this.localStorageService.getItem('conversion-history')
      const lastId = conversionHistory![conversionHistory!.length - 1].id

      const newConversion = {
          id: lastId + 1,
          conversion_date: this.getFormatedDate(this.date), 
          conversion_time: this.getFormatedHour(this.date), 
          from_currency: this.conversionResult.from!, 
          to_currency: this.conversionResult.to!, 
          input_value: this.conversionResult.value!, 
          output_value: this.conversionResult.conversion_result!, 
          exchange_rate: this.conversionResult.conversion_rate!, 
          isHigh_value:  this.isHighValue
      };

      conversionHistory!.push(newConversion);
      this.localStorageService.setItem('conversion-history', conversionHistory)
    } 
    else {
      const firstConversion = {
        id: 1,
        conversion_date: this.getFormatedDate(this.date), 
        conversion_time: this.getFormatedHour(this.date), 
        from_currency: this.conversionResult.from!, 
        to_currency: this.conversionResult.to!, 
        input_value: this.conversionResult.value!, 
        output_value: this.conversionResult.conversion_result!, 
        exchange_rate: this.conversionResult.conversion_rate!, 
        isHigh_value: this.isHighValue 
      }

      const conversionHistory = [firstConversion]
      this.localStorageService.setItem('conversion-history', conversionHistory)
    }
  }

  private getFormatedDate(date: Date): string {
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`
  }

  private getFormatedHour(date: Date): string {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }

  handleInvertCoins() {
    const { from, to } = this.converterForm.value;
    this.converterForm.patchValue({ from: to, to: from})
  }

  handleCloseResultContainer() {
    if(this.resultContainer) this.resultContainer = false;
  }
}
