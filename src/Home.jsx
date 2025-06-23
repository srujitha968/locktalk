import React, { useState } from 'react'
import './home.css'
import axios from 'axios'

function Home() {

    const [colorchange, setColorchange] = useState(true)
    const [showform, setShowform] = useState(true)
    const [msg, setMsg] = useState('')
    const [password, setPassword] = useState('')
    const [secret, setSecret] = useState('')

    function lighttheme(){
        setColorchange(false)
    }

    function darktheme(){
        setColorchange(true)
    }

    function onEncrypt(){
        setShowform(true)
        setMsg('')
        setPassword('')
        document.getElementById('result').innerHTML=""
    }

    function onDecrypt(){
        setShowform(false)
        setSecret('')
        setPassword('')
        document.getElementById('result').innerHTML=""
    }

    const ondataEncrypt = async(e) =>{
        e.preventDefault();

        const res = await axios.post(`https://locktalk-spring.railway.internal/encrypt?msg=${msg}&password=${password}`)
        if(res.data=="Please fill the above 2 fields"){
            setMsg('')
            setPassword('')
            document.getElementById('result').innerHTML="Please fill the above 2 fields"  
        }
        else{
            setSecret(res.data)
            setMsg('')
            setPassword('')
            document.getElementById('result').innerHTML="Copy the secret message and click on decrypt to the know the message"
        }
    }

    const onDatadecrypt = async(e) =>{
        e.preventDefault();

        const res = await axios.post(`https://locktalk-spring.railway.internal/decrypt?secret=${secret}&password=${password}`)
        if(res.data=="Invalid details"){
            document.getElementById("result").innerHTML=res.data
            setPassword('')
            setSecret('')
        }
        else{
            document.getElementById('result').innerHTML=""
            setMsg(res.data)
            setPassword('')
            setSecret('')
        }
    }

    return (
        <>
            <div id='first' className={ colorchange ? 'dark-theme' : 'light-theme'}>
                <div id='second'>
                    <img src='/moon.png' className={colorchange ? 'img-white' : 'img-black'} onClick={darktheme}/>
                    <img src='/sun.png'  onClick={lighttheme}/>
                </div>
                <div id='third'>
                    <h1>Lock-talk</h1><br/>
                    <div id='fourth'>
                        <button style={{background:'green'}} onClick={onEncrypt}>Encrypt</button>
                        <button style={{background:'red'}} onClick={onDecrypt}>Decrypt</button>
                    </div>
                    <div id='five'>
                        { showform ? (
                            <div>
                                <br/><h1 style={{textAlign:'center', textDecoration:'underline'}}>Encrypt</h1> <br/><br/>
                                <form method='POST'>
                                    <label>Enter the msg</label><br/>
                                    <textarea 
                                        type='text' required
                                        name='msg'
                                        placeholder='Enter the msg'
                                        value={msg}
                                        onChange={(e)=>setMsg(e.target.value)}
                                    /><br/><br/>

                                    <label>Password</label><br/>
                                    <input 
                                        type='password' required
                                        name='password'
                                        placeholder='type the password'
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
                                    /> <br/><br/>

                                    <label>Secret Msg</label> <br/>
                                    <input
                                        type='text' readOnly
                                        value={secret}
                                        placeholder='Secret message will appear here'
                                    /><br/><br/>

                                    <button onClick={ondataEncrypt}>Submit</button>
                                    
                                </form>
                            </div>
                            ) : (
                                <div>
                                    <br/><h1 style={{textAlign:'center', textDecoration:'underline'}}>Decrypt</h1> <br/><br/>
                                    <form method='POST'>
                                        <label>Secret Msg</label> <br/>
                                        <input  
                                            type='text' required
                                            placeholder='Enter the secret message'
                                            name='seccret'
                                            value={secret}
                                            onChange={(e)=>setSecret(e.target.value)}
                                        /> <br/><br/>

                                        <label>Password</label> <br/>
                                        <input
                                            type='password' required
                                            placeholder='Enter the password'
                                            name='password'
                                            value={password}
                                            onChange={(e)=>setPassword(e.target.value)}
                                        /> <br/> <br/>

                                        <label>Message</label> <br/>
                                        <textarea
                                            type='text' readOnly
                                            placeholder='Your message will appear here'
                                            value={msg}
                                        /> <br/> <br/>

                                        <button onClick={onDatadecrypt}>Submit</button>
                                    </form>
                                </div>
                            )}
                    </div>
                    <br/><br/>
                    <p id="result"></p>
                </div>
            </div>

        </>
    )
}

export default Home
