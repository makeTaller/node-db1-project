const express = require("express"); 
const { where } = require("./data/dbConfig");
const db = require("./data/dbConfig")

const router = express.Router();


router.get("/", (req, res) =>{
        //this code
        db.select("*")
          .from("accounts")
          .then( ( account ) => {
              res.status(200).json({ data: account })
          }) 
          .catch((err) =>{
              console.log("error", err )
              res.status(500).json({ message: err.message });_
            })
            
})

router.get("/:id", (req, res) =>{
        //this code
        const  { id } = req.params;

        db.select("*")
          .from("accounts")
          .where( { id } )
          .first()
          .then( ( account ) => {
              res.status(200).json({ data: account })
          }) 
          .catch((err) =>{
              console.log("error", err )
              res.status(500).json({ message: err.message });_
            })
})

router.post("/", (req,res) => {
    const records = {
        name: req.body.name,
        budget: req.body.budget,
    };

    db('accounts') 
      .insert(records, "id")
      .then( (record_ID) => {
          db('accounts')
            .where({ id: record_ID[0] })
            .then(record => {
                res.status(200).json({ data: record})
            })
            .catch( error => {
              res.status(500).json(error)
            })
      })
      .catch( error => {
        res.status(500).json(error)
      })
})

router.put("/:id", (req,res) => {
    const { id } = req.params

    console.log(id)

    const record = { 
        name: req.body.name,
        budget: req.body.budget
    } 

    db('accounts')
        .where({ id })
        .update(record, " id")
        .then( count => {
            if (count > 0) {
                res.status(204).json( { data: count })
            }else (
                res.status(404).json({ message: "There is no message to update"})
            )
        })
        .catch (error => {
            res.status(500).json({ message: " No such thing."})
        })
        
})

router.delete("/:id", async (req,res, next) =>{ 

    try {
       const { id } = req.params
       await db('accounts').where( "id", req.params.id ).del()
        res.status(204).end()
    }catch (error) {
        next(error)
    }


})

module.exports = router;