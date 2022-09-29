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
            'xxs': '.563rem', // 9px
            'xs': '.75rem', // 12px
            'sm': '.875rem', // 14px
            'base': '1rem', // 16px
            'lg': '1.125rem', // 18px
            'xl': '1.25rem', // 20px
            '2xl': '1.5rem', // 24px
            '3xl': '1.875rem', // 30px
            '4xl': '2.25rem', // 36px
            '5xl': '3rem', // 48px
            '6xl': '4rem', // 60px
            '7xl': '5rem', // 72px
          },
          extend: {
            zIndex: {
              '99': '99',
            },
            translate: {
              '0.25': '0.25rem',
              '7': '7rem',
              '13.75': '13.75rem',
              '20.5': '20.5rem',
            }
          }
      },
    plugins: [],
  }