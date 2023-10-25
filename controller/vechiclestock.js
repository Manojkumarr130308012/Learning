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


	async fetchdatabystatus(status){
		try{
			let response = await vechicleSchema.find({Vechicle_type:status});
			return response;	
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}


	async fetchdatabystatuscount(){
		try{
			let vechiclestock = await vechicleSchema.find({Vechicle_type:"Stocks"});
			let vechiclestockcount=Object.keys(vechiclestock).length;
			let vechicleretail = await vechicleSchema.find({Vechicle_type:"Retail"});
			let vechicleretailcount=Object.keys(vechicleretail).length;
			let vechiclenewstock = await vechicleSchema.find({Vechicle_type:"NewStocks"});
			let vechiclenewstockcount=Object.keys(vechiclenewstock).length;
			let vechiclenewretail = await vechicleSchema.find({Vechicle_type:"NewRetail"});
			let vechiclenewretailcount=Object.keys(vechiclenewretail).length;


			const date = new Date();
			const year = date.getFullYear();
			let month = date.getMonth() + 1;
			// var month = currentTime.getMonth() + 1
            // var day = currentTime.getDate()
            // var year = currentTime.getFullYear()

			let vechiclestockyear = await vechicleSchema.find({Vechicle_type:"Stocks",year:year});
			let vechiclestockyearcount=Object.keys(vechiclestockyear).length;

			let vechiclestockmonth = await vechicleSchema.find({Vechicle_type:"Stocks",month:month});
			let vechiclestockmonthcount=Object.keys(vechiclestockmonth).length;
			
			return {
				vechiclestock: vechiclestockcount,
				vechicleretail:vechicleretailcount,
				vechiclenewstock:vechiclenewstockcount,
				vechiclenewretail:vechiclenewretailcount,
				vechiclestockyearcount:vechiclestockyearcount,
				vechiclestockmonthcount:vechiclestockmonthcount
			};	
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