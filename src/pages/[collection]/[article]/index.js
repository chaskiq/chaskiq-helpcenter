"use client";

import { ARTICLE_SETTINGS, ARTICLE } from "../../../client/queries";
import client from "../../../client/client";
import Breadcrumbs from "../../../themes/base/components/BreadCrumbs";
import Avatar from "../../../themes/base/components/Avatar";
import Layout from "../../../themes/base/components/Layout";
import Moment from "react-moment";

import dynamic from 'next/dynamic'
const DanteRenderer = dynamic(
  () => import("../../../themes/base/components/danteRenderer"),
  { ssr: false }
)

function Renderer2(props){
  return <p>momo</p>
}


function Loader({site}) {
  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">

        <div role="status">
          <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span class="sr-only">Loading...</span>
        </div>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          Loading article
        </p>
      </div>
    </div>
  )
}


export default function Article({ article, lang, site }) {
  //console.log(theme)
  if (!article) return <Loader site={site}/>;


  function translation(str) {
    return str || "---";
  }

  return (
    <Layout site={site}>
      <div className="flex flex-row items-center justify-center bg-gray-100 pb-6">
        <div
          className="w-full rounded shadow lg:p-12
					m-2 lg:mx-64 px-2 lg:w-10/12 bg-white p-2"
        >
          {article ? (
            <div className={"text-xs lg:text-sm"}>
              <Breadcrumbs
                aria-label="Breadcrumb"
                breadcrumbs={[
                  { to: `/`, title: "Collections" },
                  {
                    to: `/${article.collection.slug}`,
                    title: translation(article.collection.title),
                  },
                  { title: translation(article.title) },
                ]}
              />

              <div className="py-4">
                <hr variant="middle" />
              </div>

              <div className="p-4">
                <p className="py-4 mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl sm:leading-10">
                  {translation(article.title)}
                </p>

                <div className="flex flex-row items-center py-2">
                  <Avatar
                    size={"medium"}
                    alt={article.author.name}
                    src={article.author.avatarUrl}
                  />

                  <div className={"ml-2"}>
                    {article.author.name && (
                      <p className="text-md leading-6 font-light text-gray-900">
                        Written by{" "}
                        <span className="font-semibold">
                          {article.author.name}
                        </span>
                      </p>
                    )}

                    <p className="text-md leading-6 font-light text-gray-500">
                      {"updated "}
                      <Moment fromNow>{article.updatedAt}</Moment>
                    </p>
                  </div>
                </div>
              </div>

              <div className="prose--nonon">
                <DanteRenderer 
                  domain={process.env.HOST}
                  raw={JSON.parse(article.content.serialized_content)}/>
              </div>

              <dl className="mt-12 flex border-t border-slate-200 pt-6 dark:border-slate-800">
                {article.prevArticleUrl && (
                  <div>
                    <dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
                      Previous
                    </dt>
                    <dd className="mt-1">
                      <a
                        passHref
                        className="text-md dark:text-gray-100 dark:hover:text-gray-400 text-gray-600 hover:text-gray-700 focus:outline-none focus:underline transition duration-150 ease-in-out"
                        href={article.prevArticleUrl.slug}
                      >
                        <span>
                          <span aria-hidden="true">←</span>{' '}
                          {article.prevArticleUrl.title}
                        </span>
                      </a>
                    </dd>
                  </div>
                )}

                {article.nextArticleUrl && (
                  <div className="ml-auto text-right">
                    <dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
                      Next
                    </dt>
                    <dd className="mt-1">
                      <a
                        passHref
                        className="text-md dark:text-gray-100 dark:hover:text-gray-400 text-gray-600 hover:text-gray-700 focus:outline-none focus:underline transition duration-150 ease-in-out"
                        href={article.nextArticleUrl.slug}
                      >
                        <span>
                          {article.nextArticleUrl.title}{' '}
                          <span aria-hidden="true">→</span>
                        </span>
                      </a>
                    </dd>
                  </div>
                )}
              </dl>

              {/*<div dangerouslySetInnerHTML={
								{__html: article.content.html_content}
							}/>*/}
            </div>
          ) : null}

          
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({
  params: { collection, article },
  locale,
}) {
  const siteRes = await client(ARTICLE_SETTINGS, {
    domain: process.env.SITE,
  });
  const site = await siteRes.json();

  const articleRes = await client(ARTICLE, {
    domain: process.env.SITE,
    id: article,
    lang: locale,
  });
  const { data } = await articleRes.json();

  return {
    props: {
      lang: locale,
      site: site,
      article: data.helpCenter.article,
    }, // will be passed to the page component as props
    revalidate: 60,
  };
}

export async function getStaticPaths(slug, b) {
  return {
    paths: [
      //{ params: { ... } } // See the "paths" section below
    ],
    fallback: true, //or false // See the "fallback" section below
  };
}
