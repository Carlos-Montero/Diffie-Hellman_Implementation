const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bigInt = require ('big-integer');
const crypto = require ('crypto');

var app = express();

//generamos P y G en el server

var p = bigInt(4);
var bits = bigInt(128);
while(!p.isPrime())
    p = bigInt.randBetween(bigInt(2).pow(bits.minus(1)),bigInt(2).pow(bits).minus(1));

var g = bigInt(2);
var bits2 = bigInt(128);
while(!p.isPrime())
    g = bigInt.randBetween(bigInt(2).pow(bits2.minus(1)),bigInt(2).pow(bits2).minus(1));

//generaramos a en el server
var a = bigInt.randBetween(bigInt(2),p.minus(1));

//creamos ga mod p
var keyA = g.modPow(a,p);




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//******ENDPOINTS*******

//Endpoint key
app.get('/key', function (req,res){
    var response= {};

    response.p=p;
    response.g=g;
    response.keyA=keyA;

    res.status(200).send(response)

});

//Endpoint message
app.post('/message', function(req, res){
    var keyB = bigInt(req.body.keyB);
    var mEncrypted = req.body.message;
    var mDecrypted;

    //generamos la key final en el server
    var key = bigInt(keyB.modPow(a,p));

    //desencriptamos el mensaje recibido del cliente
    var decipher = crypto.createDecipher('aes192', key.toString(16));
    mDecrypted = decipher.update(mEncrypted, 'hex', 'utf8');
    mDecrypted += decipher.final('utf8');

    console.log("El mensaje del cliente desencriptado es: ", mDecrypted);

    res.status(200).send("ok")


});

//server escuchando por el puerto 4200
app.listen(4200);
console.log("Server listeneing on port 4200");



/******************ESTO ES LA PARTE DE MATEMÁTICAS QUE HICIMOS EN CLASE*************+


 //var bigInt = require("big-integer");

 //generar p
 var p = bigInt(4);
 var bits = bigInt(128);
 while(!p.isPrime())
 p = bigInt.randBetween(bigInt(2).pow(bits.minus(1)),bigInt(2).pow(bits).minus(1));

 //generar g
 var g = bigInt(2);
 var bits2 = bigInt(128);
 while(!p.isPrime())
 g = bigInt.randBetween(bigInt(2).pow(bits2.minus(1)),bigInt(2).pow(bits2).minus(1));


 //generar nums aleatorios a y b
 var a = bigInt.randBetween(bigInt(2),p.minus(1));
 var b = bigInt.randBetween(bigInt(2),p.minus(1));


 //A envía a B g´a mod p
 var k1 = g.modPow(a,p);

 //B envía a A  g´b mod p
 var k2 = g.modPow(b,p);

 //A calcula key
 var keyA = k2.modPow(a,p);

 //B calcula key
 var keyB = k1.modPow(b,p);

 */