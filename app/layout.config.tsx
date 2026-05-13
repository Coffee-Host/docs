import { type DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import { type HomeLayoutProps } from "fumadocs-ui/layouts/home";
import { pageTree } from "@/app/source";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

// shared configuration
export const baseOptions: BaseLayoutProps = {
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
