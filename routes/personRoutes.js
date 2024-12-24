const express=require('express');
const router = express.Router();
const person = require('./../models/person');

router.post('/', async (req, res) => {
    try {
        const data = req.body //Assuming the request body contains the person data

        //create anew person document using the mongoose model
        const newPerson = new person(data);

        ///save the new person to the database
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' });
    }
})
//get method to get the person
router.get('/', async (req, res) => {
    try {
        const data = await person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' });

    }

})
router.get('/:workType',async(req,res)=>{
    
    try{
        const workType=req.params.workType; //Extract the work type from the url parameter
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const response=await person.find({work:workType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error:'invalid work type'});
        }

    }
    catch(err){
        console.error('Error fetching menu data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id',async(req,res)=>{
    try{
        const personid=req.params.id; //extract the id from the url parameter
        const updatePersonData=req.body  //update data for the url parameter
        const response=await person.findByIdAndUpdate(personid,updatePersonData,{
            new:true,    // return the updated document
            runValidators:true   // run mongoose validation
        })
        if(!response){
            return res.status(404).json({error:'person not found'});
        }
        console.log('data updated');
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'internal server error' });

    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;  // etract the person id from the url parameter
        
        //assuming you have a person model
        const response=await person.findByIdAndDelete(personId)
        if(!response){
            return res.status(404).json({error:'person not found'});
        }
        console.log('data delete');
        res.status(200).json({response:'person delted succeffuly'});

    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'internal server error' });
    }
})

module.exports=router;