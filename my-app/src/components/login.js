import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Login({setuser}) {

    const hist = useNavigate();
    useEffect(() => {
        let userr = localStorage.getItem("user")

        if(userr){
            hist("/")
        }
    }, [])
    const [email, setemail] = useState("")
    const [password, setpasswrod] = useState("")

    let login = ()=>{
        if(email!=='' && password!==''){
            let data = {
                email,
                password
            }
            fetch('http://localhost:3000/user/signin' , {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(data)
            }).then((res)=>
                res.json()
            ).then(data=>{
                if(data.success){
                    localStorage.setItem("user" , JSON.stringify(data.user))
                    localStorage.setItem("token" , JSON.stringify(data.token))
                    setuser(data.user)
                    hist("/")
                }
            })
        }
    }
  return (
    <div>
        <h1>Login</h1>


        <input type="text" name={email} value={email} onChange={(e)=>setemail(e.target.value)} />
        <input type="text" name={password} value={password} onChange={(e)=>setpasswrod(e.target.value)} />

        <button onClick={login}>Signin</button>
    </div>
  );
}