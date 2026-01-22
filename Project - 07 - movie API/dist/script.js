"use strict";
// async function fetchData (title:string):Promise<void>{
//     try {
//         const API_KEY = 'f6ab01ff';
//         let response: Response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`);
//         let data : MovieResponse = await response.json()
//         console.log("fetchData called");
//         console.log(data);
//         // showData(data)
//     } catch (error) {
//         throw new Error("error");
//     }
// }
// fetchData("Baahubali");
// function showData(dataInput : MovieResponse){
//     console.log("showdata called");
//     // // input selects tag input using getElementsByClassName which returns html collection 
//     // htmlCollection dosent have the method value it will work as we have selected the first input tag 
//     // so we can perform value method on it but Ts wont give us the suggestion so for telling the Ts compiler this is 
//     // an input that can take the valu method we can assign as HTMLInputElement so it acn get the method of it 
//     // const input = (document.getElementsByClassName("input")[0] as HTMLInputElement).value.trim();
//     // const input : HTMLElement= document.getElementById("input")! // you can use this way too
//     const input = (document.getElementsByClassName("input")[0] as HTMLInputElement).value.trim();
//     const movieResults = document.getElementsByClassName("movie-results")[0]
// }
// async function fetchMoviesByKeyword(keyword: string): Promise<void> {
//     try {
//         console.log("fetchMoviesByKeyword called");
//         const API_KEY = 'f6ab01ff';
//         const response: Response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${keyword}`);
//         const data = await response.json();
//         if (data.Response === "True") {
//             console.log(data);
//         } else {
//             console.log("No movies found:", data.Error);
//         }
//     } catch (error) {
//         console.error("Error fetching movies:", error);
//     }
// }
// const input = (document.getElementsByClassName("input")[0] as HTMLInputElement).value.trim()
// fetchMoviesByKeyword(input)
const input = document.getElementById("searchInput");
const suggestionList = document.querySelector(".suggestion");
const movieResults = document.querySelector(".movie-results");
async function fetchMoviesByKeyword(keyword) {
    if (!keyword) {
        console.log("!keyword");
        suggestionList.innerHTML = "";
        return;
    }
    const API_KEY = "f6ab01ff";
    const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${keyword}`);
    const data = await response.json();
    suggestionList.innerHTML = "";
    if (data.Response === "True") {
        data.Search.forEach((movie) => {
            const li = document.createElement("li");
            li.textContent = `${movie.Title} (${movie.Year})`;
            // store imdbID
            li.dataset.id = movie.imdbID;
            li.addEventListener("click", () => {
                fetchMovieById(movie.imdbID);
                suggestionList.innerHTML = "";
            });
            suggestionList.appendChild(li);
        });
    }
}
async function fetchMovieById(id) {
    const API_KEY = "f6ab01ff";
    const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);
    const movie = await response.json();
    movieResults.innerHTML = `
        <h2>${movie.Title}</h2>
        <img src="${movie.Poster}" />
        <p><strong>Year:</strong> ${movie.Year}</p>
        <p><strong>Genre:</strong> ${movie.Genre}</p>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
    `;
}
input.addEventListener("input", () => {
    const keyword = input.value.trim();
    fetchMoviesByKeyword(keyword);
});
//# sourceMappingURL=script.js.map