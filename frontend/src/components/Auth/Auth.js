import { useState } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from "./Input";

const Auth = () => {

    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = () => {

    }

    const handleChange = () => {
        
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        handleShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const token = res?.credential;
        
        const result = jwtDecode(token);

        // console.log(result);

        try { 
            dispatch({ type: AUTH, data: { token, result } });

            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = (error) => {
        console.log(error);
        console.log("Google sign in was unsuccessful. Try again later!");
    }

    return ( 
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
                <form className={classes.form}  onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    { isSignup && (
                    <>
                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                    </>
                    )}
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {isSignup ? 'Sign up' : 'Sign in'}
                </Button>
                <Grid container justifyContent="center">   
                <GoogleLogin 
                    
                    theme="filled_blue"
                    shape="circle"
                    onSuccess={googleSuccess}
                    onError={googleFailure}
                    cookiePolicy="single_host_origin"
                />
                </Grid>
                <Grid container justifyContent="center">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign up"}
                            </Button>
                        </Grid>
                </Grid>
                </form>
            </Paper>
        </Container>
    );
}
 
export default Auth;