import { useState, useEffect } from "react";
import {Container, Box, FormControl, Input, Button, Grid} from "@mui/material"
import Recipe from "./recipe";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');


  const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
  const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY;

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(url);
      const result = await response.json();
      console.log(result.hits[0])
      setRecipes(result.hits);
    };
  
    getData();
  }, [url]);

  
 

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(search);
    // empty the input field after making search
    setSearch('');
  };


  return (
    <Container 
    minHeight="100vh" maxWidth="lg">
      <Box display="flex" flexDirection="column" justifyContent="center"
        alignItems="center">
      <h1>Chefcito</h1>
      <FormControl spacing={2}>
        <Input
          type="text"
          placeholder="Search for recipes"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="submit" className="btn" onClick={handleSubmit}>
          Search
        </Button>
      </FormControl>
      </Box>
     
      <Grid container spacing={3} alignItems="stretch">
        {recipes !== [] &&
          recipes.map((recipe, idx) => (
            <Grid item xs={12} sm={4} key={idx}>
            <Recipe
              key={recipe.recipe.calories}
              label={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              url={recipe.recipe.url}
              ingredients={recipe.recipe.ingredients}
              mealType={recipe.recipe.mealType}
            />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
