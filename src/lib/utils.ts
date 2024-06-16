import { type ClassValue, clsx } from 'clsx'
import { Metadata } from 'next'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  })

  return formatter.format(price)
}

export function constructMetadata({
  title = 'CoqueMoi - custom high-quality phone cases',
  description = 'Create custom high-quality phone cases in seconds',
  image = '/oui.png',
  icons = '/bobicon.png',
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@Arrivant',
    },
    icons,
    metadataBase: new URL(" ")  //adresse vercel
  }
}