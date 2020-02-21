const fetch = require('node-fetch')

// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
const query = `
query ($id: Int) { 
  Media (id: $id, type: MANGA) { 
    id
    title {
      romaji
      english
      native
    }
  }
}
`

// Define our query variables and values that will be used in the query request
const variables = {
    id: 46765
};

// Define the config we'll need for our Api request
const url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };

fetch(url, options).then(handleResponse)
    .then(handleData)
    .catch(handleError);

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(data) {
    console.log(data.data);
}

function handleError(error) {
    alert('Error, check console');
    console.error(error);
}