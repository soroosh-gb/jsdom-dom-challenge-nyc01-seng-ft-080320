// 1. set the timer to increase every second
// 2. adding plus/minuse function for the timer
// 3. when like button clicked print (second) has been liked (number) times
// 4. when pause button clicked it pauses timer, disable all buttons except pause, pause button text = "resume"
// 5. when presume button is clicked all buttons are re-enabled
// 6. leave comments 

document.addEventListener("DOMContentLoaded", function(e){

    function incrementNumber(num) {
    let counter = document.querySelector("#counter")
    let number = parseInt(counter.textContent)
    const newNumber = number + (num)
    counter.textContent = newNumber
    }

let interval = setInterval(function(){
    incrementNumber(+1)
    
},1000);

function myStopFunction() {
    let pausebttn = document.querySelector('#pause')
    pausebttn.addEventListener('click', e => {
        clearInterval(interval);
    })
}

    const likeMap = {}; // {1: node, 2: node}
    
const clickHandler = () => {
    document.addEventListener('click', e => {
        if (e.target.matches('#minus')) {
        console.log("minus")
        incrementNumber(- 1)
        }
        else if (e.target.matches('#plus')) {   
        incrementNumber(+ 1)
        }
        else if (e.target.matches('#heart')) {
            let num = currentNumber();
            if (likeMap[num]){
                const numLi = likeMap[num] //numLi = the li of the old li
                const newCount = parseInt(numLi.dataset.likeCount) + 1 //gets the count from the old li and adds 1
                numLi.dataset.likeCount = newCount //updates old li dataset num 
                numLi.textContent = `${num} has been liked ${newCount} times` //prints it all out!
            }

            else {
                let numLi = document.createElement('li'); //creates li tag
                numLi.dataset.likeCount = 1; //adds dataset count on li
                numLi.textContent = `${num} has been liked 1 time`; //adds text for li
                likeMap[num] = numLi; // creating a key that is the current number and the value is the li
                document.querySelector('.likes').append(numLi); //appends on ul
            }

        }
        else if (e.target.matches('#pause')) {
            clearInterval(interval);

            e.target.textContent = "resume"
            e.target.id = "resume"

            document.querySelector('#plus').disabled = true
            document.querySelector('#minus').disabled = true
            document.querySelector('#heart').disabled = true
            document.querySelector('#submit').disabled = true
        }

        else if (e.target.matches('#resume')) {
            let interval = setInterval(function(){
                incrementNumber(+1)},1000);

                e.target.textContent = "pause"
                e.target.id = "pause"

            document.querySelector('#plus').disabled = false
            document.querySelector('#minus').disabled = false
            document.querySelector('#heart').disabled = false
            document.querySelector('#submit').disabled = false
        }

    })

}

const submitHandler = () => {
    document.addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        const comment = form.comment.value;
        const p = document.createElement('p');
        p.textContent = comment;
        document.querySelector('.comments').append(p);
        form.reset();
    })
}
    const currentNumber = () => {
        const counter = document.querySelector('#counter')
        const currentNum = parseInt(counter.textContent)
        return currentNum
    }

    submitHandler();
    myStopFunction();
    clickHandler();

})

