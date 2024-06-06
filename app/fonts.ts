
// all fonts from google fonts
import { Inter, Roboto_Mono, Raleway, Playfair_Display, Cinzel, Cinzel_Decorative } from 'next/font/google'
 
export const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
})
 
export const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
})

export const cinzel = Cinzel({
    subsets: ['latin'],
    display: 'swap',
})

  export const cinzelDecor = Cinzel_Decorative(  {  
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap'
} )