export default function Footer({ settings }) {
  return (
    <footer className={"py-8"}>
      {settings.siteTitle && (
        <p className="mt-2 leading-6 text-gray-500 text-center">
          {settings.siteTitle}
        </p>
      )}

      {settings.siteDescription && (
        <p className="mt-2 text-sm text-gray-400 text-center">
          {settings.siteDescription}
        </p>
      )}

      {!(!settings.facebook && !settings.twitter && !settings.linkedin) && (
        <div className="py-8 flex flex-row justify-evenly items-baseline text-gray-500">
          {settings.facebook && (
            <a href={`http://facebook.com/${settings.facebook}`}>
              <Facebook />
            </a>
          )}

          {settings.twitter && (
            <a href={`http://twitter.com/${settings.twitter}`}>
              <Twitter />
            </a>
          )}

          {settings.linkedin && (
            <a href={`http://instagram.com/${settings.linkedin}`}>
              <LinkedIn />
            </a>
          )}
        </div>
      )}

      <MadeWithLove />
    </footer>
  );
}

function MadeWithLove() {
  return (
    <p className="text-center text-xs leading-5 text-gray-400">
      {"powered by "}
      <a href="https://chaskiq.io/">Chaskiq</a>
    </p>
  );
}

export function Twitter() {
  return (
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAA1VBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwim1yAAAARnRSTlMAYKLxHvkFAQj4B8hr/hqhtrpdEzipDvZqHGmsjSqg41Y3kehCdRjhA610+qb93khxmuLNj7cRBqvUmcOuIpuli0xGLJY0q8c7yQAAALBJREFUKM+9kMUSwzAMRN1Aww2VmZmZufr/T2oa2+N4ptd2L7LeeuWxEPqZ4l9poizCuNVt92O4F1RccxX4qDPq4dwGVuvwkAKsxrAZ9ooI80lQdY0YAzIJLYNmN60lCQeDvqk6wMklXJl5C86waWLPByBPDf3IcUuihpK4GRGjwH58iQbkEjPUp8YMk9uSf6W8yODjdTddC+NMNnL7ZNNBsiDx6/a9s3PY1qtp9F+9AW43MRppUcggAAAAAElFTkSuQmCC" />
  );
}

export function Facebook() {
  return (
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAb1BMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG8BLSAAAAJHRSTlMA4ECu3cwSGtkRARAV+tAMKSMEKBYgN0X26qzpBu6g3EZ5+UQHHxrPAAAAZ0lEQVQoz2NgoASIykmrKMmKYYgLSqqAABOGhJQKdgkhCaCoooIyJ7qECFCcEZvV7EAJDgxRLk5OAaCEPCcnpwyKBJsKHIjjkhDGJcGPIsHNwsIIFORlYeEj0lVDT4KHlZWVmZKUAQBitQ6lQZnCdQAAAABJRU5ErkJggg==" />
  );
}

export function LinkedIn() {
  return (
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAnFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADKMLGMAAAAM3RSTlMAM+7dafcYzAjHiWUwrizZl1kHEQHKxsmVTGTaFoeh7/xLa+uDFwKz+f5ncUZA5SZEKuA1suPLAAAAhElEQVQoz63SSRaCQBAD0DStgig0oOIsivM85P53cwHvKW3tJMv8XaqAWhM7rMSERd+3ejIowLN7tj8wHI9kmGAmwzTfy7DWLx61zpaOBQ202ARWWzxvEuzuwFmCEx+4SuCzg+6fMFcXHpRacKPiCohbJT+QlvcwNkQlhIH7nUHUq/cR3mYjLaekCGDJAAAAAElFTkSuQmCC" />
  );
}
