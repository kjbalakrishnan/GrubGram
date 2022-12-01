import { Typography, Autocomplete, Card, CardContent, CardHeader, CardActions, TextField, Button } from '@mui/material';
import { useState, useEffect } from 'react'
import { auth, db } from '../firebase'
import { getDocs, updateDoc, doc, query, collection, where } from 'firebase/firestore'
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import './PantryManager.css';

export default function PantryManager() {
    const [ingredient, setIngredient] = useState("");
    const [user, loading] = useAuthState(auth);
    const [docID, setDocID] = useState("");
    const [docPantry, setDocPantry] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");

        getUser();
    }, [loading, user, navigate]);

    const getUser = async () => {
        try {
            const queryUser = query(collection(db, "users"), where("uid", "==", user?.uid));
            const data = await getDocs(queryUser);
            setDocID(data.docs[0].id);
            const fullData = data.docs[0].data();
            setDocPantry(fullData.pantry);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    const addIngredient = async (id, newPantry, ingredient) => {
        if (newPantry.includes(ingredient)) {
            alert("pantry already contains ingredient")
        }
        else if (ingredient == "") {
            alert("please selct an ingredient to add")
        }
        else {
            newPantry.push(ingredient);
            const userDoc = doc(db, "users", id);
            const newFields = { pantry: newPantry };
            await updateDoc(userDoc, newFields);
        }
        window.location.reload(false);
    }

    const deleteIngredient = async (id, newPantry, ingredient) => {
        if (newPantry.includes(ingredient)) {
            for (var i = 0; i < newPantry.length; i++) {
                if (newPantry[i] == ingredient) {
                    newPantry.splice(i, 1);
                    const userDoc = doc(db, "users", id);
                    const newFields = { pantry: newPantry };
                    await updateDoc(userDoc, newFields);
                    break;
                }
            }
        }
        else {
            alert("pantry does not contain ingredient")
        }
        window.location.reload(false);
    }

    const clearPantry = async (id, newPantry) => {
        if (newPantry.length == 0) {
            alert("pantry is already cleared")
        }
        else {
            newPantry = []
            const userDoc = doc(db, "users", id);
            const newFields = { pantry: newPantry };
            await updateDoc(userDoc, newFields);
        }
        window.location.reload(false);
    }

    return (
        <div>
            <div className="rightcol">
                <Card sx={{ maxWidth: 350, ml: 17, mt: 3 }}>
                    <CardHeader title="Your Pantry:" />
                    <CardContent>
                        {docPantry.map((ingredient) => {
                            return (
                                <Typography>{ingredient}</Typography>
                            );
                        })}
                    </CardContent>
                </Card>
            </div>
            <div className="leftcol">
                <Card sx={{ maxWidth: 350, ml: 20, mt: 3 }}>
                    <CardHeader
                        title="Update Pantry"
                    />
                    <CardContent>
                        <Autocomplete
                            disablePortal
                            id="ingredient-dropdown"
                            options={ingredients}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Ingredient..." />}
                            onChange={(event, value) => setIngredient(value)}
                        />
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="contained"
                            onClick={() => { addIngredient(docID, docPantry, ingredient) }}
                        >
                            Add
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => { deleteIngredient(docID, docPantry, ingredient) }}
                        >
                            Remove
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => { clearPantry(docID, docPantry) }}
                        >
                            Clear Pantry
                        </Button>
                    </CardActions>
                </Card>
            </div>
        </div>
    );
}

const ingredients = [
    "acorn squash",
    "all-purpose flour",
    "allspice",
    "almond",
    "almond extract",
    "american cheese",
    "anchovies",
    "angel hair pasta",
    "apple",
    "apple cider",
    "apple cider vinegar",
    "apple juice",
    "avocados",
    "bacon",
    "bakers german chocolate",
    "baking powder",
    "baking soda",
    "banana",
    "basil",
    "bay leaf",
    "beef bouillon cubes",
    "beer",
    "bell pepper",
    "biscuit mix",
    "biscuit shaped cereal",
    "biscuits",
    "bisquick",
    "bittersweet chocolate",
    "black olives",
    "black pepper",
    "bleu cheese",
    "blueberries",
    "boneless ham",
    "boneless pork shoulder",
    "box confectioners sugar",
    "box frozen broccoli",
    "box long grain and wild rice",
    "bread",
    "bread crumbs",
    "broccoli",
    "broken pretzels",
    "broth",
    "brown sugar",
    "bulk sausage",
    "butter",
    "buttermilk",
    "butterscotch chips",
    "cabbage",
    "cake flour",
    "can crushed pineapple",
    "can diced ro-tel tomatoes",
    "can frozen limeade",
    "can green asparagus",
    "can mushrooms",
    "canadian bacon",
    "candied chopped pineapple",
    "canned chopped green chilies",
    "canned evaporated milk",
    "cans chicken broth",
    "cans cream of mushroom soup",
    "cans mushroom soup",
    "capers",
    "caraway seed",
    "carrots",
    "carton sour cream",
    "cauliflower",
    "celery",
    "cheddar cheese",
    "cheddar cheese soup",
    "cheese",
    "chicken",
    "chicken bouillon",
    "chicken breast",
    "chicken broth",
    "chicken strips",
    "chicken wings",
    "chipped steak",
    "chives",
    "chocolate chips",
    "chunky salsa",
    "cinnamon",
    "cocktail rye bread",
    "cocoa",
    "coconut",
    "colby cheese",
    "confectioners sugar",
    "container cool whip",
    "cooking oil",
    "cool whip",
    "corn meal",
    "cornstarch",
    "cottage cheese",
    "crab",
    "cracker crumbs",
    "cream cheese",
    "cream of celery soup",
    "cream of chicken soup",
    "cream of mushroom soup",
    "cream of shrimp soup",
    "creamed corn",
    "crescent roll dough",
    "croutons",
    "crushed oregano",
    "crushed tomatoes",
    "cumin",
    "curry powder",
    "dairy sour cream",
    "dark brown sugar",
    "dark rum",
    "dates",
    "dill weed",
    "donut shaped cereal",
    "dream whip",
    "dried basil leaves",
    "dried green peppercorns",
    "dried oregano leaves",
    "dried red kidney beans",
    "dried thyme",
    "dried whole marjoram",
    "dried whole oregano",
    "dried whole rosemary",
    "drops tabasco sauce",
    "drops vanilla extract",
    "dry mustard",
    "dry nondairy creamer",
    "dry sweetener",
    "dry vegetable soup mix",
    "dry yeast",
    "duck sauce",
    "dumplings",
    "egg",
    "egg noodles",
    "eggplant",
    "elbow macaroni",
    "english muffin",
    "envelope dry onion soup mix",
    "evaporated milk",
    "extra-virgin olive oil",
    "fat-free cool whip",
    "fennel seeds",
    "finely chopped",
    "fish fillets",
    "five-spice powder",
    "flour",
    "flour tortillas",
    "four cheese blend",
    "french bread",
    "french dressing",
    "fresh basil",
    "fresh fish fillets",
    "fresh fruit",
    "fresh ginger",
    "fresh lemon juice",
    "fresh parsley",
    "fresh spinach",
    "fresh tomatoes",
    "frozen chopped broccoli",
    "frozen green peas",
    "frozen lemonade",
    "frozen orange juice",
    "frozen shredded hash browns",
    "frozen strawberries and juice",
    "fructose",
    "garlic",
    "garlic flakes",
    "garlic powder",
    "gelatin",
    "genoa salami",
    "ginger ale",
    "goat cheese",
    "gouda cheese",
    "grainy-style dijon mustard",
    "grapefruit juice",
    "greek seasoning",
    "green chilies",
    "green olives",
    "green onion",
    "green pepper",
    "grenadine syrup",
    "ground allspice",
    "ground beef",
    "ground chuck",
    "ground cinnamon",
    "ground cloves",
    "ground ginger",
    "ground nutmeg",
    "ground pepper",
    "gruyere cheese",
    "guacamole",
    "haddock",
    "half and half",
    "ham",
    "ham bone with ham",
    "hamburger",
    "hamburger patties",
    "head lettuce",
    "heaping salad dressing",
    "heavy cream",
    "hen",
    "herbes de provence",
    "hidden valley ranch dressing mix",
    "hoagie rolls",
    "hoisin sauce",
    "honey",
    "horseradish",
    "hot milk",
    "hot mustard",
    "hot pepper sauce",
    "hot sauce",
    "hungry jack layered biscuits",
    "ice cubes",
    "italian bread crumbs",
    "italian dressing",
    "italian sausage",
    "italian seasoning",
    "italian style bread crumbs",
    "jack cheese",
    "jalapeno",
    "jalapeo pepper",
    "jar diced pimientos",
    "jar marinated artichoke hearts",
    "jar pizza quick",
    "jar red roasted peppers",
    "jars chopped pimentos",
    "karo light corn syrup",
    "kelloggs all-bran",
    "ketchup",
    "kool-aid",
    "lasagna noodles",
    "lean flank steak",
    "lean hamburger",
    "lemon",
    "lemon fat-free yogurt",
    "lemon jell-o",
    "lemon juice",
    "lemon peel",
    "lemon pepper",
    "lentils",
    "lettuce",
    "light corn syrup",
    "light cream",
    "lime juice",
    "liquid shortening",
    "liquid smoke",
    "liquid sweetener",
    "lo-cal preserves",
    "loaf day old bread",
    "loin chops",
    "low-fat mayonnaise",
    "low-fat sour cream",
    "macaroni",
    "margarine",
    "marjoram",
    "marshmallows",
    "mayo",
    "mayonnaise",
    "mccormick hollandaise sauce blend",
    "mccormick spaghetti sauce mix",
    "mild cheddar cheese",
    "milk",
    "milk chocolate chips",
    "miniature marshmallows",
    "mint",
    "miracle whip",
    "mixed dry italian herbs",
    "molasses",
    "monterey jack cheese",
    "mozzarella cheese",
    "mushroom soup",
    "mushrooms",
    "mustard",
    "mustard with horseradish",
    "nabisco 100% bran",
    "noodles",
    "nut halves",
    "nutmeats",
    "nutmeg",
    "nuts",
    "oat flour",
    "oil",
    "oleo",
    "olive oil",
    "onion",
    "onion flakes",
    "onion powder",
    "orange fat-free yogurt",
    "orange juice",
    "orange juice concentrate",
    "orange peel",
    "orange rind",
    "oregano",
    "oregano leaves",
    "paprika",
    "parmesan cheese",
    "parsley",
    "parsley flakes",
    "parsley sprigs",
    "pasta",
    "peach slices",
    "peaches",
    "peanut butter",
    "pecans",
    "pepper",
    "pepperidge farm herb stuffing mix",
    "peppermint extract",
    "pepperoni",
    "pesto",
    "picante sauce",
    "pie shell",
    "pillsbury crescent rolls",
    "pimento",
    "pimiento",
    "pineapple",
    "pineapple juice",
    "pineapple tidbits",
    "pita bread",
    "pizza sauce",
    "plain flour",
    "plain lo-cal yogurt",
    "plain yogurt",
    "plum tomatoes",
    "polyunsaturated margarine",
    "pork tenderloin",
    "potatoes",
    "powdered sugar",
    "prepared mustard",
    "processed cheese",
    "provolone cheese",
    "pumpkin",
    "pumpkin pie spice",
    "pure vanilla",
    "quick cooking oats",
    "radishes",
    "raisins",
    "raspberry jam",
    "red kidney beans",
    "red leaf lettuce",
    "red onion",
    "red pepper",
    "red wine vinegar",
    "reduced-calorie pancake",
    "reduced-sodium soy sauce",
    "refried beans",
    "regular coca-cola",
    "relish",
    "rhubarb",
    "rib roast",
    "rice",
    "ricotta cheese",
    "romaine lettuce",
    "rosemary",
    "round rye bread",
    "sage",
    "salad dressing",
    "salad oil",
    "salmon filet",
    "salsa",
    "salt",
    "sausage",
    "scallions",
    "sea salt",
    "seafood",
    "season-all",
    "seasoned pepper",
    "seedless grapes",
    "seedless green grapes",
    "seedless raisins",
    "seedless raspberry jam",
    "seedless white raisins",
    "self rising flour",
    "semi-sweet chocolate chips",
    "semi-sweet chocolate pieces",
    "sharp cheddar",
    "shelled peanuts",
    "sherry",
    "shortening",
    "shrimp",
    "sifted flour",
    "skim milk",
    "skinless salmon fillet chunks",
    "smoked sausage",
    "soda",
    "solid shortening",
    "sour cream",
    "sour milk",
    "soy margarine",
    "soy sauce",
    "spaghetti sauce",
    "spanish peanuts",
    "spinach",
    "spinach noodles",
    "spinach pasta",
    "sprigs parsley",
    "sprite",
    "stalks celery",
    "stick butter",
    "sticks butter",
    "strawberries",
    "strawberry jam",
    "strawberry jello",
    "strawberry preserves",
    "strawberry puree",
    "strawberry yogurt",
    "strips cooked",
    "sugar",
    "sugar-free orange gelatin",
    "sun-dried tomatoes",
    "sweet corn",
    "sweet italian sausage",
    "sweet n low",
    "sweet pickle relish",
    "sweet potatoes",
    "sweet red pepper",
    "sweet yellow pepper",
    "sweetened whipped cream",
    "sweetener",
    "swiss cheese",
    "tabasco",
    "taco seasoning",
    "thyme",
    "tiny shrimp",
    "tomato",
    "tomato paste",
    "tomato puree",
    "tomato sauce",
    "tomato wedges",
    "tomatoes",
    "tomatoes in puree",
    "tortilla chips",
    "tri-tip or bottom sirloin beef",
    "turkey italian sausages",
    "unbleached flour",
    "unflavored gelatin",
    "unsweetened applesauce",
    "unsweetened cocoa powder",
    "vanilla",
    "vanilla extract",
    "vanilla instant pudding",
    "vanilla wafers",
    "veal chops",
    "vegetable oil",
    "velveeta cheese",
    "vermicelli noodles",
    "vinegar",
    "waffle syrup",
    "walnuts",
    "water",
    "water chestnuts",
    "wesson oil",
    "whipped topping",
    "whipping cream",
    "white flour",
    "white pepper",
    "white sugar",
    "white vinegar",
    "white wine",
    "white wine vinegar",
    "whole candied cherries",
    "whole chicken",
    "whole milk",
    "whole wheat bread",
    "whole wheat flour",
    "whole-berry cranberry sauce",
    "wine vinegar",
    "wingettes",
    "worcestershire sauce",
    "yellow cake mix",
    "yellow cheese",
    "zucchini"
];
