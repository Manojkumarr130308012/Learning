const express = require("express");
const server = express();
const bodyParser=require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const config=require("./../config/config.json")
var mongoose = require('mongoose');
var cron = require('node-cron');
var admin = require("firebase-admin");

var serviceAccount = require("./../admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://letschat-f9f77.firebaseio.com"
});

server.use(bodyParser.json());
const cors = require('cors');
const {initializePayment, verifyPayemntAuthenticity} = require('../paytm/managePayment');

//use uuid instead of crypto for generating orderId.
const crypto = require('crypto'); 

server.use(cors());


// cron.schedule('5 * * * * *', () =>  {
//     console.log('stopped task');
//         var totalval = 0.0;
//     	var dbf=admin.database();
//         var adminRef=dbf.ref("AdminData");
//         var billingRef=dbf.ref("Billing");

// 		adminRef.child('Billing').once('value').then(function(snapshot) {
//             snapshot.forEach((snapshot) => {

//                  if(snapshot.child('Bill').child('orderstate').val() == "Pending"){
//                       var orderId = snapshot.child('Bill').child('OrderID').val();
//                       var userId = snapshot.child('Bill').child('userId').val();


//                    //adminData itemlist amount update 
//                     snapshot.child('ItemList').forEach((itemlist) => {
//                         const weight=itemlist.child('weight').val();
//                         var vegtableRef=dbf.ref("VegetableEntry/"+ itemlist.child('id').val());
//                         vegtableRef.once('value').then(function(vegtablelist){
//                             const Price=vegtablelist.child('Rate').val();
//                             const totalstr = Price * weight;
//                             totalval = totalval + totalstr;
//                             var item = {
//                                 rate : ""+totalstr
//                                 };
//                             adminRef.child('Billing').child(orderId).child('ItemList').child(itemlist.key).update(item);
//                         })
//                      })

//                      //admindata history  itemlist amount update
//                      adminRef.child('History').child(orderId).child('ItemList').once('value').then(function(snapshot) {
//                         snapshot.forEach((historyitem) => {
//                         const weight=historyitem.child('weight').val();
//                         var vegtableRef=dbf.ref("VegetableEntry/"+ historyitem.child('id').val());
//                         vegtableRef.once('value').then(function(vegtablelist){
//                             const Price=vegtablelist.child('Rate').val();
//                             const totalstr = Price * weight;
//                             totalval = totalval + totalstr;
//                             var item = {
//                                 rate : ""+totalstr
//                                 };
//                             adminRef.child('History').child(orderId).child('ItemList').child(historyitem.key).update(item);
//                         })
//                      })
//                     })


//                     // consumer itemlist
//                     billingRef.child(userId).child(orderId).child('ItemList').once('value').then(function(snapshot) {
//                         snapshot.forEach((historyitem) => {
//                         const weight=historyitem.child('weight').val();
//                         var vegtableRef=dbf.ref("VegetableEntry/"+ historyitem.child('id').val());
//                         vegtableRef.once('value').then(function(vegtablelist){
//                             const Price=vegtablelist.child('Rate').val();
//                             const totalstr = Price * weight;
//                             totalval = totalval + totalstr;
//                             console.log("weight",weight);
//                             var item = {
//                                 rate : ""+totalstr
//                                 };
//                              billingRef.child(userId).child(orderId).child('ItemList').child(historyitem.key).update(item);
//                         })
//                      })

//                      if(totalval > 200){
//                         totalval = totalval;
//                      }else{
//                         totalval=totalval - 30 + 50;
//                      }

//                      //admindata bill total and status  update
//                       var updatebill = {
//                         TotalRate : ""+totalval,
//                         orderstate : "Approved"
//                         };

//                        adminRef.child('Billing').child(orderId).child('Bill').update(updatebill);

//                        adminRef.child('History').child(orderId).child('Bill').update(updatebill);

//                        billingRef.child(userId).child(orderId).child('Bill').update(updatebill);
                     
//                     })

//                 }
//               });
// 		});
//   },{
//         scheduled: true,
//         timezone: "Asia/Kolkata"
//     });


    server.post('/ApproveDynamic', (req, res)=>{

        try{
        
            var totalval = 0.0;
            var dbf=admin.database();
            var adminRef=dbf.ref("AdminData");
            var billingRef=dbf.ref("Billing");

            let ts = Date.now();

            let date_ob = new Date(ts);
            let date = date_ob.getDate();
            let month = date_ob.getMonth() + 1;
            let year = date_ob.getFullYear();

            let datestr=date+"-"+month+"-"+year;

            console.log("datestr",datestr);
    
            adminRef.child('Billing').once('value').then(function(snapshot) {
                snapshot.forEach((snapshot) => {
    
                     if(snapshot.child('Bill').child('orderstate').val() == "Pending" && snapshot.child('Bill').child('Date').val() == datestr){
                          var orderId = snapshot.child('Bill').child('OrderID').val();
                          var userId = snapshot.child('Bill').child('userId').val();
    
                       //adminData itemlist amount update 
                        snapshot.child('ItemList').forEach((itemlist) => {
                            const weight=itemlist.child('weight').val();
                            var vegtableRef=dbf.ref("VegetableEntry/"+ itemlist.child('id').val());
                            vegtableRef.once('value').then(function(vegtablelist){
                                const Price=vegtablelist.child('Rate').val();
                                const totalstr = Price * weight;
                                totalval = totalval + totalstr;
                                var item = {
                                    rate : ""+totalstr
                                    };
                                adminRef.child('Billing').child(orderId).child('ItemList').child(itemlist.key).update(item);
                            })
                         })
    
                         //admindata history  itemlist amount update
                         adminRef.child('History').child(orderId).child('ItemList').once('value').then(function(snapshot) {
                            snapshot.forEach((historyitem) => {
                            const weight=historyitem.child('weight').val();
                            var vegtableRef=dbf.ref("VegetableEntry/"+ historyitem.child('id').val());
                            vegtableRef.once('value').then(function(vegtablelist){
                                const Price=vegtablelist.child('Rate').val();
                                const totalstr = Price * weight;
                                totalval = totalval + totalstr;
                                var item = {
                                    rate : ""+totalstr
                                    };
                                adminRef.child('History').child(orderId).child('ItemList').child(historyitem.key).update(item);
                            })
                         })
                        })
    
    
                        // consumer itemlist
                        billingRef.child(userId).child(orderId).child('ItemList').once('value').then(function(snapshot) {
                            snapshot.forEach((historyitem) => {
                            const weight=historyitem.child('weight').val();
                            var vegtableRef=dbf.ref("VegetableEntry/"+ historyitem.child('id').val());
                            vegtableRef.once('value').then(function(vegtablelist){
                                const Price=vegtablelist.child('Rate').val();
                                const totalstr = Price * weight;
                                totalval = totalval + totalstr;
                                console.log("weight",weight);
                                var item = {
                                    rate : ""+totalstr
                                    };
                                 billingRef.child(userId).child(orderId).child('ItemList').child(historyitem.key).update(item);
                            })
                         })
    
                         if(totalval > 200){
                            totalval = totalval;
                         }else{
                            totalval=totalval - 30 + 50;
                         }
    
                         //admindata bill total and status  update
                          var updatebill = {
                            TotalRate : ""+totalval,
                            orderstate : "Approved"
                            };
    
                           adminRef.child('Billing').child(orderId).child('Bill').update(updatebill);
    
                           adminRef.child('History').child(orderId).child('Bill').update(updatebill);
    
                           billingRef.child(userId).child(orderId).child('Bill').update(updatebill);


                           const  registrationToken = "fjXKPGUqSoKNuiB_-4RMBF:APA91bFoVN-bdx9m21otiqeKCxSr-U2QbAZhbD_ouJMkxPzpUwmuI5bPG7CzqKA-BJ6Si5WdMfxZJV2r31Q5OlA2TWQYPD_A5GFLFaeo5nT63OBiKh8ATTiZd6qRErlphMQ41XgzGh4x"
                           const message = "message sent sucess fully"
                           const options =  notification_options
                           
                             admin.messaging().sendToDevice(registrationToken, message, options)
                             .then( response => {
                       
                            //   res.status(200).send("Notification sent successfully")
                              
                             })
                             .catch( error => {
                                 console.log(error);
                             });
                       
                         
                        })
    
                    }
                  });
            });
        
               var response = {
                message : "updated successfully"
                };
        
            res.send(response);
        }catch(e){
            console.log(e);
        }
    });
  

    server.put('/Approved', (req, res)=>{

        try{
            var totalval = 0.0;
            var dbf=admin.database();
            var adminRef=dbf.ref("AdminData");
            var billingRef=dbf.ref("Billing");
             //admindata bill total and status  update
         //adminData itemlist amount update 
         console.log(req.query.orderId)
         console.log(req.query.userId)

        //  adminRef.child('Billing').child(req.query.orderId).child('ItemList').forEach((itemlist) => {
        //     const weight=itemlist.child('weight').val();
        //     var vegtableRef=dbf.ref("VegetableEntry/"+ itemlist.child('id').val());
        //     vegtableRef.once('value').then(function(vegtablelist){
        //         const Price=vegtablelist.child('Rate').val();
        //         const totalstr = Price * weight;
        //         totalval = totalval + totalstr;
        //         var item = {
        //             rate : totalstr
        //             };
        //         adminRef.child('Billing').child(req.query.orderId).child('ItemList').child(itemlist.key).update(item);
        //     })
        //  })


         adminRef.child('Billing').child(req.query.orderId).child('ItemList').once('value').then(function(snapshot){
            snapshot.forEach((itemlist) => {
                const weight=itemlist.child('weight').val();
                var vegtableRef=dbf.ref("VegetableEntry/"+ itemlist.child('id').val());
                vegtableRef.once('value').then(function(vegtablelist){
                    const Price=vegtablelist.child('Rate').val();
                    const totalstr = Price * weight;
                    totalval = totalval + totalstr;
                    var item = {
                        rate : ""+totalstr
                        };
                    adminRef.child('Billing').child(req.query.orderId).child('ItemList').child(itemlist.key).update(item);
                })
            })
         })

         //admindata history  itemlist amount update
         adminRef.child('History').child(req.query.orderId).child('ItemList').once('value').then(function(snapshot) {
            snapshot.forEach((historyitem) => {
            const weight=historyitem.child('weight').val();
            var vegtableRef=dbf.ref("VegetableEntry/"+ historyitem.child('id').val());
            vegtableRef.once('value').then(function(vegtablelist){
                const Price=vegtablelist.child('Rate').val();
                const totalstr = Price * weight;
                totalval = totalval + totalstr;
                var item = {
                    rate : ""+totalstr
                    };
                adminRef.child('History').child(req.query.orderId).child('ItemList').child(historyitem.key).update(item);
            })
         })
        })


        // consumer itemlist
        billingRef.child(req.query.userId).child(req.query.orderId).child('ItemList').once('value').then(function(snapshot) {
            snapshot.forEach((historyitem) => {
            const weight=historyitem.child('weight').val();
            var vegtableRef=dbf.ref("VegetableEntry/"+ historyitem.child('id').val());
            vegtableRef.once('value').then(function(vegtablelist){
                const Price=vegtablelist.child('Rate').val();
                const totalstr = Price * weight;
                totalval = totalval + totalstr;
                console.log("weight",weight);
                var item = {
                    rate : ""+totalstr
                    };
                 billingRef.child(req.query.userId).child(req.query.orderId).child('ItemList').child(historyitem.key).update(item);
            })
         })

         if(totalval > 200){
            totalval = totalval;
         }else{
            totalval=totalval - 30 + 50;
         }

         //admindata bill total and status  update
          var updatebill = {
            TotalRate : ""+totalval,
            orderstate : req.query.status
            };

           adminRef.child('Billing').child(req.query.orderId).child('Bill').update(updatebill);

           adminRef.child('History').child(req.query.orderId).child('Bill').update(updatebill);

           billingRef.child(req.query.userId).child(req.query.orderId).child('Bill').update(updatebill);
         
        })

        
               var response = {
                message : "updated successfully"
                };
        
            res.send(response);
        }catch(e){
            console.log(e);
        }
    });


  server.put('/accepted', (req, res)=>{

    try{
        var dbf=admin.database();
        var adminRef=dbf.ref("AdminData");
        var billingRef=dbf.ref("Billing");
         //admindata bill total and status  update
         var updatebill = {
            orderstate : req.query.status
            };
    
           adminRef.child('Billing').child(req.query.orderId).child('Bill').update(updatebill);
    
           adminRef.child('History').child(req.query.orderId).child('Bill').update(updatebill);
    
           billingRef.child(req.query.userId).child(req.query.orderId).child('Bill').update(updatebill);
    
           var response = {
            message : "updated successfully"
            };
    
        res.send(response);
    }catch(e){
        console.log(e);
    }
});
//locationdata

const userRouter = require('./../router/user');
const adminRouter = require('./../router/admin');
const categoryRouter = require('./../router/category');
const ordersRouter = require('./../router/orders');

// var dbf=admin.database();
// var userRef=dbf.ref("AppUsers");


 
 let { protocal, host, port, name,username,password } = config.app.db;
//  let db= process.env.MONGODB_URL ||`mongodb+srv://admin:admin123@cluster0.qcrci.mongodb.net/examplecontact?retryWrites=true&w=majority`;
 let db= process.env.MONGODB_URL ||`mongodb+srv://admin:admin123@hoffen.cnl9m8a.mongodb.net/HoffenretryWrites=true&w=majority`;

console.log('connected to the database',db);

mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true
    },function(error){
        if(error)
        {
        console.log(error);
  }
        else
        {
        console.log('connected to the database',db);
        }
	});
	//locationdata

server.use("/user", userRouter);
server.use("/admin", adminRouter);
server.use("/category", categoryRouter);
server.use("/orders", ordersRouter);


server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



server.post('/payment', async (req, res) =>{
    try{
        const {email, name, amount} = req.body;
        // if(!email || !amount)
        //     return res.send('<h5>All fields are madatory</h5><a href="/">click here</a> to redirect to homepage.')

        const orderId = crypto.randomBytes(16).toString("hex");
        const customerId = crypto.randomBytes(16).toString("hex");

        //use your own logic to calculate total amount

        let paytmParams = {};
        paytmParams.body = {
            "requestType"   : "Payment",
            "mid"           : process.env.MERCHANT_ID,
            "websiteName"   : process.env.WEBSITE,
            "orderId"       : orderId,
            "callbackUrl"   : "https://learning-api-test.onrender.com/verify-payment",
            "txnAmount"     : {
                "value"     : amount,
                "currency"  : "INR",
            },
            "userInfo"      : {
                "custId"    : customerId,
                "email"     : email,
                "firstName" : name
            },
        };

        let txnInfo = await initializePayment(paytmParams);

        //logging API response.
        console.log(txnInfo);

        //converting string response to json.
        txnInfo = JSON.parse(txnInfo); 
    
        //check of transaction token generated successfully
        if(txnInfo && txnInfo.body.resultInfo.resultStatus == 'S'){

            //transaction initiation successful.
            //sending redirect to paytm page form with hidden inputs.
            const hiddenInput = {
                txnToken    : txnInfo.body.txnToken,
                mid         : process.env.MERCHANT_ID,
                orderId     : orderId
            }
            res.render('intermediateForm.ejs', {hiddenInput});

        }else if(txnInfo){

            //payment initialization failed.
            //send custom response
            //donot send this response. for debugging purpose only.
            res.json({message: "cannot initiate transaction", transactionResultInfo: txnInfo.body.resultInfo});

        }else{

            //payment initialization failed.
            //send custom response
            //donot send this response. for debugging purpose only.
            res.json({message: "someting else happens" })
        }

    }
    catch(e){console.log(e);}

});


//use this end point to verify payment
server.post('/verify-payment', async (req, res)=>{
    //req.body contains all data sent by paytm related to payment.
    //check checksumhash to verify transaction is not tampared.
    const paymentObject = await verifyPayemntAuthenticity(req.body);

    if(paymentObject){

        /* check for required status */
        //check STATUS
        //check for RESPONSE CODE
        //etc
        //save details for later use.
        console.log(paymentObject);
        res.send('<h1 style="text-align: center;">Payment Successful.</h1><h3 style="text-align: center;">Process it in backend according to need.</h3><h3 style="text-align:center;"><a href="/" style="text-align: center;">click here</a> to go to home page.</h3>');
    }
    else
        res.send('<h1 style="text-align: center;color: red;">Payment Tampered.</h1><h3 style="text-align: center;">CHECKSUMHASH not matched.</h3> <h3 style="text-align: center;><a href="/">click here</a> to go to home page.</h3>');
});

// server.use("/states", statesRouter);
// server.use("/citys", cityRouter);
module.exports= server;