import React, { useState } from "react";
import "./App.css";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  Paper,
  Box,
  Grid,
  Rating,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  IconButton,
} from "@mui/material";

const App = () => {
  const [dishName, setDishName] = useState("");
  const [timeToPrepare, setTimeToPrepare] = useState("");
  const [difficulty, setDifficulty] = useState(0);
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState(null);
  const [saviorSecret, setSaviorSecret] = useState("");
  const [preview, setPreview] = useState(false);
  const [saved, setSaved] = useState(false);
  const [posts, setPosts] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredientsList, setIngredientsList] = useState([]);

  console.log(ingredientsList);
  const addIngredientToList = () => {
    if (ingredientInput.trim() !== "") {
      setIngredientsList([...ingredientsList, ingredientInput.trim()]);
      setIngredientInput("");
    }
  };

  const removeIngredientFromList = (index) => {
    const newIngredientsList = [...ingredientsList];
    newIngredientsList.splice(index, 1);
    setIngredientsList(newIngredientsList);
  };

  const handleImageUpload = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleSave = () => {
    setPreview(true);
    setSaved(true);
  };

  const handleEdit = () => {
    setPreview(false);
    setSaved(false);
  };

  const handlePost = () => {
    const newPost = {
      dishName,
      timeToPrepare,
      difficulty,
      ingredientsList,
      image,
      saviorSecret,
    };
    setPosts([...posts, newPost]);
    setDishName("");
    setTimeToPrepare("");
    setDifficulty(0);
    setIngredients([]);
    setImage(null);
    setSaviorSecret("");
    setPreview(false);
    setSaved(false);
  };

  return (
    <div className="app">
      <AppBar position="sticky" style={{ backgroundColor: "white" }}>
        <Toolbar>
          <img
            src="https://static.wixstatic.com/media/c19454_13483078c1a04cd5aa4e9e7e619c41aa~mv2.png/v1/fill/w_336,h_61,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Horizontal%20logo.png"
            alt="logo"
            style={{ width: 150 }}
          />
          <Typography variant="subtitle1">Difficulty:</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box my={4}>
          <Typography variant="h4">The Recipe Confession</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} style={{ padding: 16 }}>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    label="Name of the Dish"
                    value={dishName}
                    onChange={(e) => setDishName(e.target.value)}
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    label="Time to Prepare"
                    type="time"
                    value={timeToPrepare}
                    onChange={(e) => setTimeToPrepare(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>
                <Box mb={2}>
                  <Typography variant="subtitle1">Difficulty:</Typography>
                  <Rating
                    name="difficulty"
                    value={difficulty}
                    onChange={(event, newValue) => {
                      setDifficulty(newValue);
                    }}
                  />
                </Box>

                <Box mb={2}>
                  <Typography variant="subtitle1">Ingredients:</Typography>
                  <List>
                    {ingredientsList.map((ingredient, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={ingredient} />
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => removeIngredientFromList(index)}
                        >
                          -
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                  <TextField
                    fullWidth
                    label="Add Ingredient"
                    value={ingredientInput}
                    onChange={(e) => setIngredientInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addIngredientToList();
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={addIngredientToList}>
                            +
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box mb={2}>
                  <Button variant="contained" component="label">
                    Upload Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </Button>
                  {image && (
                    <Box mt={2}>
                      <img
                        src={image}
                        alt="Uploaded"
                        className="uploaded-image"
                      />
                    </Box>
                  )}
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    label="Instructions"
                    multiline
                    rows={6}
                    value={saviorSecret}
                    onChange={(e) => setSaviorSecret(e.target.value)}
                  />
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  disabled={saved}
                >
                  Save
                </Button>
              </Paper>
            </Grid>
            {preview && (
              <Grid item xs={12} md={6}>
                <Paper elevation={3} style={{ padding: 16 }}>
                  <Typography variant="h4">Dish Name: {dishName}</Typography>

                  {image && (
                    <Box mt={2}>
                      <img
                        src={image}
                        alt="Uploaded"
                        className="uploaded-image"
                      />
                    </Box>
                  )}
                  <Typography variant="body1">
                    Time to Prepare: {timeToPrepare}
                  </Typography>
                  <Typography variant="body1">
                    Difficulty:
                    <Rating name="previewRating" value={difficulty} readOnly />
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Ingredients:{" "}
                    {ingredientsList.map((ingredient, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={ingredient} />
                      </ListItem>
                    ))}
                  </Typography>
                  <Typography variant="body1">
                    Instructions: {saviorSecret}
                  </Typography>
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleEdit}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handlePost}
                      style={{ marginLeft: 16 }}
                    >
                      Post
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Box>
        {posts.length > 0 && (
          <Box my={4}>
            <Typography variant="h4">Recipe Rooms</Typography>
            <Grid container spacing={2}>
              {posts.map((post, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Paper elevation={3} style={{ padding: 16 }}>
                    <Typography variant="h4">Title: {post.dishName}</Typography>

                    {post.image && (
                      <Box mt={2}>
                        <img
                          src={post.image}
                          alt="Uploaded"
                          className="uploaded-image"
                        />
                      </Box>
                    )}
                    <Typography variant="body1">
                      Time to Prepare: {post.timeToPrepare}
                    </Typography>
                    <Typography variant="body1">
                      Difficulty:
                      <Rating
                        name="previewRating"
                        value={post.difficulty}
                        readOnly
                      />
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Ingredients: {post.ingredients}
                    </Typography>
                    <Typography variant="body1">
                      Instructions: {post.saviorSecret}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default App;
