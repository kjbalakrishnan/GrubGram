import { Avatar, Card, CardHeader, createTheme, Grid, ThemeProvider, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PostFeed from "../components/PostFeed";
import { auth, db } from "../firebase";
import './Profile.css'

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: red[600],
        },
        secondary: {
            main: '#FFFFFF',
        },
    },
});

export default function Social() {
    const location = useLocation();
    const [userPosts, setUserPosts] = useState([]);
    const [userSoc, setUserSoc] = useState([]);
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/");

        const getUserPosts = async () => {
            const postsRef = collection(db, "posts");
            const q = query(postsRef, where("name", "==", location.state.post.name));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setUserPosts(data);
        }

        const getUserSoc = async () => {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("name", "==", location.state.post.name));
            const querySnapshot = await getDocs(q);
            setUserSoc(querySnapshot.docs[0].data());
        }

        getUserPosts();
        getUserSoc();
    }, [user, loading, navigate])

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Navbar />
                <div className='leftProfile'>
                    <PostFeed posts={userPosts} />
                </div>
                <div className='rightProfile'>
                    <Card raised={true} sx={{ p: 3, maxWidth: 300, ml: 20, mt: 3 }}>
                        <Grid
                            container
                            direction="column"
                            alignItems="center"
                            justify="center">
                            <CardHeader title={userSoc.name} titleTypographyProps={{
                                variant: 'h5', fontFamily: 'monospace', fontWeight: 'bold'
                            }} />
                            <Avatar sx={{ mb: 3, height: 200, width: 200 }} src={userSoc.profilePic} />
                        </Grid>
                        <Typography sx={{ ml: 1.5, variant: 'body1', color: 'primary' }}>{userSoc.bio}</Typography>
                    </Card>
                </div>
            </div>
        </ThemeProvider>
    );
}