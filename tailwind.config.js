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
            'flora': '#1EBD73',
            'leaf': '#185545',
            'cloud': '#A5D2D7',
            'sun': '#FD8E19',
            'seed': '#FBF196',
            'air': '#FBF196',
            'coal': '#332919',
            'earth': '#A7A29A',
          },
      },
    plugins: [],
  }