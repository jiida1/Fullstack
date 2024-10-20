const Course=({course})=>{
    const yhteensa= course.parts.reduce((sum, part)=> sum+part.exercises, 0)
    
    return(
        <div>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
            <Yhteensa yhteensa={yhteensa}/>
        </div>
    )
}

const Header=({name})=>{
    return(
        <h2>{name}</h2>
    )
}

const Content=({parts})=>{
    console.log("content", parts)
    return(
        <div>
            {parts.map(part=>(
                <Part key={part.id} part={part}/>
            ))}
        </div>
    )
}

const Part=({part})=>{
    return(
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Yhteensa=({yhteensa})=>{
    return(
        <p>
            <b>total of {yhteensa} exercises</b>
        </p>
    )
}

export default Course
