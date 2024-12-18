import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupportedCodesService } from '../../shared/services/supported-codes/supported-codes.service';
import { Coin } from '../../shared/models/supported-codes.model';
import { PairConversionService } from '../../shared/services/pair-conversion/pair-conversion.service';
import { ConversionData } from '../../shared/models/pair-conversion.model';

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
  conversionResult: ConversionData = {
    from: undefined,
    to: undefined,
    value: undefined,
    conversion_rate: undefined,
    conversion_result: undefined
  };

  constructor(
      private supportedCodesService: SupportedCodesService, 
      private pairConversionService: PairConversionService
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
        },
        error: (err) => console.error('Erro ao realizar conversão:', err.message)
      });
    }
  }

  handleInvertCoins() {
    const { from, to } = this.converterForm.value;
    this.converterForm.patchValue({ from: to, to: from})
  }

  handleCloseResultContainer() {
    if(this.resultContainer) this.resultContainer = false;
  }
}
