import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export default function Post({ post }) {
  const [url, setUrl] = useState("");
  
  useEffect(() => {
    const getRecipe = async () => {
      const recipeDoc = doc(db, "recipe", post.recipe);
      const docSnap = await getDoc(recipeDoc);
      console.log(docSnap.data().url);
      setUrl(docSnap.data().url);
    }
    
    getRecipe();
  }, []);

  return (
    <Card sx={{ maxWidth: 500, ml: 20, mt: 3 }}>
      <CardHeader
        title={post.name}
        subheader={post.timestamp}
      />
      <CardMedia
        component="img"
        height="250"
        image={post.image}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.caption}
        </Typography>
      </CardContent>
      <CardActions>
          <Button 
            variant="contained"
            onClick={() => {window.open(url, '_blank')}}
          >
            {post.recipe}
          </Button>
      </CardActions>
    </Card>
  );
}