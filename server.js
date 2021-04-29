var express    = require("express");
// var login = require('./routes/loginroutes');
var bodyParser = require('body-parser');
var app = express();
var fs = require('file-system');
var router = express.Router();
// var Reflection = require('./src/controllers/Reflection');
var formidable = require('formidable');
const path  = require('path');
const port = 3000;
const pug = require('pug');
let multer  = require('multer');  
let upload  = multer({ storage: multer.memoryStorage() });
var  util = require('util');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/static', express.static('static'));

//set views directory for pug templates
app.set('views', './views');
app.set('view engine', 'pug');


router.get('/', function(req, res) {
    //res.json({ message: 'welcome to our upload module apis' });
    res.sendFile('index.html');
});

//route to handle user registration
// router.post('/register',login.register);
//router.post('/login',login.login)
app.use('/api', router);

app.get('/', (req, res) => res.sendFile(__dirname + '/static/index.html'))

// app.post('/register',login.register)
// app.post('/api/v1/reflections', Reflection.create);
// app.get('/api/v1/reflections', Reflection.getAll);
// app.get('/api/v1/reflections/:id', Reflection.getOne);
// app.put('/api/v1/reflections/:id', Reflection.update);
// app.delete('/api/v1/reflections/:id', Reflection.delete);




app.post('/customize-template', bodyParser.json(), (req, res) => {
    //console.log(res);

    //process file upload and move to directory BEGIN
    var form = new formidable.IncomingForm({ 
      uploadDir: __dirname + '/static/uploads/',  // don't forget the __dirname here
      keepExtensions: true
    });
 
    var logoUpload;
    var featuredUpload;

    form.parse(req, function (err, fields, files) {
        var oldpath = files.fileUpload.path;
        console.log("OLD Path" + oldpath);
        var newpath = __dirname + '/static/uploads/' + files.fileUpload.name;

        // var oldpath2 = files.featuredImage.path;
        // console.log("OLD Path2" + oldpath);
        // var newpath2 = __dirname + '/static/uploads/' + files.featuredImage.name;
        
        // fs.rename(oldpath, newpath, function (err) {
        //   if (err) throw err;
        //   // res.write('File uploaded and moved!');
        //   // res.end();
        // });

        // fs.rename(oldpath2, newpath2, function (err) {
        //   if (err) throw err;
        //   // res.write('File uploaded and moved!');
        //   // res.end();
        // });
        
    console.log('Path' + newpath);
    // console.log(files.fileUpload);
    logoUpload ='/static/uploads/' + files.fileUpload.name;
    featuredUpload ='/static/uploads/' + files.featuredImage.name;

    // render template and pass in dynamic content/variables
    res.render(""+ fields.template+"", {  doctor_name: fields.drName, doctor_title: fields.drTitle, primary_color: fields.primary_color, doctor_specialty: fields.drSpecialty, doctor_education : fields.drEducation, logo: logoUpload, intro: fields.intro, clinic_info: fields.clinic_info, featured_img : featuredUpload  });
  });
 
  //process file upload and move to directory END

 
  

});








app.listen(port, () => console.log(`Example app listening on port ${port}!`))