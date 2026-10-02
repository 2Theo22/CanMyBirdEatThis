
document.getElementById("button").onclick = function() {
    let input = document.getElementById("input").value;
    console.log(input);

    if(input === ""){
        return 0;
    }

    else {
        foodTypeLayoutHandler();
    }

}

function foodTypeLayoutHandler(){
    let danger = "dangerous";

    if (danger === "can eat"){
        greenlayout();
    }

    else if (danger === "dangerous"){
        redlayout();
    }
}

function greenlayout(){
    console.log("we work");
}

function redlayout(){
    console.log("We work too");
}