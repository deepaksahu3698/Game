import Cardssss from "./card";

import {useEffect, useState} from 'react';

import { pair_emojis, initialRevealState } from "../Constants";

import {randomizeArr} from "../HelperFunctions";



import Confetti from 'react-confetti'



/*
console.log(pair_emojis);
 
console.log(random_arr);  
*/
 
 const Grid = () => 

{

    const [flipped, setFlipped] = useState(initialRevealState);

    const [randomArr, setRandomArr] = useState(pair_emojis);

    const [timerID, setTimerID] = useState(0);

    const [score, setScore] = useState(0);

    const [matched, setMatched] =  useState(initialRevealState);


    const [winning, setWinning] = useState(false);
   


    useEffect(() =>
    {
        const random_arr = randomizeArr(pair_emojis);
        setRandomArr(random_arr); 
    }, [])






    const toogleFlipped = (index) =>
    {
        let flipped_copy = [...flipped]; //here spread operator is used 

        /*
        const flipped_count =  flipped_copy.reduce((previous, current) =>
        {


            if (current == true)
            {
                previous++;
            }
            return previous;
        },0);
        */
        


        
        let flipped_count = 0;

        for (let i=0; i<flipped_copy.length; i++)
        {
            const current = flipped_copy[i];

            if (current === true)
            {
                flipped_count++;
            }
        }
        
        if (flipped_count >=2)
        {
            //console.log('2cards already opened');

            clearTimeout(timerID);
            setTimerID(0);
            flipped_copy = [...initialRevealState];
           
        }


        console.log(flipped_count);

        /*
        if (flipped_copy[index] === true )
        {
            //flipped_copy[index] = false;  //you cannot set it as false
        }
        else 
        {
            flipped_copy[index] = true;
        }*/
                     //OR
        /*

        if (!flipped_copy[index])
        {
            flipped_copy[index] = true;
        }
        */

        if (flipped_copy[index] === false)
        {
            flipped_copy[index] = true;
        }

        const flipped_count_after =  flipped_copy.reduce((previous, current) =>
        {


            if (current === true)
            {
                previous++;
            }
            return previous;
        },0);


        if (flipped_count_after === 2)
        {

        /*
          const selected_index =   flipped_copy.map ((single_element, idx) => 
            
            {

                if(single_element ==true)
                {
                    return idx;
                }
                else
                {
                    return false;
                }

            });
        */


            const selected_index = [];
            flipped_copy.forEach((single_elem, idx)=>
            {

                if(single_elem === true)
                {
                    selected_index.push(idx);
                }
            });

            console.log(selected_index);


            if(randomArr[selected_index[0]] === randomArr[selected_index[1]])
            {
                //alert("its a match");
                
                const matched_copy = [...matched];
                matched_copy[selected_index[0]] = true;
                matched_copy[selected_index[1]] = true;



              const allMatched= matched_copy.every((single_elem) => single_elem === true);
               
               
               if (allMatched === true)
               {
                   // alert ("You have won");
                   setWinning(true);
               }


                setMatched(matched_copy);
            }
            else
            {
                const timer_id = setTimeout(()=> {

                    closeAll();
                },2500);
                setTimerID(timer_id);
            }

            setScore(score + 1);



        }

        setFlipped(flipped_copy);
    }


    const closeAll = () =>
    {
        const state = initialRevealState;
    
        setFlipped(state);

        /*setFlipped(initialRevealState);*/
    }

    return(


            <>
                <div className="greet">

                    {
                        winning ? <Confetti /> : false
                    }

                    {
                        winning ? <h2>Congratulations </h2> : false
                    }
                
                </div>
                    



                    <div  className="cards-container">
                            
                            {
                                flipped.map ((single_data, idx) =>{

                                    const pull_emoji = randomArr[idx];


                                    const matched_state = matched[idx];


                                    return (

                                        < Cardssss key={idx} 
                                        
                                        flip={toogleFlipped} 
                                        
                                        index={idx}
                                        
                                        isFlipped= {single_data}

                                        pass_emoji = {pull_emoji}

                                        matchedState = {matched_state}
                                        
                                        />
                                    )
                                })
                            }
                    </div>

                    <h3 className="scorecard">Moves : {score}</h3>
            </>
    );
}

export default Grid;


