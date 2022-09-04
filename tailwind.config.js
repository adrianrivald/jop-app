/** @type {import('tailwindcss').Config} */ 
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        screens: {
          'sm': '640px',
          // => @media (min-width: 640px) { ... }
    
          'md': '768px',
          // => @media (min-width: 768px) { ... }
    
          'lg': '1024px',
          // => @media (min-width: 1024px) { ... }
    
          'xl': '1280px',
          // => @media (min-width: 1280px) { ... }
    
          '2xl': '1536px',
          // => @media (min-width: 1536px) { ... }
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            'white': '#ffffff',
            'black': '#000000',
            'flora': '#1EBD73',
            'leaf': '#185545',
            'cloud': '#A5D2D7',
            'sun': '#FD8E19',
            'seed': '#FBF196',
            'air': '#FBF196',
            'coal': '#332919',
            'earth': '#A7A29A',
            'bgrey': '#F2F5F7',
            'soil': '#8C763F',
            'sky': '#0D99FF',
            'red': '#7f1d1d',
            'brown': '#8C763F',

          },
          fontSize: {
            'xxs': '.563rem',
            'xs': '.75rem',
            'sm': '.875rem',
            'base': '1rem',
            'lg': '1.125rem',
            'xl': '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem',
            '6xl': '4rem',
            '7xl': '5rem',
          },
          extend: {
            zIndex: {
              '99': '99',
            }
          }
      },
    plugins: [],
  }