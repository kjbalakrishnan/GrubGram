import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";

function Navbar() {
    const logout = () => {
        signOut(auth);
    };
    const [userInfo, setUserInfo] = useState([]);
    const [user] = useAuthState(auth);
    const [userFirstLetter, setuserFirstLetter] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    useEffect(() => {
        const getUserInfo = async () => {
            const userRef = doc(db, "users", user?.uid);
            const userSnap = await getDoc(userRef);
            setUserInfo(userSnap.data());
            setuserFirstLetter(userSnap.data().name[0])
        }

        getUserInfo();
    }, [user]);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navProfile = () => {
        navigate('/profile')
    }


    return (
        <AppBar raised={true} color="primary">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <FastfoodRoundedIcon color="secondary" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        color="secondary"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            textDecoration: 'none',
                        }}
                    >
                        GrubGram
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            sx={{ my: 2 }}
                            color="secondary"
                            href="/home"
                        >
                            Home
                        </Button>
                        <Button
                            sx={{ my: 2, }}
                            color="secondary"
                            href="/pantry"
                        >
                            Pantry
                        </Button>
                        <Button
                            sx={{ my: 2 }}
                            color="secondary"
                            href="/recipes"
                        >
                            Recipes
                        </Button>
                    </Box>

                    <Button
                        id="demo-positioned-button"
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    ><Avatar src={userInfo.profilePic}>{userFirstLetter}</Avatar></Button>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <MenuItem onClick={() => {
                            handleClose();
                            logout();
                        }}>Logout</MenuItem>
                        <MenuItem
                            color="secondary"
                            href="/profile" onClick={navProfile}
                        >Profile</MenuItem>
                    </Menu>

                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default Navbar;