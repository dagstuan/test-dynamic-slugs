import { sanityFetch } from "@/sanity/lib/live";
import { slugsByTypeQuery } from "@/sanity/lib/queries";
import { langs } from "./langs";

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: slugsByTypeQuery,
    params: {type: 'page'},
    stega: false,
    perspective: 'published',
  })

  return langs
    .map((lang) => {
      return data.map((slug) => ({
        lang,
        slug: [slug.slug],
      }))
    })
    .flat()
}

export default async function Layout({children}: {children: React.ReactNode}) {
  return children;
}