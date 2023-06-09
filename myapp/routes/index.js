var express = require('express');
var router = express.Router();
var User = require("./users")
var Category = require("./productmodel")
var passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
passport.use(new LocalStrategy(User.authenticate()));
const Attendance = require('./studentattendence');
const multer = require("multer")


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/home', function(req, res, next) {
  res.send("jjj")
});

router.post('/register', (req, res) => {
  const { username, email,studyIn, password } = req.body;

  // Generate a student ID
  const studentID = generateStudentID();

  const newUser = new User({ username, email, studentID ,studyIn});

  User.register(newUser, password, (error, user) => {
    if (error) {
      console.error('An error occurred:', error);
      return res.status(500).json({ message: 'An error occurred' });
    }

    passport.authenticate('local')(req, res, () => {
      res.send('User created');
    });
  });
});

function generateStudentID() {

  const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

  // Get the current year
  const currentYear = new Date().getFullYear();


  const studentID = randomNumber + currentYear;

  return studentID;
}


router.post('/login', passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/failed"
}), function (req, res) {
});


router.get('/getUserType', (req, res) => {
 
  const userType = req.user.userType;


  res.json({ userType });
});


router.post('/logout', (req, res) => {

  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      res.sendStatus(500);
    } else {
     
      res.redirect('/login');
    }
  });
});


function checkAdmin(req, res, next) {

  const { user } = req;


  if (user && user.role === "admin") {
   
    next();
    res.render("/adminDashboard")
  } else {

    res.status(403).json({ error: "Only admin users can create categories" });
  }
}


const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const fileFilter = function (req, file, cb) {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

router.post('/categories', upload.single('image'), function (req, res) {
  const { name, description } = req.body;
  const image = req.file.filename;

  const newCategory = new Category({
    name,
    description,
    image,
  });

  newCategory
    .save()
    .then((category) => {
      res.status(201).json(category);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to create category' });
    });
});

router.get('/categories', function (req, res) {
  Category.find()
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to fetch categories' });
    });
});



router.post('/attendance', (req, res) => {
  const { studentId } = req.body;


  const currentDate = new Date();


  const startTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  const endTime = new Date(startTime.getTime() + 24 * 60 * 60 * 1000);


  Attendance.findOne({
    studentId,
    date: { $gte: startTime, $lt: endTime }
  })
    .then(existingAttendance => {
      if (existingAttendance) {
      
        res.status(403).json({ message: 'Attendance already submitted within 24 hours' });
      } else {
       
        const newAttendance = new Attendance({
          studentId,
          date: currentDate,
        });

  
        newAttendance.save()
          .then(() => {
            res.status(200).json({ message: 'Attendance taken successfully' });
          })
          .catch((error) => {
            console.error('Error saving attendance:', error);
            res.status(500).json({ message: 'An error occurred' });
          });
      }
    })
    .catch((error) => {
      console.error('Error checking existing attendance:', error);
      res.status(500).json({ message: 'An error occurred' });
    });
});


router.get('/attendance/:grade', checkAdmin, (req, res) => {
  const { grade } = req.params;

  const currentDate = new Date();

  const startTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  const endTime = new Date(startTime.getTime() + 24 * 60 * 60 * 1000);

  Attendance.find({
    grade,
    date: { $gte: startTime, $lt: endTime }
  })
    .then(attendance => {
      res.status(200).json({ attendance });
    })
    .catch((error) => {
      console.error('Error fetching attendance:', error);
      res.status(500).json({ message: 'An error occurred' });
    });
});





module.exports = router;
