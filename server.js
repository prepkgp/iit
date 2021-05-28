const express = require("express");
const app = express();
const { WebhookClient } = require("cloud-firebase");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));





app.use(express.static("public"));
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.post("/iitkgp_prep_bot", function(request, response) {
  const agent = new WebhookClient({ request: request, response: response });
  var intentNumber = request.body.session;
  var arr = intentNumber.split("/");
  var numero_corrigido = arr[40];
  var intentName = request.body.queryResult.intent.displayName;
  var contextname = request.body.queryResult.outputContexts.displayName;
    var data = request.body.queryResult.parameters;
  
    var tata = request.body.queryResult.fulfillmentText;
   
  
  if (intentName == "iknow") {
    var nodemailer = require("nodemailer");

  
    
    

    var transporte = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.user,
        pass: process.env.pass
      }
    });

    var email = {
      from: process.env.user,
      to: "indrakgikg1818@gmail.com",
      
      subject: "Chatbot Enquiry",
      html: `Details:<p>${tata} </p>
      
     
      `,
    };

    transporte.sendMail(email, function(error, info) {
      if (error) console.log(error);
      throw error;
      console.log("sent" + info);
    });
  }
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
