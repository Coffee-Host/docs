import { docs, meta } from "@/.source/server";
import { loader } from "fumadocs-core/source";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import { icons } from "lucide-react";
import { createElement } from "react";

export const utils = loader({
	baseUrl: "/docs",
	source: toFumadocsSource(docs, meta),
	icon(icon) {
		if (!icon) {
			// You may set a default icon
			return;
		}

		if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
	},
});

export const { getPage, getPages, pageTree } = utils;

import type { InferPageType } from "fumadocs-core/source";
export type Page = InferPageType<typeof utils>;
