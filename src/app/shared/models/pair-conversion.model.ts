export interface ConversionData {
    from?: string | null | undefined,
    to?: string | null | undefined,
    value?: number | null | undefined,
    conversion_rate: number | null | undefined,
	conversion_result: number | null | undefined
}

export interface ConversionRequest {
    from: string | null | undefined,
    to: string | null | undefined,
    value: number | null | undefined,
}

export interface ConversionResult {
    conversion_rate: number | null | undefined,
	conversion_result: number | null | undefined
}