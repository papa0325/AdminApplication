import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Notifications,{ notify } from 'react-notify-toast'
import {useSelector} from "react-redux";
import { 
    Card,
    CardActionArea,
    CardContent, 
    Button, 
    Typography,
    Container,
    TextField,
} from "@material-ui/core";
import {API_URL} from '../../../config';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    card: {
        padding: "2% 10%",
        maxWidth: '90%',
        minHeight: '50%',
        overflow: "visible"
    },
    input: {
        display: 'none'
    },
    button: {
        textTransform: 'none',
        backgroundColor: "pink",
        fontFamily: "inherit"
    }
});

  

export function TeamMember(props) {
    const classes = useStyles();
    const [ email, setEmail ] = useState("");
    const {user} = useSelector(state => state.auth);
    const handleChange = e => {
        setEmail(e.target.value)
    }
    const handleClick = () => {
        // Request server for inviting team member by email 
        if (email.indexOf("@") === -1) {
            notify.show("Invalid email address", "custom", 3000, { background: 'blue', text: "#FFFFFF" })
            return
        }
        fetch(API_URL + '/invite', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ adminEmail:user.email, inviteEmail: email })
        })
        .then(res => res.json())
        .then(data => {
            notify.show(data.msg,"custom",3000, { background: 'blue', text: "#FFFFFF" })
        })
        .catch(err => 
            notify.show("Invitation failed","custom",3000, { background: 'blue', text: "#FFFFFF" })    
        )
    }

    return <>
        <Card className={classes.card}>
            <Notifications />
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        Please invite a member.
                    </Typography>
                    <Typography component="p">
                        &nbsp;&nbsp;&nbsp;
                        You can always invite a team member by email.
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Container maxWidth="ls">
                <div className={classes.paper}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        value={email}
                        name="name"
                        onChange={handleChange}
                        autoFocus
                        type="email"
                        autoComplete="email"
                    />
                </div>
            </Container>
            <hr />
            <Button className={classes.button} onClick={handleClick}>Invite {email.split("@")[0]} by email</Button>
        </Card>
    </>;
}
