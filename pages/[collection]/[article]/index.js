import { ARTICLE_SETTINGS, ARTICLE } from "../../../client/queries";
import client from "../../../client/client";
import Breadcrumbs from "../../../components/themes/base/BreadCrumbs";
import Avatar from "../../../components/themes/base/Avatar";
import Layout from "../../../components/themes/base/Layout";
import Moment from "react-moment";
import DraftRenderer from "../../../components/themes/base/textEditor/draftRenderer";
import theme from "../../../components/themes/base/textEditor/theme";
import Link from 'next/link'

import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";

// import dynamic from 'next/dynamic'
// import EditorContainer from 'Dante2/package/esm/editor/styled/base'
/*const EditorContainer = dynamic(() => import("Dante2/package/esm/editor/styled/base"), {
	ssr: false,
	});
*/

import EditorContainer from "../../../components/themes/base/textEditor/editorContainer";
//console.log("AAAA", EditorContainer)

const NewEditorStyles = styled(EditorContainer)`
  font-size: 1.3em;

  white-space: pre-wrap; /* CSS3 */
  white-space: -moz-pre-wrap; /* Firefox */
  white-space: -pre-wrap; /* Opera <7 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* IE */

  a {
    color: ${(props) => props.theme.mainColor};
  }
`;

export default function Article({ article, lang, site }) {
  //console.log(theme)
  if (!article) return <p>loading ... </p>;

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

              <div className="prose">
                <ThemeProvider theme={theme}>
                  <NewEditorStyles>
                    <DraftRenderer
                      raw={JSON.parse(article.content.serialized_content)}
                    />
                  </NewEditorStyles>
                </ThemeProvider>
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
