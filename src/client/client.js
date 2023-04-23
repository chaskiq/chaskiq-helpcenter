export default function client(query, variables){
	return fetch(`${process.env.HOST}/graphql`, {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "authorization": "Bearer null",
      "content-type": "application/json;charset=UTF-8",
    },
    "body": JSON.stringify({
      query: query,
      variables: variables
    }),
    "method": "POST",
    "mode": "cors"
  });
} 