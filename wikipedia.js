let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");
let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");
let startIndex = 0;
let endIndex = 5;

//used to dislpay each item in the search_results
function createAndAppendSearchResult(result) {
    //by using object distructuring geting every values(mentioned by server) in each object i.e result 
    let {
        title,
        link,
        description
    } = result;

    //1.Div container----result-item
    let resultItemElement = document.createElement("div");
    resultItemElement.classList.add("result-item");
    searchResultsEl.appendChild(resultItemElement);

    //2.Anchor Title-----result-title
    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = title;
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";
    resultItemElement.appendChild(resultTitleEl);

    //3.Title Break
    let titleBreakElement = document.createElement("br");
    resultItemElement.appendChild(titleBreakElement);

    //4.Anchor URL-------result-url
    let urlElement = document.createElement("a");
    urlElement.classList.add("result-url");
    urlElement.href = link;
    urlElement.target = "_blank";
    urlElement.textContent = link;
    resultItemElement.appendChild(urlElement);

    //5.Line break
    let lineBreakElement = document.createElement("br");
    resultItemElement.appendChild(lineBreakElement);

    //6.Paragraph Element----line-description
    let descriptonElement = document.createElement("p");
    descriptonElement.classList.add("line-description");
    descriptonElement.textContent = description;
    resultItemElement.appendChild(descriptonElement);
}

/*gets each result from Object search_results(Object)*/
function displayResults(search_results) {
    searchResultsEl.textContent = "";
    nextBtn.classList.remove("d-none");
    prevBtn.classList.remove("d-none");
    //spineer the search icon 
    for (let result of search_results) { //iterating each object 
        createAndAppendSearchResult(result);
    }
}

function spliceTheObject(search_results) {
    let length = search_results.length;
    console.log(length);

    displayResults(search_results.slice(startIndex, endIndex));
    nextBtn.addEventListener("click", function() {
        startIndex = startIndex + 5;
        endIndex = endIndex + 5;
        if (endIndex <= length) {
            displayResults(search_results.slice(startIndex, endIndex));
        } else {
            nextBtn.classList.add("d-none");
        }
    });
    prevBtn.addEventListener("click", function() {
        startIndex = startIndex - 5;
        endIndex = endIndex - 5;
        if (startIndex >= 0) {
            displayResults(search_results.slice(startIndex, endIndex));
        } else {
            prevBtn.classList.add("d-none");
        }
    });
}
/*gets input given by the user after enter click*/
function searchWikipedia(event) {
    if (event.key === 'Enter') {
        searchResultsEl.textContent = "";
        spinnerEl.classList.remove('d-none');
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET" //getmethod gets data from the url
        };
        fetch(url, options)
            .then(function(response) {
                return response.json(); //parses the response as JSON
            })
            .then(function(jsonData) {
                let {
                    search_results //this is the object given by the server known using console 
                } = jsonData; //by using object distructuring the value of jsonData contains search-results
                spinnerEl.classList.add('d-none');
                spliceTheObject(search_results);
            });
    }
}


searchInputEl.addEventListener("keydown", searchWikipedia);