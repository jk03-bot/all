const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');
const app=express();
const PORT=3000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
mongoose.connect("mongodb://localhost:27017/Lab",{useNewUrlParser:true
}).then(()=>console.log("Db connected")).catch((err)=>console.log(err));
const FoodSchema= new mongoose.Schema({
    name:String,
    price:String,
    des:String
});
const Food=mongoose.model("Food",FoodSchema);
app.get('/api/food',async (req,res)=>{
           try{
            const foods=await Food.find({});
            res.json(foods);
           }catch(err)
           {
            res.status(500).send(err);
           }
});
app.post('/api/food',async (req,res)=>{
    try{
        const {name,price,des}=req.body;
        const newFood=new Food({
            name,
            price,
            des
        });
        const food= await newFood.save();
        res.json(food);

    }catch(err)
    {
        res.status(500).send(err);
    }
});
app.delete('/api/food/:id',async(req,res)=>{
   try{ const foodId=req.params.id;
    await Food.findByIdAndDelete(foodId);
    res.json({message:'User deleted'});
   }catch(err)
   {
    res.status(500).send(err);
   }

});
app.listen(PORT,()=>{
    console.log(`Server running on port http://localhost:${PORT}`);
});
