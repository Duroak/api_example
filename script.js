let searchUrl='https://developer.github.com/users/:username/repos'

function formatQuery(parameters) { 
    const queryItems = Object.keys(parameters).map(key => `${key}=${parameters[key]}`)
    return queryItems.join('&');
}

function results(responseJson, maxResults) {
    console.log(responseJson);
    $('#result-list').empty();

}

function getProfile(query, maxResults=10) {
    const parameters = {
        q: query,
        type: "all",
        sort: "full_name",
        direction: "asc",
    };

    const queryUrl = formatQuery(parameters)
    
    const url = searchUrl + '?' + queryUrl;  
    
    console.log(url);

    fetch(url)
        .then(response => response.json())
        .then(responseJson => console.log(responseJson));
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
