//  Here We will manage all users joing, leaving etc.

const users = [];

// Adding  user
const addUsers = ({id , name , room}) => {
     name = name.trim().toLowerCase();
     room = room.trim().toLowerCase();
    const existingUser = users.find((user) => users.name === name && users.room === room); // checking user already ecxists or not
    // if user exists
    if(existingUser){
        return {error : "User Already Exists"}
    }
    // if user does not exists, add new user
    const user = {id , name , room}

    users.push(user);
    return {user}
}

// removing user
const removeUser = ({id}) => {
    const  index = users.find((user) => users.id === id)

    if(index !== -1){ // removing user if found
        return users.splice(index,1)[0];
    }
}

// getting specific  user
const getUser = (id) =>  users.find((user) => user.id === id);

// getting All users in room
const getUsersInRoom = (room) => users.filter((user) => user.room === room)


module.exports = {
    addUsers,
    removeUser,
    getUser,
    getUsersInRoom
}