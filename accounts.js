const express = require("express") 
const db = require("./data/dbConfig")

const router = express.Router();


router.get("/", (req, res) =>{
        //this code
        db.select("*")
          .from("accounts")
          .then( ( account ) => {
              res.status(400).json({ data: account })
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
          .where("id", id )
          .first()
          .then( ( account ) => {
              res.status(400).json({ data: account })
          }) 
          .catch((err) =>{
              console.log("error", err )
              res.status(500).json({ message: err.message });_
            })
})

router.post("/:id", (req,res) => {
    const { id } = req.params;

    db.update("accounts") 
      .where("id", id )
      .then( (account) => {
          res.status(400).json({ data: account })
      })
})



module.exports = router;