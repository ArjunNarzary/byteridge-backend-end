const db = require('_helpers/db');
const User = db.User;
const Session = db.Session

module.exports = {
    createSession,
    getAll
};


async function createSession(userParam) {
    // Find user
    const user = await User.findById(userParam?.id);

    //Insert session in Session table
    if(user){
        const userObj = {
            user: user?._id,
            type: userParam?.type,
            ip: userParam?.ip
        }
       const session =  new Session(userObj);
        // save session
        await session.save();
    }
}

async function getAll(req) {
    const authUser = req?.body?.authUser;
    const pageNo = req?.query.page;
    const limit = 10;  //Setting limit 10 as default

    if (authUser?.role === "AUDITOR"){
        //Counting total docs to calculate total pages to reder pagination in front-end
        const totalDocs = await Session.find().countDocuments();
        const sessions = await Session.find().populate('user', '-hash').sort({ createdDate: -1 }).skip(pageNo * limit).limit(limit);
        const totalPages = Math.ceil(totalDocs/limit)
        return {
            totalPages,
            sessions
        }
    }
}