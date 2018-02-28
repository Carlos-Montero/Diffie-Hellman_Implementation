var bigInt = require("big-integer");

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


//****************************************funciones***************************


function generarPeticion{

    //genera p
    var p = bigInt(4);
    var bits = bigInt(128);
    while(!p.isPrime())
        p = bigInt.randBetween(bigInt(2).pow(bits.minus(1)),bigInt(2).pow(bits).minus(1));

    //genera g
    var g = bigInt(2);
    var bits2 = bigInt(128);
    while(!p.isPrime())
        g = bigInt.randBetween(bigInt(2).pow(bits2.minus(1)),bigInt(2).pow(bits2).minus(1));


    //genera a
    var a = bigInt.randBetween(bigInt(2),p.minus(1));

    //calcula k1
    var k1 = g.modPow(a,p);

    //endpoint para enviar p y g


    //endpoint para enviar k1



    //endoint para recibir k2



    //calculamos la key
    var keyA = k2.modPow(a,p);
}

function recibirPeticion{

    //endpiont para recibir p y g


    //endpoint para recibir k1


    //generamos b
    var b = bigInt.randBetween(bigInt(2),p.minus(1));

    //generamos k2
    var k2 = g.modPow(b,p);

    //endpoint para enviar k2


    //calculamos la key
    var keyB = k1.modPow(b,p);


}


//********************************************ejemplo****************************
function updateCity(req, res){
    console.log("hello");
    var userId = req.user.sub;
    var city = req.body.city;

    User.update({ _id: userId }, {$set: {city: city}}, function(err,user) {
        if(err){
            console.log(err);
            return res.status(500).send({message: err});}
        else if (!user)
            return res.status(404).send({message: 'El usuario no existe'});
        else{
            return res.status(200).send("OK, settings changed");
        }
    })
    console.log(city);
}

