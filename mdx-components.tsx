import type { MDXComponents } from "mdx/types";
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import defaultComponents from "fumadocs-ui/mdx";

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...defaultComponents,
		...components,
		img: (props) => <ImageZoom {...(props as any)} />,
	};
}
