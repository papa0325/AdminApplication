import React, { useState, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { 
    Card,
    CardActionArea,
    CardContent, 
    Button, 
    Typography,
    Container,
    TextField,
} from "@material-ui/core";
import HeaderContext from '../../../context/headerContext/headerContext';
import {API_URL} from "../../../config";

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
});

export function TeamSettingsDetail(props) {
    const classes = useStyles();
    const [ team, setTeam ] = useState({ name: "", src: "", raw: ""});
    const { updateHeader, dropDownHeader } = useContext(HeaderContext);
    const handleChange = e => {
        setTeam({...team, [e.target.name]: e.target.value})
    }
    const handleChangeUpload = e => {
        if (e.target.files.length) {
            setTeam({
                ...team,
                src: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
    };
    const handleClick = () => {

        // setting header infomation for updating
        let current = JSON.parse(localStorage.getItem('currentData'))
        if (!team.name && !team.src) return
        if (!team.name) team.name = current.name
        if (!team.src) team.src = current.src

        // request to server for updating team state
        fetch(API_URL + '/team/update', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                currentname: current.name, 
                updatename: team.name,
                updatesrc: team.src
            })
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('currentData', JSON.stringify(data))
            updateHeader(data)
            localStorage.setItem('teams',data.name)
            dropDownHeader([data.name])
        })
        .catch(error => console.log(error.message))
    }
    return <>
        <Card className={classes.card}>
            {/* Section for input team name */}
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        1. What is your team name?
                    </Typography>
                    <Typography component="p">
                        &nbsp;&nbsp;&nbsp;
                        You can always change it later if you need to.
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
                        value={team.name}
                        name="name"
                        onChange={handleChange}
                        autoFocus
                    />
                </div>
            </Container>
            {/*  */}
            {/* Section for choosing team logo from local */}
            <CardActionArea>
                <label htmlFor="upload-button">
                    <CardContent >
                        <Typography gutterBottom variant="headline" component="h2">
                            2. Please select your team logo from your computer
                        </Typography>
                        <Typography component="p">
                            &nbsp;&nbsp;&nbsp;
                            You can set team logo from your machine.
                        </Typography>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="upload-button"  
                            multiple
                            type="file"
                            onChange={handleChangeUpload}
                        />
                    </CardContent> 
                </label>
                <Button onClick={handleClick}>Setting</Button>
            </CardActionArea>
        </Card>
    </>;
}
