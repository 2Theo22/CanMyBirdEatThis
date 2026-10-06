

let body;

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
    document.getElementById("line1").innerHTML =
        "<h2>Your food is safe!</h2>";
}

function redlayout(){
    document.getElementById("line1").innerHTML =
        "<h2>Your food is <strong>NOT</strong> safe!</h2>";
}