const ordersSchema = require('../model/orders');
const errorHandler = require('../utils/error.handler');
var admin = require("firebase-admin");
var serviceAccount = require("./../admin.json");
const { use } = require('../router/user');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://letschat-f9f77.firebaseio.com"
});
class CategoryController {


    async add(farm){
		try{
			let response = await ordersSchema.create(farm);
			return { status: "success",   msg:"orders Added successfully", result: response, message: "Added Successfully" };
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}
	
	async fetch(body){
		try{

            
			let response = await ordersSchema.find({});
			let count=Object.keys(response).length;
			return {
				response: response,
				count:count
			};
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}
  

	async fetchdata(id){
		try{
			let response = await ordersSchema.find({_id:id});
			return response;	
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}

	async delete(id){
		try{
			let response = await ordersSchema.deleteOne({_id: id});
			return {
				status: "success",
				response: response
			};
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}

	async update(id, body) {

        try {
            let response = await ordersSchema.update({_id: id}, body);
            return { status: "success", msg:"orders Updated successfully",result: response, message: "Updated Successfully" };

        } catch (error) {
            return { status: "error", error: error };
        }

    }


	async orderfetch(){
		try{ 
			let response ;
			var dbf=admin.database();
             var userRef=dbf.ref("AppUsers");
			// userRef.once('value').then(function(snapshot) {
			// 	response = snapshot.val();
			// 	console.log(response);
			// })

			userRef.on('value',snap =>{
				response = snap.val();
				console.log(response)
			});
			return {
				response: response
			};
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}
  

	
}

       

module.exports=new CategoryController();