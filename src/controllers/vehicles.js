/* eslint-disable no-unused-vars */
const res = require('express/lib/response');
const vehicleModel = require('../models/vehicles');
const vehicles = require('../routes/vehicles');


const getVehicles =  (req,res) =>{
	vehicleModel.getVehicles(results =>{
		return res.json({
			success : true,
			message : 'List vehicles',
			results : results
		});
	});
};

const getVehicle = (req,res) =>{
	const {id} = req.params;
	vehicleModel.getVehicle(id, results =>{
		if (results.length > 0){
			return res.send ({
				success : true,
				message : 'Detail vehicle',
				results : results[0]
			});
		}
		else {
			return res.status(404).send({
				success : false,
				message : 'Vehicle not found'
			});
		}
	});
   
};

const deleteVehicle = (req,res)=>{
	const {id} = req.params;
	vehicleModel.deleteVehicle(id,()=>{
		return res.send({
			success : true,
			message : 'Deleted sucess'
		});
	});
};

const postVehicle = (req,res) =>{
	let data = {
		name : req.body.name,
		location : req.body.location,
		description : req.body.description,
		price : req.body.price,
		status : req.body.status,
		stock : req.body.stock,
		image : req.body.image
	};
    
	vehicleModel.postVehicle(data, (results) =>{
		return res.send({
			success : true,
			message : 'Vehicle has been inserted',
		});
	});
};

const patchVehicle = (req,res) =>{
	const {id} = req.params;
	let data = {
		name : req.body.name,
		location : req.body.location,
		description : req.body.description,
		price : req.body.price,
		status : req.body.status,
		stock : req.body.stock,
		image : req.body.image
	};
	vehicleModel.patchVehicle(id,data,results =>{
		return res.send({
			success : true,
			message : 'Data has been update',
			results
		});
	});
    
};

module.exports = {getVehicles, getVehicle, deleteVehicle, postVehicle, patchVehicle};