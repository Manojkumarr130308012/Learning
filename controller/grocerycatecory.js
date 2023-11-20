const grocerycategorySchema = require('../model/grocerycatecory');
const errorHandler = require('../utils/error.handler');

class GroceryCategoryController {


    async add(farm){
		try{
			let response = await grocerycategorySchema.create(farm);
			return { status: "success",   msg:"category Added successfully", result: response, message: "Added Successfully" };
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}
	
	async fetch(body){
		try{

            
			let response = await grocerycategorySchema.find({});
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
			let response = await grocerycategorySchema.find({_id:id});
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
			let response = await grocerycategorySchema.deleteOne({_id: id});
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
            let response = await grocerycategorySchema.update({_id: id}, body);
            return { status: "success", msg:"orders Updated successfully",result: response, message: "Updated Successfully" };

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
  
	async login(responce){
        let name=responce.name;
        let password=responce.password;
        try{
            let user = await grocerycategorySchema.findOne({
                name: name,
                password: password,
            });

            if(!user){
                throw new Error('invalid creds');
            }

            return {
                status: "1",
                msg: "Login Sucessfully",
                user
            };

        } catch(error){
            return {
                status: '0',
                msg: 'username or password invalid'
            }
        }
    }

	
}

       

module.exports=new GroceryCategoryController();