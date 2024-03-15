const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// Mock user data (replace this with your database logic)
const users = [
    { id: 1, email: 'admin@gmail.com', password: '1', name: 'admin' },
    { id: 2, email: 'user2@gmail.com', password: 'password2', name: 'user2' },
    { id: 3, email: 'datta@gmail.com', password: 'datta', name: 'datta' },
    {id: 4, email: 'datta', password: 'datta', name: 'datta'},
    // Add more users here
];

app.get('/login', (req, res) => {
    const email=req.query.email;
    const password=req.query.password;
    const user=users.find(u=>u.email===email);
    if(user){
        if (user.password === password) {
            res.status(200).json(user);
        } else {
            res.status(400).json({ message: 'Invalid password' });
        }
    }else {
        res.status(400).json({ message: 'account not found' });
    }
});

app.get('/users', (req, res) => {
  const id=req.query.id;
  const ds = users.find(u => u.id == id);
    if (ds) {
        res.json(ds);
    } else {
        res.status(400).json({ message: 'user was not found' });
    }
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
