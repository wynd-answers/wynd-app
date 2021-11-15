import React from "react";
import { Grid, List, ListItem, Typography, Link, Divider } from "@mui/material";
import { Twitter, GitHub, YouTube, Air } from '@mui/icons-material';

const Footer = () => {
    return (
        <Grid container sx={{ mt: 4 }}>
            <Grid item sx={{ py: 3 }} xs={12}>
                <Divider flexItem />
            </Grid>
            <Grid item xs={4} alignSelf="center">
                <Typography variant="h3">
                    <Air fontSize="inherit" /> Wynd
                </Typography>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={2}>
                <Typography variant="h6">
                    <strong>Lorem</strong>
                </Typography>
                <List dense>
                    <ListItem disablePadding>
                        <Link color="inherit" sx={{ lineHeight: 1.5 }} underline="hover" variant="body1" href="#">News</Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link color="inherit" sx={{ lineHeight: 1.5 }} underline="hover" variant="body1" href="#">News</Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link color="inherit" sx={{ lineHeight: 1.5 }} underline="hover" variant="body1" href="#">News</Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link color="inherit" sx={{ lineHeight: 1.5 }} underline="hover" variant="body1" href="#">News</Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link color="inherit" sx={{ lineHeight: 1.5 }} underline="hover" variant="body1" href="#">News</Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link color="inherit" sx={{ lineHeight: 1.5 }} underline="hover" variant="body1" href="#">News</Link>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="h6">
                    <strong>Lorem</strong>
                </Typography>
                <List dense>
                    <ListItem disablePadding>
                        <Link color="inherit" sx={{ lineHeight: 1.5 }} underline="hover" variant="body1" href="#">News</Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link color="inherit" sx={{ lineHeight: 1.5 }} underline="hover" variant="body1" href="#">News</Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link color="inherit" sx={{ lineHeight: 1.5 }} underline="hover" variant="body1" href="#">News</Link>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="h6">
                    <strong>Lorem</strong>
                </Typography>
                <List dense>
                    <ListItem disablePadding>
                        <Link color="inherit" sx={{ lineHeight: 1.5 }} underline="hover" variant="body1" href="#">News</Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link color="inherit" sx={{ lineHeight: 1.5 }} underline="hover" variant="body1" href="#">News</Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link color="inherit" sx={{ lineHeight: 1.5 }} underline="hover" variant="body1" href="#">News</Link>
                    </ListItem>
                </List>
            </Grid>
            <Grid item sx={{ py: 3 }} xs={12}>
                <Divider flexItem />
            </Grid>
            <Grid item sx={{ pb: 3 }} display="flex" xs={6}>
                <Typography variant="body1">
                    © Wynd {(new Date().getFullYear())}
                </Typography>
            </Grid>
            <Grid item sx={{ pb: 3 }} display="flex" justifyContent="flex-end" xs={6}>
                <Link href="#" color="inherit" underline="none">
                    <Twitter />
                </Link>
                <Link sx={{ pl: 3 }} href="#" color="inherit" underline="none">
                    <GitHub />
                </Link>
                <Link sx={{ pl: 3 }} href="#" color="inherit" underline="none">
                    <YouTube />
                </Link>
            </Grid>
        </Grid>

    );
};

export default Footer;
