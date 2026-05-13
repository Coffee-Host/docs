import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import { zhTWTranslations } from '@/lib/i18n';

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="zh-TW" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <RootProvider i18n={{ translations: zhTWTranslations }}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
