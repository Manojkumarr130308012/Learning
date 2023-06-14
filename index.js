
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;


const config=require('./config/config.json');

const middleware=require('./middleware/middleware')
app.use(middleware);

app.post('/payment', async (req, res) =>{
    try{
        const {email, name, amount} = req.body;
        if(!email || !amount)
            return res.send('<h5>All fields are madatory</h5><a href="/">click here</a> to redirect to homepage.')

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
app.post('/verify-payment', async (req, res)=>{
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

app.listen(port, () => console.log(`url-shortener listening on port ${config.app.port}!`));