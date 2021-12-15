import React ,{useState,useEffect} from 'react'
import queryString from 'query-string' // for getting query paramters
import io from 'socket.io-client'
import './Chat.css'
import InfoBar from '../infoBar/InfoBar'
import Input from '../input/Input'
import MessageComp from '../messages/Messages'
import ActiveUsers from '../activeUsers/AllUsers'

let socket ;

const Chat = ({location}) => { //location has query paramters in it, it is given built in
    const [name , setName] = useState('')
    const [room, setRoom] = useState('')
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const ENDPOINT = 'https://mernrealtimechatapp.herokuapp.com/';

    useEffect(()=> {
        const {name , room} = queryString.parse(location.search)

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room)
        console.log(socket)

        socket.emit('join' , {name , room} ,() => {
            // error meassage show here
        })

        return () => {
            socket.emit('disconnection'); // disconnects connection

            socket.off(); // turns off user's socket
        }
    },[ENDPOINT , location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages , message])
        })

        socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
    },[messages])


    // function for sending
    const sendMessage = (e) => {
        e.preventDefault()
        if(message){// calls if only we have put any text in message field
            socket.emit('sendMessage' , message , () => {
                setMessage('')
            })
        }
    }

    console.log(message, messages)


    return (
        <>
            <div className="outerContainer">
                <div className="container">
                    <InfoBar room={room} />
                    <MessageComp messages={messages} name={name} />
                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                </div>
                <ActiveUsers users={users} />
            </div>
        </>
    )
}

export default Chat
