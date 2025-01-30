const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const { Link } = require("react-router-dom");
require("dotenv").config();


const app = express();
PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({

  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to the database");
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/cars", (req, res) => {
  const query = `
    SELECT c.car_id, c.name, c.transmission, c.deposit, c.mileage, c.age, 
           c.rental_cost, c.photo_url, l.name AS location_name, 
           c.location_latitude, c.location_longitude 
    FROM Cars c
    JOIN Locations l 
    ON c.location_latitude = l.latitude AND c.location_longitude = l.longitude`;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching car data:", err);
      return res.status(500).json({ error: "Failed to fetch car data" });
    }
    res.json({ cars: results });
  });
});



app.get("/api/users", (req, res) => {
  const query = "SELECT * FROM users";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res.status(500).json({ error: "Failed to fetch user data" });
    }
    res.json({ users: results });
  });
})

const bcrypt = require('bcrypt');

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("All fields are required");
    }


    const query = "SELECT * FROM users WHERE email = ?";

    const result = await new Promise((resolve, reject) => {
      db.query(query, [email], (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return reject(err); 
        }
        resolve(result);
      });
    });

    if (!result || result.length === 0) {
      return res.status(401).send("Invalid credentials");
    }

    const user = result[0];

    console.log("Entered Password:", password);
    console.log("Stored Hashed Password from DB:", user.password);

    const isValid = await bcrypt.compare(password ,user.password) ;
    console.log(isValid)

    console.log("Password Match Result:", isValid);

    if (!isValid) {
      return res.status(401).send("Invalid credentials");
    }

    const userResponse = {
      id: user.id,
      email: user.email,
      name: user.name,  
    };

    res.status(200).json({ message: "Login successful", user: userResponse});

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("An error occurred during login");
  }
});

app.post('/signup', async (req, res) => {
  const { email, name, surname, password } = req.body;


  if (!email || !name || !surname || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {

    const hashedPassword = await bcrypt.hash(password, 10);  

   
    const query = 'INSERT INTO users (email, name, surname, password) VALUES (?, ?, ?, ?)';

    db.query(query, [email, name, surname, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error inserting data into the database:', err);
        return res.status(500).json({ message: 'An error occurred while registering the user.' });
      }

      res.status(200).json({ message: 'User registered successfully!' });
    });
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ message: 'An error occurred while hashing the password.' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
