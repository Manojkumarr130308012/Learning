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
			const year1 = date.getFullYear();
			const month1 = date.getMonth();
			// var month = currentTime.getMonth() + 1
            // var day = currentTime.getDate()
            // var year = currentTime.getFullYear()

			let vechiclestockyear = await vechicleSchema.find({Vechicle_type:"Stocks",year:year1});
			let vechiclestockyearcount=Object.keys(vechiclestockyear).length;

			let vechiclestockmonth = await vechicleSchema.find({Vechicle_type:"Stocks",month:month1});
			let vechiclestockmonthcount=Object.keys(vechiclestockmonth).length;

			let vechicleRetailyear = await vechicleSchema.find({Vechicle_type:"Retail",year:year1});
			let vechicleRetailyearcount=Object.keys(vechicleRetailyear).length;

			let vechicleRetailmonth = await vechicleSchema.find({Vechicle_type:"Retail",month:month1});
			let vechicleRetailmonthcount=Object.keys(vechicleRetailmonth).length;

			let vechicleNewStocksyear = await vechicleSchema.find({Vechicle_type:"NewStocks",year:year1});
			let vechicleNewStocksyearcount=Object.keys(vechicleNewStocksyear).length;

			let vechicleNewStocksmonth = await vechicleSchema.find({Vechicle_type:"NewStocks",month:month1});
			let vechicleNewStocksmonthcount=Object.keys(vechicleNewStocksmonth).length;

			let vechicleNewRetailyear = await vechicleSchema.find({Vechicle_type:"NewRetail",year:year1});
			let vechicleNewRetailyearcount=Object.keys(vechicleNewRetailyear).length;

			let vechicleNewRetailmonth = await vechicleSchema.find({Vechicle_type:"NewRetail",month:month1});
			let vechicleNewRetailmonthcount=Object.keys(vechicleNewRetailmonth).length;
			
			
			return {
				vechiclestock: vechiclestockcount,
				vechicleretail:vechicleretailcount,
				vechiclenewstock:vechiclenewstockcount,
				vechiclenewretail:vechiclenewretailcount,
				vechiclestockyearcount:vechiclestockyearcount,
				vechiclestockmonthcount:vechiclestockmonthcount,
				vechicleRetailyearcount:vechicleRetailyearcount,
				vechicleRetailmonthcount:vechicleRetailmonthcount,
				vechicleNewStocksyearcount:vechicleNewStocksyearcount,
				vechicleNewStocksmonthcount:vechicleNewStocksmonthcount,
				vechicleNewRetailyearcount:vechicleNewRetailyearcount,
				vechicleNewRetailmonthcount:vechicleNewRetailmonthcount
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