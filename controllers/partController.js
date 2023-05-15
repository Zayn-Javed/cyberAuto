const jwt = require("jsonwebtoken")
const appModel = require('../models/jobapplicationModel');
const { param } = require("../routes/userRoute");
const jobModel = require('../models/jobModel');
const multer = require ('multer')

let applyJob = (req,res)=>{
    let userId= req.decoded.id
    let jobId= req.params.id
    let {covermessage} = req.body;
    let appliaction=new appModel({
        userId,
        jobId,
        covermessage,
        resume: req.files.map(file => file.path)
    });
    appliaction.save().then((appliaction)=>{
        res.status(200).json({"message":"job successfully applied", appliaction:appliaction})
    }).catch(err=>{
        res.status(400).json({err:err, "message":"job cannot be applied"})
    })
}


const storage = multer.diskStorage({
    destination:(req , file , cb)=>{
        cb(null , 'uploads')
    },
    filename:(req , file , cb)=>{
        cb(null ,Date.now()+file.originalname)
    }
})


const filter = (req , file , cb)=>{
    if(file.mimetype == 'application/pdf'){
        cb(null , true)
    }else{
        cb(new Error("UnSupported file") , false)
    }
}


const upload = multer({
   storage:storage,
   fileFilter:filter,
    limits:1024*1024*10
})


let viewApplication = (req, res)=>{
    jobModel.find({employeerId: req.decoded.id}).then((allJobs)=>{
        var result = []
        appModel.find().then(data => {
            
            for (let index = 0; index < allJobs.length; index++) {
                const element = allJobs[index];
                for (let index1 = 0; index1 < data.length; index1++) {
                    const element2 = data[index1];
                    if (element2.jobId!=null) {
                        if (element._id.toString()==element2.jobId.toString()) {
                            result.push(element2)
                        }    
                    }
                    
                }
            }
        res.send(result);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving applications."
        });
        });
    })
    
}


let updateApplicationStatus= (req,res)=>{
    let status = req.body.status;
    let applicationId = req.params.id
    appModel.findOne({_id:applicationId}).then(concernedJobApp=>{
        if(!concernedJobApp){
            res.status(404).send({"Message":"job not exists"})
        }else{
            if(concernedJobApp.status=='not seen'){
                concernedJobApp.status= status
                concernedJobApp.save().then((result)=>{
                    res.status(200).send({"Message":"job application successfully accepted!", "application": result})
                })
            }else{
                res.status(404).send({"Message":"job appication stats has already been updated!"})
            }        
        }
    }).catch(e=>{
        res.status(500).send({"e":e})
    })
}


module.exports = {
    applyJob,
    viewApplication,
    updateApplicationStatus, 
    upload
}