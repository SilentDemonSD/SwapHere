import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const SkillCard = ({ skill }) => (
  <Card className="card" sx={{ m: 2 }}>
    <CardContent>
      <Typography variant="h6">{skill.title}</Typography>
      <Typography variant="body2">{skill.description}</Typography>
      <Typography variant="caption">Offered by: {skill.user.name}</Typography>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" sx={{ mr: 1 }}>
          Swap Here
        </Button>
        <Button variant="outlined" color="secondary">
          Connect
        </Button>
      </Box>
    </CardContent>
  </Card>
);

export default SkillCard;
