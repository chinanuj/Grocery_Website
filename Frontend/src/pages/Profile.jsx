import React from "react";
import { Card, CardContent, Typography, Avatar, Grid } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import api from "../utils/api";

const Profile = () => {
  const [user, setUser] = useState();
  
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await api.post("http://localhost:5001/api/auth/get-user");
          const data = await response.data; // Await response.json()
          setUser(data.user);
        } catch (error) {
          console.error('Invalid token:', error);
        }
      }
    };

    fetchUser(); // Call the async function
  }, []);

  return (
    user && (
    <Card style={{ maxWidth: 600, margin: "2em auto", padding: "2em", borderRadius: "15px" }}>
      <Grid container spacing={3} alignItems="center">
        <Grid item>
          <Avatar sx={{ bgcolor: "#007BFF", width: 64, height: 64 }}>
            {`${user?.first_name?.charAt(0) || ''}${user?.last_name?.charAt(0) || ''}`}
          </Avatar>
        </Grid>
        <Grid item xs>
          <Typography variant="h5">{`${user.first_name} ${user.last_name}`}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {user?.email}
          </Typography>
        </Grid>
      </Grid>
      <CardContent>
        <Typography variant="body1"><strong>Phone:</strong> {user.phone_number}</Typography>
        <Typography variant="body1"><strong>Address:</strong> {user.address}</Typography>
        <Typography variant="body1" color="textSecondary">
          Account created on: {new Date(user?.created_at).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
    )
  );
}

export default Profile;
