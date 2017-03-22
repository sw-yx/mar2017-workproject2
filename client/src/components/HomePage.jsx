import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import { Link, IndexLink } from 'react-router';


const HomePage = () => (
  <Card className="container">
    <CardTitle title="Welcome to Swyx Analytics" subtitle="You must now login to see data." />
    <Link to="/login"><h1>Log in</h1></Link>
    <h1> __ </h1>
  </Card>
);

export default HomePage;