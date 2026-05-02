import { useState, useEffect } from 'react'
import './App.css'

const App = () => {
  const [isLogin, SetIsLogin] = useState(null)
  const [createAC, SetCreateAc] = useState(false)
  const [login, SetLogin] = useState(null)
  const [password, SetPassword] = useState(null)
  const [data, setData] = useState(null)
  const [count, setCount] = useState(false)
  const [tranzaction, setTranzaction] = useState(null)
  const [c, setC] = useState(null)
  const [s, SetS] = useState(null)
  useEffect(() => {
    const userId = localStorage.getItem("userId")
    console.log(userId)
    fetch(`http://localhost:3000/api/users/${userId}`)
    .then(response => response.json())
    .then(data => {
      setData(data)
      SetIsLogin(data.isLogin)
    })
    if (userId !== null) {
      fetch(`http://localhost:3000/api/tranzactions/sum/${userId}`)
      .then(response => response.json())
      .then(data => setTranzaction(data.tranzaction))
    }

  }, [count])

  const giveLogin = (element) => {
    SetLogin(element.target.value)
  }

  const givePassword = (element) => {
    SetPassword(element.target.value)
    console.log(element.target.value)
  }

  const register = async () => {
    const response = await fetch("http://localhost:3000/api/reg", {
      method: "POST", 
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        login: login,
        password: password
      })
    })
    const data = await response.json()
    setData(data)
    localStorage.setItem("userId", data.id)
    SetIsLogin(data.isLogin)
    setCount(!count)
  }
  const log = async () => {
    const response = await fetch("http://localhost:3000/api/log", {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        login: login,
        password: password
      })
    })
    const data = await response.json()
    setData(data)
    SetIsLogin(data.isLogin)
    localStorage.setItem("userId", data.id)
  }
  const selectOption = (element) => {
    setC(element.target.value)
  }
  const inputAdd = (e) => {
    SetS(e.target.value)
  }
  const fetchTranzaction = async () => {
    const response = await fetch("https://server-roan-eight-85.vercel.app/api/tranzactions/add", {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        sum: s,
        id: localStorage.getItem("userId")
      })
    })
    const data = await response.json()
    setTranzaction(data.tranzaction)
  }
  return (
    <>
      {
        isLogin ? 
        <div id='isLogin-Div'>
          <h1 translate='no'>Hello {data.login}</h1>
          <h2>Все расходы: {tranzaction} Rub.</h2>
          <h3>Добавить расходы:</h3>
          <br />
          <div id='add_tranzaction'>
            <div id='input'>
              <input type="number" id="input_add" onChange={inputAdd} />
              <p id='p_rub'>Руб.</p>
            </div>
            <h4>На что?</h4>
            <select onChange={selectOption}>
              <option value="food">food</option>  
              <option value="entertainment">entertainment</option>
              <option value="other">other</option>
            </select>  
            <button id='add_button' onClick={fetchTranzaction}>Add</button>
          </div>
          <button onClick={() => {
            setCount(!count)
            localStorage.removeItem("userId")
          }} id='exit'>Exit</button> 
        </div> :
         ( !createAC ? 
        <div id='not-IsLogin-Div'>
          <h1 style={{color: "white"}}>Sign up for a free wallet</h1>
          <input type="text" onChange={giveLogin} placeholder='Login:' translate='no' />
          <input type="password" onChange={givePassword} placeholder='Password:' translate='no' />
          <button onClick={register}>Create account</button>
          <p>Already have an account?  <a onClick={() => {SetCreateAc(true)}}>Login</a></p>
        </div>
        : <div id='not-IsLogin-Div'>
          <h1 style={{color: "white"}}>Login for a free wallet</h1>
          <input type="text" onChange={giveLogin} placeholder='Login:'  translate='no' />
          <input type="password" onChange={givePassword} placeholder='Password:' translate='no' />
          <button onClick={log}>Login</button>
          <p>No account yet?  <a onClick={() => {SetCreateAc(false)}}>Create him</a></p>
        </div>
        )
      }
    </>
  )
}

export default App
