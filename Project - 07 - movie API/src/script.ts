interface MovieResponse {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Genre: string;
    Poster: string;
    Ratings: {
      Source: string;
      Value: string;
    }[];
    imdbID: string;
}

async function fetchData (title:string):Promise<void>{
    try {
        const API_KEY = 'f6ab01ff';
        let response: Response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`);
        let data : MovieResponse = await response.json()
        console.log("fetchData called");
        console.log(data);
        showData(data)
    } catch (error) {
        throw new Error("error");
    }
}

fetchData("Baahubali");

function showData(dataInput : MovieResponse){
    console.log("showdata called");

    // // input selects tag input using getElementsByClassName which returns html collection 
    // htmlCollection dosent have the method value it will work as we have selected the first input tag 
    // so we can perform value method on it but Ts wont give us the suggestion so for telling the Ts compiler this is 
    // an input that can take the valu method we can assign as HTMLInputElement so it acn get the method of it 
    // const input = (document.getElementsByClassName("input")[0] as HTMLInputElement).value.trim();
    // const input : HTMLElement= document.getElementById("input")! // you can use this way too
    
    const input = (document.getElementsByClassName("input")[0] as HTMLInputElement).value.trim();
    const movieResults = document.getElementsByClassName("movie-results")[0]

    
}

