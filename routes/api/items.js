const express = require('express')
const { short } = require('webidl-conversions')
const router = express.Router()

const Item = require('../../models/item')


//@route    GET api/items
//@desc     Get all items
//@access   Public
router.get('/',(req,res)=>{
    Item
        .find()
        .sort({date : 1})
        .then(items=>res.json(items))
        .catch(err=>res.json({success : false, msg : err}))
})

//@route    POST api/items
//@desc     Add new item
//@access   Public
router.post('/',(req,res)=>{
    const newItem = new Item({
        name : req.body.name
    })
    console.log(newItem);
    newItem
        .save()
        .then(item=> res.json({success : true, item}))
        .catch(err=>res.json({success : false, msg : err}))
})

//@route    POST api/items/:id
//@desc     Delete 1 item by Id
//@access   Public
router.delete('/:idItem',(req,res)=>{

    Item.findById(req.params.idItem)
        .then(item=> item.remove().then(()=>res.json({success : true})))
        .catch(err=>{
            res.status(404).json({success : false, id : req.params.idItem, msg : err})
        })
        
})

module.exports=router;