const express = require('express');
const router = express.Router();
const config = require('../config');
const XLSX = require('xlsx');

const KitchenItemController = require('../controllers/KitchenItem.controller');

router.post('/placeOrder', (req,res)=>{
    const data = req.body;
    KitchenItemController.placeOrder(data).then((data)=>{
        res.send({isSuccess:true, data});
    }).catch((error)=>res.send({isSuccess:false, error}))
});
router.get('/getAll', (req,res)=>{
    KitchenItemController.getAll().then((data)=>{
        res.send({isSuccess:true, data});
    }).catch((error)=>res.send({isSuccess:false, error}))
});
router.all('/getPredictedValues', (req,res)=>{
    const option = req.body || {};
    KitchenItemController.getPredictedValues(option).then((data)=>{
        res.send({isSuccess:true, data});
    }).catch((error)=>res.send({isSuccess:false, error}))
});
router.post('/markAsDone', (req,res)=>{
    const option = req.body || {};
    KitchenItemController.markAsDone(option).then((data)=>{
        res.send({isSuccess:true, data});
    }).catch((error)=>res.send({isSuccess:false, error}))
});
router.get('/getReport', (req,res)=>{
    KitchenItemController.getReport().then((workbook)=>{
        XLSX.writeFile(workbook,'./public/reports/LatestKitchenReport.xlsx', {type:'buffer', bookType:"xlsx"});
        res.download('./public/reports/LatestKitchenReport.xlsx');
    }).catch((error)=>res.send({isSuccess:false, error}))
});

module.exports = router;