import { useState } from 'react'

const Button=(props)=>
  <button onClick={props.handleClick}>{props.teksti}</button>

const StatisticLine=(props)=>{
  return(
    <tr>
        <td>{props.teksti}</td>
        <td>{props.value}</td>
    </tr>
  )
}

const Statistics=(props)=>{
  const{good, neutral, bad}=props
  const palauteLuku= good+neutral+bad
  const keskiarvo=(good-bad)/palauteLuku
  const positiivinenProsentti= good/palauteLuku*100

if (palauteLuku===0){
  return <p>No feedback given</p>
}

  return(
    <div>
      <table>
        <tbody>
          <StatisticLine teksti='good' value={good}/>
          <StatisticLine teksti='neutral' value={neutral}/>
          <StatisticLine teksti='bad' value={bad}/>
          <StatisticLine teksti='all' value={palauteLuku}/>
          <StatisticLine teksti='avarage' value={keskiarvo}/>
          <StatisticLine teksti='positive' value={positiivinenProsentti+'%'}/>
        </tbody>
      </table>
    </div>
  )

}

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGood=()=>setGood(good+1)
  const handleNeutral=()=>setNeutral(neutral+1)
  const handleBad=()=>setBad(bad+1)



  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App