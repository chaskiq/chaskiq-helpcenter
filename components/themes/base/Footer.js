export default function Footer({settings}){
	return (
		<footer className={'py-8'}>
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

			{
				!(!settings.facebook && !settings.twitter && !settings.linkedin) &&
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
			}

			<MadeWithLove />
			</footer>
		)
}


function MadeWithLove() {
  return (
    <p className="text-center text-xs leading-5 text-gray-400">
      {'powered by '}
      <a href="https://chaskiq.io/">Chaskiq</a>
    </p>
  )
}
