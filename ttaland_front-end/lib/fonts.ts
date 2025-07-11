import localFont from 'next/font/local';

export const myCustomFont = localFont({
  src: '../public/fonts/MyFont.ttf',
  display: 'swap',
  variable: '--font-my-custom' // (tùy chọn) để sử dụng CSS variable
});