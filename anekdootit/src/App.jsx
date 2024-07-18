import { useState } from 'react'

const randomIndex=(max)=> Math.floor(Math.random()*max)

const Button=(props)=>{
  return(
    <div>
      <button onClick={props.handleClick}>{props.text}</button>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [pisteet, setPisteet]= useState(Array(anecdotes.length).fill(0))
  const [max, setMax]=useState(0)

  const getRandAnec=()=>{
    const randomIndex = Math.floor(Math.random()*anecdotes.length)
    setSelected(randomIndex)
  }

  const vote=()=>{
    const uudetPisteet=[...pisteet]
    uudetPisteet[selected]+=1
    setPisteet(uudetPisteet)
    if(uudetPisteet[selected]>pisteet[max]){
      setMax(selected)
    }
  }

  return (
    <div>
      
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {pisteet[selected]} votes</p>
      
      <div>
        <Button handleClick={vote} text='vote'/>
        <Button handleClick={getRandAnec} text='next anecdote'/>
      </div>
      
      <h2>Anecdote with most votes</h2>
        {anecdotes[max]}
        <p>has {pisteet[max]} votes</p>
      
    </div> 
  )
}

export default App
