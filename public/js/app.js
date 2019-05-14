const weatherForm = document.querySelector("form");
const search = document.querySelector("input[name=address]")
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if(search.value === ""){
        alert("Search value should not empty");
    } else {
        getLocation(search.value);
        // console.log(search.value);
    }
});

function getLocation(address) {

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    fetch(`/weather?address=${address}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        if(data.error){
            messageOne.textContent = data.error; 
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.summary; 
        }
    })
    .catch((err) => {
        console.log(err)
    });
}