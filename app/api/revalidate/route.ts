import { langs } from "@/app/(personal)/test/[lang]/[[...slug]]/langs";
import { sanityFetch } from "@/sanity/lib/live";
import { slugsByTypeQuery } from "@/sanity/lib/queries";
import { revalidateTag } from "next/cache";

export const GET = async () => {
  revalidateTag("sanity");

  const {data} = await sanityFetch({
      query: slugsByTypeQuery,
      params: {type: 'page'},
      stega: false,
      perspective: 'published',
    })

  const slugs = data.map((slug) => {
    return langs.map((lang) => {
      return `/test/${lang}/${slug.slug}`;
    });
  }).flat();

  slugs.map((slug) => {
    revalidateTag(slug);
  });

  return Response.json({ revalidated: true, slugs });
};