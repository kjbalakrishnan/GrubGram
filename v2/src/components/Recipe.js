import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import RecipeContent from "./RecipeContent";

export default function Recipe({ recipe }) {
  if (!recipe) return;
  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant="h6">
          {recipe.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ mt: -1 }}>
        <RecipeContent recipe={recipe} />
      </AccordionDetails>
    </Accordion>
  );
}