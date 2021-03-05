const users_socket = {}
const socket_user = {}
const fs = require('fs');
const filename = "../data/userInfo.json"
fs.writeFile(filename,JSON.stringify([]),()=>{});
const addUser = (socket,name) =>{
        //name = name.trim().toLowerCase();
        //console.log(typeof(name));
        //name= string(name);
        users_socket[name]=socket.id;
        socket_user[socket.id] = name;
        //console.log(users_socket)
        //console.log(socket_user)
        let data = fs.readFileSync(filename)         
            // Check for errors 
            //if (err) throw err; 
            // Converting to JSON 
        let data_stored = JSON.parse(data); 
        if(data_stored.indexOf(name)==-1)
        {
            data_stored.push(name);
        }
        fs.writeFile(filename,JSON.stringify(data_stored),()=>{});

    }

const removeUser = (socket) =>{
    if(socket in socket_user)
    {
        const name = socket_user[socket.id];
        delete users_socket[name];
        delete socket_user[socket.id];
        //console.log(users_socket);
        //console.log(socket_user);
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

const returnAllUsers = () =>{
    let data = fs.readFileSync(filename);
    let data_stored = JSON.parse(data);
    console.log(data_stored);
    return data_stored;  
}

const addData = (name,data_sent) =>{
    let allUsers = fs.readFileSync(filename)         
    let data1 = JSON.parse(allUsers); 
    if(data1.indexOf(name)==-1)
    {
        return;
    }
    const file = "../data/"+name+".json"
    console.log(file)
    let data = fs.readFileSync(file);
        // Converting to JSON 
    let data_stored = JSON.parse(data); 
    console.log(data_stored);

    data_stored.push(data_sent);
    console.log(data_stored);
    fs.writeFileSync(file,JSON.stringify(data_stored));
}


module.exports = { addUser, removeUser, getUser ,returnAllUsers , addData};