import express from 'express';
import { connectDB } from './config/db.js';  
import Patient from './models/patient.model.js';
import router from '../routes/patient.routes.js'; 
import cors from 'cors';  // CORS middleware to allow cross-origin requests

const app = express();
const PORT = process.env.PORT || 5000; 

// Middleware
app.use(cors({
    origin: ['http://localhost:8000', 
             'http://127.0.0.1:8000', 
             'https://automatic-couscous-94pr7pr95vw3pwpp-8000.app.github.dev'], // Allow both origins
             
    methods: ['GET', 'POST'], // Allow specific methods
  }));
  
app.use(express.json()); 

// Routes
app.use('/api/patients', router);

// Start server
app.listen(PORT, () => {
    connectDB(); // Connect to the database
    console.log(`Server started at http://localhost:${PORT}`);
});


// app.use(cors({
//     origin: '*', // Allow requests from any origin (not recommended for production)
//   }));