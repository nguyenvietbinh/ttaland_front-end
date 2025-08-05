'use client'
import { useTownhouses } from './useTownhouses'
import { useVillas } from './useVillas'
import { useApartments } from './useApartments'
import { useLand } from './useLand'

// Custom hooks for rental properties (for_sale: false)
export const useRentalTownhouses = () => {
  return useTownhouses({ for_sale: false })
}

export const useRentalVillas = () => {
  return useVillas({ for_sale: false })
}

export const useRentalApartments = () => {
  return useApartments({ for_sale: false })
}

export const useRentalLand = () => {
  return useLand({ for_sale: false })
}

// Custom hooks for sale properties (for_sale: true) - for clarity
export const useSaleTownhouses = () => {
  return useTownhouses({ for_sale: true })
}

export const useSaleVillas = () => {
  return useVillas({ for_sale: true })
}

export const useSaleApartments = () => {
  return useApartments({ for_sale: true })
}

export const useSaleLand = () => {
  return useLand({ for_sale: true })
}
