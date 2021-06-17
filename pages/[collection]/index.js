import Layout from '../../components/themes/base/Layout'

import {
  ARTICLE_SETTINGS,
	ARTICLE_COLLECTION_WITH_SECTIONS,
} from '../../client/queries'

import client from '../../client/client'
import Link from 'next/link'
import Breadcrumbs from '../../components/themes/base/BreadCrumbs'
import Avatar from '../../components/themes/base/Avatar'
import List, {ListItem, ListItemText} from '../../components/themes/base/List'
import Tooltip from 'rc-tooltip'

//import translation from './translation'
import Moment from 'react-moment'
import styled from '@emotion/styled'

// interference poc
const OverlapAvatars = styled.div`
  margin-right: 1em;

  ul.avatars {
    display: flex; /* Causes LI items to display in row. */
    list-style-type: none;
    margin: auto; /* Centers vertically / horizontally in flex container. */
    padding: 0px 7px 0px 0px;
    z-index: 1; /* Sets up new stack-container. */
  }
  li.avatars__item {
    width: 24px; /* Forces flex items to be smaller than their contents. */
  }

  li.avatars__item:nth-of-type(1) {
    z-index: 9;
  }
  li.avatars__item:nth-of-type(2) {
    z-index: 8;
  }
  li.avatars__item:nth-of-type(3) {
    z-index: 7;
  }
  li.avatars__item:nth-of-type(4) {
    z-index: 6;
  }
  li.avatars__item:nth-of-type(5) {
    z-index: 5;
  }
  li.avatars__item:nth-of-type(6) {
    z-index: 4;
  }
  li.avatars__item:nth-of-type(7) {
    z-index: 3;
  }
  li.avatars__item:nth-of-type(8) {
    z-index: 2;
  }
  li.avatars__item:nth-of-type(9) {
    z-index: 1;
  }

  img.avatars__img,
  span.avatars__initials,
  span.avatars__others {
    background-color: #596376;
    border: 2px solid #1f2532;
    border-radius: 100px 100px 100px 100px;
    color: #ffffff;
    display: block;
    font-family: sans-serif;
    font-size: 12px;
    font-weight: 100;
    height: 33px;
    line-height: 29px;
    text-align: center;
    width: 33px;
  }
  span.avatars__others {
    background-color: #1e8fe1;
  }
`

export default function Collection({collection, site}){

	function translation(str){
		return str || '---'
	}

  function renderArticles(article, section) {
    return (
      <ListItem divider key={`${section}-${article.id}`}>
        <ListItemText
          cols={1}
          primary={
            <div className="flex flex-col">
							<Link href={`/${collection.slug}/${article.slug}`}>
              <a
                className="text-lg mb-2 leading-6 font-bold text-gray-900"
                color={'primary'}
              >
                {translation(article.title)}
              </a>
							</Link>

              <div className="flex items-center">
                <Avatar
                  size={10}
                  alt={article.author.displayName}
                  src={article.author.avatarUrl}
                />
                <div className="space-y-1">
                  {article.author.displayName && (
                    <p className="ml-1.5 text-xs font-light text-gray-400">
                      Written by{' '}
                      <strong className="text-gray-800 font-semibold">
                        {article.author.displayName}
                      </strong>
                    </p>
                  )}
                  {article.updatedAt && (
                    <p className="ml-1.5 text-xs font-light text-gray-400">
                      Updated <Moment fromNow>{article.updatedAt}</Moment>
                    </p>
                  )}
                </div>
              </div>
            </div>
          }
          secondary={
            <p className="py-2 font-md text-gray-500 font-light">
              {article.description}
            </p>
          }
        />
      </ListItem>
    )
  }

	if(!collection) return <p>loading...</p>

  return (
		<Layout site={site} >
			<div className="flex flex-row justify-center items-baseline bg-gray-100 py-8 w-full">
				{collection && (
					<div className="lg:w-3/4 w-full mx-3 md:mx-64">
						<Breadcrumbs
							aria-label="Breadcrumb"
							breadcrumbs={[
								{ to: '/', title: 'Collections' },
								{ title: translation(collection.title) },
							]}
						></Breadcrumbs>

						<div className="my-4 py-4 md:py-8 bg-gray-200 md:px-8 px-3 rounded-sm">
							<div>
								<p className="py-4 mt-2 text-2xl lg:text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-6xl sm:leading-10">
									{translation(collection.title)}
								</p>

								<p className="py-4 max-w-2xl text-xl leading-7 text-gray-500">
									{collection.description}
								</p>

								<div className="flex items-center justify-end">
									<OverlapAvatars>
										<ul className="avatars">
											{collection.authors &&
												collection.authors.map((o) => {
													return (
														<li key={`authors-${o.id}`} className="avatars__item">
															<Tooltip
																placement="bottom"
																overlay={o.display_name}
															>
																<Avatar alt={o.displayName} src={o.avatarUrl} />
															</Tooltip>
														</li>
													)
												})}

											{collection.authors && collection.authors.length > 5 ? (
												<li className="avatars__item">
													<span className="avatars__others">+3</span>
												</li>
											) : null}
										</ul>
									</OverlapAvatars>

									{collection.baseArticles.length > 0 && (
										<p className="max-w-2xl text-md leading-7 text-gray-500">
											{collection.baseArticles.length} articles in this
											collection
										</p>
									)}
								</div>

								<div className="py-4">
									<List>
										{collection.baseArticles.map((article) =>
											renderArticles(article, 'articles-base')
										)}
									</List>
								</div>

								{collection.sections.map((section) => (
									<div key={`sections-${section.id}`}>
										<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
											{translation(section.title)}
										</p>

										<p className="mt-2 mb-4 text-md leading-7 text-gray-500 lg:mx-auto">
											{section.articles.length} articles in this section
										</p>

										{section.articles.length > 0 ? (
											<div>
												<List>
													{section.articles.map((article) =>
														renderArticles(article, 'section-articles')
													)}
												</List>
											</div>
										) : null}
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		</Layout>
	)
}

export async function getStaticProps({params: {collection}, locales, locale, defaultLocale}) {

	const siteRes = await client(ARTICLE_SETTINGS, {"domain":process.env.SITE})
  const site = await siteRes.json()

	const articleRes = await client(ARTICLE_COLLECTION_WITH_SECTIONS, 
    {"domain":process.env.SITE,"id": collection,"lang": locale }
  )
  const {data} = await articleRes.json()

	// console.log(params)

	return {
		props: { 
			site,
			collection: data.helpCenter.collection
		}, // will be passed to the page component as props
    revalidate: 60,
	}
}

export async function getStaticPaths(slug, b) {
  return {
    paths: [
      //{ params: { ... } } // See the "paths" section below
    ],
    fallback: true //or false // See the "fallback" section below
  };
}