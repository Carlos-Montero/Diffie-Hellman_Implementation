const request = require('request');
const bigInt = require ('big-integer');
const crypto = require ('crypto');

var text = "Mensaje de prueba";

request({
        uri: 'http://localhost:4200/key',
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    },

    function(error, response, body) {

        if (error)
            console.log("error")
        else{

            //r es la respuesta del get al endpoint /key
            var r = JSON.parse(body)

            //creamos las variables que obtendrá el cliente del server
            var p = bigInt(r.p);
            var g = bigInt(r.g);
            var keyA = bigInt(r.keyA);

            //creamos b
            var b = bigInt.randBetween(bigInt(2),p.minus(1));

            //creamos gb mod p
            var keyB = g.modPow(b,p);
            // o var keyB = bigInt(g.modPow(b,p));???????????????????????????????


            //generamos la key final en el cliente
            var key = bigInt(keyA.modPow(b,p));

            //encrypt message
            var cipher = crypto.createCipher('aes192', key.toString(16));
            var encrypted = cipher.update(text, 'utf8', 'hex');
            encrypted += cipher.final('hex');

            //hacemos un mensaje que contendrá el mensaje de prueba declarado arriba y la keyB
            var  message = {};
            message.message = encrypted;
            message.keyB = keyB;

            //hacemos el post contra el endpoint /message
            request({
                url: 'http://localhost:4200/message',
                method: 'POST',
                body: message,
                json: true
            }, function(error, response, body){
                if (error)
                    console.log("error")
                else
                    console.log(body);
            });

            //console.log(message)
        }

    });