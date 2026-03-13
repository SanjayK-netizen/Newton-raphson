let chart
let convergenceChart
let iterationData=[]

function calculate(){

let fx=document.getElementById("fx").value
let x=parseFloat(document.getElementById("x0").value)
let maxIter=parseInt(document.getElementById("iter").value)
let tol=parseFloat(document.getElementById("tol").value)

if(!fx || isNaN(x)){
alert("Enter function and initial guess")
return
}

let derivative=math.derivative(fx,'x').toString()

document.getElementById("derivativeDisplay").innerHTML =
"Derivative: f'(x) = "+derivative

let table=document.getElementById("table")

table.innerHTML = `
<tr>
<th>Iteration</th>
<th>xₙ</th>
<th>f(xₙ)</th>
<th>xₙ₊₁</th>
<th>Error</th>
</tr>
`

iterationData=[]

for(let i=1;i<=maxIter;i++){

let f=math.evaluate(fx,{x:x})
let df=math.evaluate(derivative,{x:x})

if(df===0){
alert("Derivative became zero")
return
}

let x1=x-(f/df)

let error=Math.abs(x1-x)

let row=table.insertRow()

row.insertCell(0).innerText=i
row.insertCell(1).innerText=x.toFixed(6)
row.insertCell(2).innerText=f.toFixed(6)
row.insertCell(3).innerText=x1.toFixed(6)
row.insertCell(4).innerText=error.toFixed(6)

iterationData.push({
iteration:i,
x:x1
})

document.getElementById("progressBar").style.width =
(i/maxIter*100)+"%"

if(error<tol){

document.getElementById("result").innerHTML =
"Root ≈ "+x1.toFixed(6)

drawGraph(fx)
drawConvergence()

return
}

x=x1
}

drawGraph(fx)
drawConvergence()

}

function drawGraph(fx){

let xs=[]
let ys=[]

for(let i=-10;i<=10;i+=0.5){

xs.push(i)

let y=math.evaluate(fx,{x:i})

if(!isFinite(y)) y=null

ys.push(y)

}

let ctx=document.getElementById("graph")

if(chart) chart.destroy()

chart=new Chart(ctx,{

type:'line',

data:{
labels:xs,
datasets:[{
label:'f(x)',
data:ys,
borderWidth:2
}]
}

})

}

function drawConvergence(){

let iterations = iterationData.map(d => d.iteration)
let values = iterationData.map(d => d.x)

let ctx = document.getElementById("convergenceGraph")

if(convergenceChart) convergenceChart.destroy()

convergenceChart = new Chart(ctx,{

type:'line',

data:{
labels:iterations,
datasets:[{
label:"Root Convergence",
data:values,
borderWidth:2
}]
}

})

}

function toggleTheme(){

document.body.classList.toggle("light-mode")

}

function loadExample(){

document.getElementById("fx").value="x^3-x-1"
document.getElementById("x0").value="1"

}

function downloadCSV(){

let csv="Iteration,x\n"

iterationData.forEach(d=>{
csv+=d.iteration+","+d.x+"\n"
})

let blob=new Blob([csv],{type:'text/csv'})

let a=document.createElement("a")

a.href=URL.createObjectURL(blob)

a.download="iterations.csv"

a.click()

}

function reset(){

location.reload()

}
