export interface Conversion {
  id: number; // Identificador único para a conversão
  conversion_date: string; // Data da conversão no formato 'DD-MM-AAAA'
  conversion_time: string; // Hora da conversão no formato 'HH:mm'
  from_currency: string; // Moeda de origem
  to_currency: string; // Moeda de destino
  input_value: number; // Valor inserido para conversão
  output_value: number; // Valor obtido após a conversão
  exchange_rate: number; // Taxa de câmbio utilizada
  isHigh_value: boolean; // Indica se é uma conversão de alto valor (> 1000 USD)
}