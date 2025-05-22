import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function AboutForm() {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          About This Project
        </Typography>
        <Typography variant="body1" paragraph>
          <b>DMS Tasks</b> is a simple task management application built with React, Express, and MongoDB.
          You can create, edit, complete, and delete tasks, as well as set a due date for each task.
        </Typography>
        <Typography variant="body1" paragraph>
          <b>Main features:</b>
        </Typography>
        <ul>
          <li>Create and manage your tasks</li>
          <li>Edit task details and due dates</li>
          <li>Mark tasks as complete</li>
          <li>Sort and highlight overdue tasks</li>
        </ul>
        <Typography variant="body2" color="text.secondary">
          This project is for demonstration and educational purposes. <br />
          &copy; {new Date().getFullYear()} DMS Tasks
        </Typography>
      </Box>
    </Container>
  );
}
