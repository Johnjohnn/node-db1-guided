const express = require("express")
const db = require("../data/config")

const router = express.Router()

router.get("/", async (req, res, next) => {
try{
     //SELECT * FROM message:
     const messages = await db.select("*").from("messages")
     res.json(messages)
}catch(err){
    next(err)
} 
})

router.get("/:id",async (req, res, next) => {
    try{
        //Translates to SELECT FROM messages WHERE id = LIMIT 1; so  you can get it with a certain ID 
        const [message]= await db
        .select("*")
        .from("messages")
        .where("id",req.params.id)
        .limit(1)
        res.json(message)
   }catch(err){
       next(err)
   } 
})

router.post("/", async(req, res, next) => {
try{
   const payload={
       title; req.body.title,
       contents: req.body.contents,
   }
     if (!payload.title || !payload.contents) {
         return res.status(400).json({
             message:"need a title and contents ,"
         })
     }
     const message = await db.insert(payload).into("messages")
     res.status(201).json(message)
}catch(){

}
})

router.put("/:id", (req, res, next) => {

})

router.delete("/:id", (req, res, next) => {

})

module.exports = router