let searchUrl1='https://api.github.com/users/';
let searchUrl2='/repos';

function formatQuery(parameters) { 
    const queryItems = Object.keys(parameters).map(key => `${key}=${parameters[key]}`)
    return queryItems.join('&');
}

function results(responseJson, maxResults) {
    console.log(responseJson);
    $('#result-list').empty();

}

function getProfile(searchName, maxResults=10) {
    const parameters = {
        type: "all",
        sort: "full_name",
        direction: "asc",
    };

    const queryUrl = formatQuery(parameters);
    
    const url = searchUrl1+ searchName + searchUrl2  + '?' + queryUrl;  
    
    console.log(url);

    fetch(url)
    .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => console.log(responseJson, maxResults))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
}

function submitForm() {
    $('#js-form').submit(event => {
        event.preventDefault();
        const searchName = $('#js-search-profile').val();
        const maxResults = $('#js-max-results').val();
        getProfile(searchName, maxResults);
    })
}

$(submitForm);
