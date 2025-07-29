import { Roboto } from "next/font/google";
import localFont from 'next/font/local';
import '../app/globals.css';

export const roboto = Roboto({ subsets: ['latin'], weight: ['400', '600'] });

export const pusab = localFont({
    src: '../../public/fonts/PUSAB.ttf',
    display: 'swap',
});