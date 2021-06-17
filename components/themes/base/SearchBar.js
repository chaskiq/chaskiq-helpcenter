import React, {useEffect, useState} from 'react'

import graphql from '../../../client/client'
import { SEARCH_ARTICLES } from '../../../client/queries'
import List, { ListItem, ListItemText } from './List'

import { useRouter } from 'next/router'
import useDebounce from '../../../hooks/useDebounce'

export default function CustomizedInputBase({
  lang,
  subdomain,
  settings,
}) {
  const [results, setResults] = React.useState([])
  const [anchorEl, setAnchorEl] = React.useState(null)
	const [searchTerm, setSearchTerm] = React.useState("");
	const [isSearching, setIsSearching] = React.useState(false);

	const router = useRouter()

	const debouncedSearchTerm = useDebounce(searchTerm, 200);

	 // Effect for API call
	 useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        search(debouncedSearchTerm)
      } else {
        setResults([]);
        setIsSearching(false);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );


  async function search(term) {
    const res = await graphql(
      SEARCH_ARTICLES,
      {
        domain: subdomain,
        term: term,
        lang: lang,
        page: 1,
      }
    )
		const {data} = await res.json()
		// console.log("DATa", data.helpCenter)
		setResults(data.helpCenter.search.collection)
		setIsSearching(false);
  }

  function handleReturn(e) {
    e.persist()
    // console.log(e.key)
    if (e.key === 'Enter') {
      // e.preventDefault()
      search(e.target.value)
      setAnchorEl(anchorEl ? null : e.target)
    }
  }

  return (
    <div className="flex justify-center">
      <div className="w-full lg:w-4/5 mt-2 mb-4">
        <p
          className={
            'py-3 text-left text-2xl lg:text-3xl leading-9 font-light text-gray-100 md:mx-24-'
          }
        >
          {settings.siteDescription}
        </p>

        <div className="relative">
          {
						!isSearching && 
						<svg
							className="absolute top-0 ml-4 mt-2 lg:mt-2 lg:ml-3 w-8 h-6 text-gray-600"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<circle cx="11" cy="11" r="8"></circle>
							<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
						</svg>
					}

					{
						isSearching && 
						<svg class="animate-spin text-black 
							absolute top-0 ml-4 mt-2 lg:mt-2 lg:ml-3 w-8 h-6" 
							xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
					}

          <input
            className="text-1xl lg:text-1xl placeholder-gray-600 text-gray-800 pb-2 pt-2 pl-20 pr-2 rounded  w-full border-b-4 focus:outline-none focus:border-blue-800"
            type="text"
            placeholder="Search in articles"
            onKeyPress={handleReturn}
						onChange={(e) => setSearchTerm(e.target.value)}
          />

          {results && results.length > 0 &&  (
            <div className="absolute w-full z-50">
              <List>
                {results.map((o) => (
                  <ListItem key={`search-result-${o.slug}`}>
                    <ListItemText
                      primary={
                        <a
                          onClick={() => {
														setResults([])
														router.push(`/${lang}/articles/${o.slug}`)
													}}
                          href={'#'}
                        >
                          {o.title}
                        </a>
                      }
                      // secondary={'sks'}
                    />
                  </ListItem>
                ))}
              </List>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}