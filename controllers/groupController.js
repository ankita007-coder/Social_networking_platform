import { StatusCodes } from "http-status-codes";
import Groups from "../models/groupModel.js";


export const createGroups = async(req,res)=>{
    
    try {
        const {name,description,members,admin} = req.body;

        const groups = new Groups({
            name,description,members,admin
        })
        await groups.save();
       
        return res.status(StatusCodes.OK).json({msg:"Group created"})
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.BAD_REQUEST).send(error.message)
    }
}
export const getAllGroups = async(req,res)=>{
    try {
        const userId = req.query.userId; 
        const groups = await Groups.find({});
        const groupsWithMembershipStatus = groups.map((group) => {
          const isMember = group.members.includes(userId);
          return {
            ...group.toObject(),
            isMember,
          };
        });
    
        res.status(StatusCodes.OK).json({ groups: groupsWithMembershipStatus });
      } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Error fetching groups');
      }
}

export const addMemberToGroup = async(req,res)=>{
    const {userId} = req.body;
    try{
        const id = req.params.id;
        console.log(id);
        const updatedGroup = await Groups.findByIdAndUpdate(
            id,
            { $push: { members: userId } },
            { new: true }
        );
       res.status(StatusCodes.OK).json({msg:'Group joined',updatedGroup})

    }catch(error){
        console.log(error);
        res.status(StatusCodes.BAD_REQUEST).send(error)
    }
}
