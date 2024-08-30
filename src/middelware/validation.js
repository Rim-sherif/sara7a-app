
let sides = ['body','params','query','headers']

export function validation(Schema){
return(req,res,next)=>{
    sides.forEach((ele)=>{
        if(req[ele]){
            let{error} = Schema.validate(req[ele],{abortEarly:false})
            if(!error){
                next()
            }else{
                res.json({ message: "error",error:error.details});
            }
        }
        }
    )}

}