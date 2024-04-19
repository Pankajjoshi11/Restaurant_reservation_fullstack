import ErrorHandeler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";


export const sendReservation = async(req,res,next)=>{
    const{firstName,lastName,email,phone,date,time,people} = req.body;
    if(!firstName|| !lastName|| !email|| !phone || !date|| !time || !people)
    {
        return next(new ErrorHandeler("Please fill all the fields",400));
    }
    try{
        await Reservation.create({firstName,lastName,email,phone,date,time,people});
        res.status(201).json({
            success:true,
            message:"Reservation sent successfully",
        });
    }
    catch(error){
        if(error.name === "ValidationError"){
            const ValidationErrors=Object.values(error.errors).map((err)=>err.message)
            return next(new ErrorHandeler(ValidationErrors.join(" , "),400));
        }
    }
}

export default sendReservation;