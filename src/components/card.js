const Cardssss = (props) =>
{

    const flip = () =>
    {


        if(!props.matchedState)
        {
            props.flip(props.index);
        }

       
    }
    return(



        <div  className= {`card        ${props.isFlipped || props.matchedState ? "flipped" : false}`}
        
                onClick = {flip}
        >
            

            <div className="content">

                     <h1 >{props.pass_emoji}</h1>

            </div>
            
        </div>
    )
}

export default Cardssss;