import {sanityFetch} from '@/sanity/lib/live'
import {pagesBySlugQuery, slugsByTypeQuery} from '@/sanity/lib/queries'
import type {Metadata, ResolvingMetadata} from 'next'
import {toPlainText} from 'next-sanity'
import dynamic from 'next/dynamic'

const PageContent = dynamic(() => import('./pageContent').then((mod) => mod.PageContent))

type Props = {
  params: Promise<{slug: string}>
}

export async function generateMetadata(
  {params}: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const {data: page} = await sanityFetch({
    query: pagesBySlugQuery,
    params,
    stega: false,
  })

  return {
    title: page?.title,
    description: page?.overview ? toPlainText(page.overview) : (await parent).description,
  }
}

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: slugsByTypeQuery,
    params: {type: 'page'},
    stega: false,
    perspective: 'published',
  })
  return data
}

export default async function PageSlugRoute({params}: Props) {
  return <PageContent params={params} />
}
