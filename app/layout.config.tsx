import { type DocsLayoutProps } from "fumadocs-ui/layout";
import { type HomeLayoutProps } from "fumadocs-ui/home-layout";
import { pageTree } from "@/app/source";
import type { BaseLayoutProps } from 'fumadocs-ui/layout';

// shared configuration
export const baseOptions: HomeLayoutProps & BaseLayoutProps = {
  nav: {
    // 使用 Logo 並設定其連結
    title: <div><img src="https://cdn.coffeehost.net/logo-black.png" width="50%"/></div>,
    url: '/docs',
  },
};

// docs layout configuration
export const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: pageTree,
};
