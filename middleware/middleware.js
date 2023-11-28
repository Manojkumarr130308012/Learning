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
    

                          var appUserRef = dbf.ref("AppUsers")
                          let refreshtoken;
                          //admindata bill total and status  update
                          appUserRef.child(req.query.userId).on('value',function(snapshot){
                            refreshtoken = snapshot.child('token').val();
                               console.log("refreshtoken",refreshtoken);
                               try{
                                var response;
                                    try{
                                        const notification_options = {
                                            priority: "high",
                                            timeToLive: 60 * 60 * 24
                                          };
                                         let payload = {
                                            notification: {
                                              title: "NR Vegtable",
                                              body: "Your order is Approved.Please Accept the order"
                                            }
                                          };                
                               admin.messaging().sendToDevice(refreshtoken,payload, notification_options)
                              .then( response => {
                        
                                response = {
                                    message : response
                                    };
                                    res.send(response);
                               
                              })
                              .catch( error => {
                                  console.log(error);
                              });
                                    
                                    }catch(e){
                                         response = {
                                            message : e
                                            };
                                            console.log(response)
                                    }
                                  
                               
                            }catch(e){
                                console.log(e);
                            }
                        });
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
            var appUserRef = dbf.ref("AppUsers")
            let refreshtoken;
            //admindata bill total and status  update
            appUserRef.child(req.query.userId).on('value',function(snapshot){
                refreshtoken = snapshot.child('token').val();
                   console.log("refreshtoken",refreshtoken);
                   try{
                    var response;
                        try{
                            const notification_options = {
                                priority: "high",
                                timeToLive: 60 * 60 * 24
                              };
                             let payload = {
                                notification: {
                                  title: "NR Vegtable",
                                  body: "Your order is Approved.Please Accept the order"
                                }
                              };                
                   admin.messaging().sendToDevice(refreshtoken,payload, notification_options)
                  .then( response => {
            
                    response = {
                        message : response
                        };
                        res.send(response);
                   
                  })
                  .catch( error => {
                      console.log(error);
                  });
                        
                        }catch(e){
                             response = {
                                message : e
                                };
                                console.log(response)
                        }
                      
                   
                }catch(e){
                    console.log(e);
                }
            });


        
             //admindata bill total and status  update
         //adminData itemlist amount update 
         console.log(req.query.orderId)
         console.log(req.query.userId)

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

           var response = {
            message : "updated successfully"
            };
    
        res.send(response);
         
        })     

        }catch(e){
            console.log(e);
        }
    });

    server.put('/accepted', (req, res)=>{

    try{
        var dbf=admin.database();
        var adminRef=dbf.ref("AdminData");
        var billingRef=dbf.ref("Billing");
        var appUserRef = dbf.ref("AppUsers")
        let refreshtoken;
        //admindata bill total and status  update
        appUserRef.child(req.query.userId).on('value',function(snapshot){
            refreshtoken = snapshot.child('token').val();
               console.log("refreshtoken",refreshtoken);
               try{
                var response;
                    try{
                        const notification_options = {
                            priority: "high",
                            timeToLive: 60 * 60 * 24
                          };
                         let payload = {
                            notification: {
                              title: "NR Vegtable",
                              body: "Your order is "+req.query.status
                            }
                          };                
               admin.messaging().sendToDevice(refreshtoken,payload, notification_options)
              .then( response => {
        
                response = {
                    message : response
                    };
                    res.send(response);
               
              })
              .catch( error => {
                  console.log(error);
              });
                    
                    }catch(e){
                         response = {
                            message : e
                            };
                            console.log(response)
                    }
                  
               
            }catch(e){
                console.log(e);
            }
        });
        var response;
         //admindata bill total and status  update
         var updatebill = {
            orderstate : req.query.status
            };
    
            try{
                adminRef.child('Billing').child(req.query.orderId).child('Bill').update(updatebill);
    
                adminRef.child('History').child(req.query.orderId).child('Bill').update(updatebill);
         
                appUserRef.child(req.query.userId).child(req.query.orderId).child('Bill').update(updatebill);
                
                 response = {
                    message : "updated successfully"
                    };
            }catch(e){
                 response = {
                    message : e
                    };
            }
          
    
    
    
        res.send(response);
    }catch(e){
        console.log(e);
    }
    });

    server.get('/notification/send', (req, res)=>{
    try{
        var response;
        let refreshtoken;
        var dbf=admin.database();
        var adminRef=dbf.ref("AdminData");
        var appUserRef = dbf.ref("AppUsers")
         //admindata bill total and status  update


         appUserRef.child(req.query.userId).on('value',function(snapshot){

            if(snapshot != null){
                refreshtoken = snapshot.child('token').val();
                console.log("refreshtoken",refreshtoken);
                try{
                 var response;
                     try{
                         const notification_options = {
                             priority: "high",
                             timeToLive: 60 * 60 * 24
                           };
                          let payload = {
                             notification: {
                               title: "NR Vegtable",
                               body: "Your order is "+req.query.status
                             }
                           };                
                admin.messaging().sendToDevice(refreshtoken,payload, notification_options)
               .then( response => {
         
                 response = {
                     message : response
                     };
                     res.send(response);
                
               })
               .catch( error => {
                   console.log(error);
               });
                     
                     }catch(e){
                          response = {
                             message : e
                             };
                             console.log(response)
                     }
                   
                
             }catch(e){
                 console.log(e);
             }
            }else{
                adminRef.child(req.query.userId).on('value',function(snapshot){

                    if(snapshot != null){
                        refreshtoken = snapshot.child('token').val();
                        console.log("refreshtoken",refreshtoken);
                        try{
                         var response;
                             try{
                                 const notification_options = {
                                     priority: "high",
                                     timeToLive: 60 * 60 * 24
                                   };
                                  let payload = {
                                     notification: {
                                       title: "NR Vegtable",
                                       body: "Your order is "+req.query.status
                                     }
                                   };                
                        admin.messaging().sendToDevice(refreshtoken,payload, notification_options)
                       .then( response => {
                 
                         response = {
                             message : response
                             };
                             res.send(response);
                        
                       })
                       .catch( error => {
                           console.log(error);
                       });
                             
                             }catch(e){
                                  response = {
                                     message : e
                                     };
                                     console.log(response)
                             }
                           
                        
                     }catch(e){
                         console.log(e);
                     }
                    }else{
                        
                    }
                    
                });
            }
            
        });          
       
    }catch(e){
        console.log(e);
    }
    });
//locationdata

const userRouter = require('./../router/user');
const adminRouter = require('./../router/admin');
const categoryRouter = require('./../router/category');
const ordersRouter = require('./../router/orders');
const VechicleStockRouter = require('./../router/vechiclestock');
const customerRouter = require('./../router/customer');
const groceryusersRouter = require('./../router/groceryusers');
const grocerycategoryRouter = require('./../router/grocerycatecory');
const groceryproductRouter = require('./../router/groceryproducts');

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
server.use("/vechiclestock", VechicleStockRouter);
server.use("/customer", customerRouter);
server.use("/groceryusers", groceryusersRouter);
server.use("/grocerycategory", grocerycategoryRouter);
server.use("/groceryproduct", groceryproductRouter);


server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));







// server.use("/states", statesRouter);
// server.use("/citys", cityRouter);
module.exports= server;