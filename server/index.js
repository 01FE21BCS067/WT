const express = require('express');
const { connectToDB } = require('./db/db.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const { userRouter } = require('./routes/auth.routes.js');
const path = require('path');
const { Users } = require('./models/models.js');

const app = express();

const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());
app.get('/amogh', async (req, res) => {
    const result = await Users.find();
    console.log(result);
    res.end('Hey');
});
app.use('/api/auth', userRouter);
app.use(express.static('build'));
app.use((req, res, next) => {
    if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
        next();
    } else {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    }
});

// Handle personal details form submission
app.post('/faculty/personal-details', async (req, res) => {
    const { Name, DateOfBirth, Email, MobileNo, Qualification, AreaOfSpecialization } = req.body;

    // Assuming faculty_id is passed through the request query or session
    const faculty_id = req.query.faculty_id;

    // Log the faculty_id for debugging
    console.log('Faculty ID:', faculty_id);

    try {
        // Update the faculty record in the database using your preferred method (MongoDB, etc.)
        // Replace the following line with your actual update logic for MongoDB
        const result = await Users.updateOne({ _id: faculty_id }, {
            $set: {
                Name,
                DateOfBirth,
                Email,
                MobileNo,
                Qualification,
                AreaOfSpecialization,
            },
        });

        // Log the updated faculty details for debugging
        console.log('Faculty Updated:', {
            Name,
            DateOfBirth,
            Email,
            MobileNo,
            Qualification,
            AreaOfSpecialization,
            faculty_id,
        });

        // Redirect to the same page with the faculty_id
        res.redirect(`/faculty/personal-details?faculty_id=${faculty_id}`);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal Server Error');
    }
});

(async () => {
    await connectToDB("mongodb+srv://kletech:kletech1234@kledatabase.t7xh5su.mongodb.net/?retryWrites=true&w=majority");
    console.log('Connected to DB');
})();

app.listen(PORT, 'localhost', function () {
    console.log(`Server is running on port ${PORT}`);
});
