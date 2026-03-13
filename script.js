function calculate(){

let fx = document.getElementById("fx").value
let dfx = document.getElementById("dfx").value
let x = parseFloat(document.getElementById("x0").value)
let maxIter = parseInt(document.getElementById("iter").value)
let tol = parseFloat(document.getElementById("tol").value)

let table = document.getElementById("table")

for(let i=1;i<=maxIter;i++){

let f = eval(fx)
let df = eval(dfx)

if(df==0){
alert("Derivative became zero")
return
}

let x1 = x - (f/df)

let error = Math.abs(x1-x)

let row = table.insertRow()
row.insertCell(0).innerHTML = i
row.insertCell(1).innerHTML = x.toFixed(6)
row.insertCell(2).innerHTML = f.toFixed(6)
row.insertCell(3).innerHTML = x1.toFixed(6)
row.insertCell(4).innerHTML = error.toFixed(6)

if(error < tol){
document.getElementById("result").innerHTML = "Root = " + x1
return
}

x = x1

}

document.getElementById("result").innerHTML="Approximate Root = "+x
}

function reset(){
location.reload()
}