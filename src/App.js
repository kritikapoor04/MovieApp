import Axios from "axios";
import React,{ useState } from "react";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";

export const API_KEY = "d5e9775f";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  `;

  const Header= styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: black;
  color: white;
  padding: 7px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
  align-items: centre; 
  `;
  

const AppName = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`;

const SearchIcon = styled.img`
  width: 50px;
  height: 50px;
`;
const MovieImage = styled.img`
  width: 60px;
  height: 60px;
  margin: 15px;
  align-items: centre; 
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px 5px;
  border-radius: 6px;
  margin-left: 20px;
  width: 40%;
  background-color: white;
  align-items: centre; 
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;


function App() {
  const [searchQuery, updateSearchQuery] = useState("");
  const [timeoutId, updateTiimeoutId]= useState();
  const [movieList, updateMovieList]= useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  
  const fetchData = async (searchQuery) => {
    const response= await Axios.get(
      `https://www.omdbapi.com/?s=${searchQuery}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
  };
  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(()=> fetchData(event.target.value),500);
    updateTiimeoutId(timeout);
  };
  return (
  <Container>
    <Header>
      <AppName>
        <MovieImage src="/movie-icon.jpeg" />
        FLIPR MOVIES
      </AppName>
      <SearchBox>
        <SearchIcon src="/search-icon.svg" />
        <SearchInput 
          placeholder="Search Movie Name" 
          value={searchQuery}
          onChange={onTextChange}
         />
      </SearchBox>
      <h3><a href="">My Favourites</a></h3>
    </Header>
   
    {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
    <MovieListContainer>
    
     
        {movieList?.length ? (
        movieList.map((movie,index) =>( 
        <MovieComponent key={index} movie={movie} onMovieSelect={onMovieSelect}/>
        ))
  
       ) : ( 
         <h3>Please enter the Movie you want to search</h3>
         )}


    </MovieListContainer>
  </Container>
  );

}

export default App;
