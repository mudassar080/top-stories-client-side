import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Grid, Typography, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import './App.css';

function App() {

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize as true to show the loader initially

  useEffect(() => {
    async function fetchStories() {
      try {
        const response = await axios.get('http://localhost:5000/api/topstories');
        setStories(response.data.results);
        setLoading(false); // Set loading to false when data is loaded

      } catch (error) {
        console.error("Error fetching the stories:", error);
      }
    }

    fetchStories();
  }, []);

  const placeholderImage = "https://via.placeholder.com/150";


  return (
    <Container style={{ paddingBottom: '5rem' }}>
      <Typography variant="h3" gutterBottom align="center" style={{ marginTop: '20px' }}>
        NYT Top Stories
      </Typography>
      {loading ? ( // Show loader when loading is true
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={3}>
          {stories.map((story) => (
            <Grid item key={story.url} xs={12} sm={6} md={3}>
              <a href={story.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <Card elevation={3} sx={{ height: '100%', borderRadius: '15px', transition: '0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={story.multimedia ? story.multimedia[0]?.url : placeholderImage}
                    alt={story.title}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2, // Number of lines to show (2 lines)
                      WebkitBoxOrient: 'vertical',
                      lineHeight: '1.2rem', // Adjust as needed for line height
                      maxHeight: '2.4rem',  // 2 lines * 1.2rem (line height)
                    }}>
                      {story.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3, // Number of lines to show
                      WebkitBoxOrient: 'vertical',
                      lineHeight: '1.2rem', // Adjust as needed for line height
                      maxHeight: '3.6rem',  // 3 lines * 1.2rem (line height)
                    }} >
                      {story.abstract}
                    </Typography>
                  </CardContent>
                </Card>
              </a>
            </Grid>
          ))}
        </Grid>)}
    </Container>
  );
}

export default App;
