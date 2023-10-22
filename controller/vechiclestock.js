const vechicleSchema = require('../model/vechiclestock');
const errorHandler = require('../utils/error.handler');

class VechicleController {


    async add(farm){
		try{
			let response = await vechicleSchema.create(farm);
			return { status: "success",   msg:"vechiclestock Added successfully", result: response, message: "Added Successfully" };
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}
	
	async fetch(body){
		try{

            
			let response = await vechicleSchema.find({});
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
			let response = await vechicleSchema.find({_id:id});
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
			let response = await vechicleSchema.deleteOne({_id: id});
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
            let response = await vechicleSchema.update({_id: id}, body);
            return { status: "success", msg:"vechiclestock Updated successfully",result: response, message: "Updated Successfully" };

        } catch (error) {
            return { status: "error", error: error };
        }

    }


	async orderfetch(){
		try{ 
			let response ;
			// var dbf=admin.database();
            //  var userRef=dbf.ref("AppUsers");
			// // userRef.once('value').then(function(snapshot) {
			// // 	response = snapshot.val();
			// // 	console.log(response);
			// // })

			// userRef.on('value',snap =>{
			// 	response = snap.val();
			// 	console.log(response)
			// });
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

       

module.exports=new VechicleController();