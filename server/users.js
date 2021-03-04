const users_socket = {}
const socket_user = {}

const addUser = (socket,name) =>{
        //name = name.trim().toLowerCase();
        //console.log(typeof(name));
        //name= string(name);
        users_socket[name]=socket.id;
        socket_user[socket.id] = name;
        console.log(users_socket)
        console.log(socket_user)
}

const removeUser = (socket) =>{
    if(socket in socket_user)
    {
        const name = socket_user[socket.id];
        delete users_socket[name];
        delete socket_user[socket.id];
        console.log(users_socket)
        console.log(socket_user)
    }
}

const getUser = (name) =>{
    if(name in users_socket)
    {
        return ([1,users_socket[name]]);
    }
    else{
        const returned_name = "none"
        return ([0,returned_name]);
    }
}

module.exports = { addUser, removeUser, getUser };