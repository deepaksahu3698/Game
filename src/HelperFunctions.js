const randomizeArr = (arr_old) =>
{

    let arr = [...arr_old];
    const shuffle_arr = [];

    const size = arr.length;
    for(let i= 0; i < size; i++)
    {

       const random_index = Math.floor (Math.random()* arr.length);

       shuffle_arr.push(arr[random_index]);
       
       arr.splice(random_index, 1)
    }
    return shuffle_arr;
}
export{randomizeArr};

