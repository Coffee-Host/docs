import defaultMdxComponents from "fumadocs-ui/mdx";
import { Edit } from "lucide-react";
import { getPage, getPages } from "@/app/source";
import type { Metadata } from "next";
import { DocsPage, DocsBody } from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { cn } from "@/app/utils/cn";
import { buttonVariants } from "@/app/components/ui/button";
import { Card, Cards } from "fumadocs-ui/components/card";
import { utils, type Page } from "@/app/source";

export default async function Page(props: {
	params: Promise<{ slug?: string[] }>;
}) {
	const params = await props.params;
	const page = getPage(params.slug);

	if (page == null) {
		notFound();
	}

	const MDX = page.data.body;

	const footer = (
		<a
			href={`https://github.com/Coffee-Host/docs/blob/main/content/docs/${page.path || ''}`}
			target="_blank"
			rel="noreferrer noopener"
			className={cn(
				buttonVariants({
					variant: "secondary",
					size: "sm",
					className: "text-xs gap-1.5",
				})
			)}
		>
			<Edit className="size-3" />在 GitHub 上編輯
		</a>
	);

	return (
		<DocsPage
			toc={page.data.toc}
			full={page.data.full}
			tableOfContent={{
				footer,
				enabled: Boolean(page.data.toc?.length),
				style: 'clerk',
			}}
			tableOfContentPopover={{ footer }}
		>
			<DocsBody>
				<h1>{page.data.title}</h1>
				<p className="mb-8 text-lg text-muted-foreground">
					{page.data.description}
				</p>
				<MDX components={{ ...defaultMdxComponents }} />
				{page.slugs.length && (page.path || '').endsWith("index.mdx") ? (
					<Category page={page} />
				) : null}
			</DocsBody>
		</DocsPage>
	);
}

function Category({ page }: { page: Page }): React.ReactElement {
	const filtered = utils
		.getPages()
		.filter((item) => {
			const itemDir = item.slugs.slice(0, -1).join('/');
			const pageDir = page.slugs.slice(0, -1).join('/');
			return itemDir === pageDir && item.url !== page.url;
		});

	return (
		<Cards>
			{filtered.map((item) => (
				<Card
					key={item.url}
					title={item.data.title}
					description={item.data.description ?? "沒有介紹"}
					href={item.url}
				/>
			))}
		</Cards>
	);
}

export async function generateStaticParams() {
	return getPages().map((page) => ({
		slug: page.slugs,
	}));
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
	const params = await props.params;
	const page = getPage(params.slug);

	if (page == null) notFound();

	return {
		title: page.data.title,
		description: page.data.description,
	} satisfies Metadata;
}
