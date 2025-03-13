const url = "https://raw.githubusercontent.com/mkatay/json_products/refs/heads/main/products"
let products = []
let categories = []
let rating = []
let price = []
let userOption = null

getData(url, renderData)

function renderData(data){
    console.log(data);
    categories = getUniqueValues(data, 'category')
    rating = getUniqueValues(data, 'rating')
    price = getUniqueValues(data, 'price')
    products = data
}

function getUserOption(e){
    console.log(e.target.tagName);
    if(e.target.tagName == 'INPUT'){
        userOption = e.target.value
        console.log(userOption)
        if(userOption == 'category') renderCheckBoxes(categories, "cat")
        if(userOption == 'rating') renderCheckBoxes(rating, "rat")
        if(userOption == 'price') renderCheckBoxes(price, "pri")
    }
}

function renderCheckBoxes(arr, ja){

    document.querySelector("button").disabled = false
    document.querySelector("button").classList.remove("cursor-not-allowed")

    document.querySelector('ul').innerHTML = ""
    console.log(arr + "\nasdasdads");
    if(ja == "cat"){
        arr.forEach((item)=>{
        document.querySelector('ul').innerHTML +=
        `
        <li class="border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div class="flex items-center ps-3">
            <input id="horizontal-list-radio-license" type="checkbox" value="${item}" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
            <label for="horizontal-list-radio-license" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">${item}</label>
        </div>
    </li>
        `})
    }else if(ja == "rat"){
        for(let i = 1; i < 6; i++){
            const star = "⭐".repeat(i);
            document.querySelector('ul').innerHTML +=
        `
        <li class="border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div class="flex items-center ps-3">
            <input id="horizontal-list-radio-license" type="checkbox" value="${i}" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
            <label for="horizontal-list-radio-license" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">${star}</label>
        </div>
    </li>
        `
        }            
    }else if(ja == "pri"){
        [{val: "elol", name: "Legolcsóbb elöl"}, { val: "draga", name: "Legdrágább elöl"}].forEach((obj)=>  document.querySelector('ul').innerHTML +=
        `
        <li class="border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div class="flex items-center ps-3">
            <input id="horizontal-list-radio-license" type="checkbox" value="${obj.val}" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
            <label for="horizontal-list-radio-license" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">${obj.name}</label>
        </div>
    </li>
        `
    
    )
       

    }


}
function roundRating(rating){
    return Math.round(+rating);
}




function showResults(){
    
    document.querySelector(".cards").innerHTML = ""
    const checkedValues = []
    let selectedProducts
    if(userOption == "category"){
        document.querySelectorAll("input[type='checkbox']:checked").forEach(obj=>checkedValues.push(obj.value))
        selectedProducts = products.filter(obj=>checkedValues.includes(obj[userOption]))
        selectedProducts.forEach(obj=>document.querySelector(".cards").innerHTML += renderCards(obj)  )
    }
    if(userOption == "rating"){
        document.querySelectorAll("input[type='checkbox']:checked").forEach(obj=>checkedValues.push(obj.value))        
        products.forEach((obj)=>{
            
            if(roundRating(obj.rating) == checkedValues[0] || roundRating(obj.rating) == checkedValues[1]){
                document.querySelector(".cards").innerHTML += renderCards(obj)  
            }
        })
        
    }
        
    if(userOption == "price"){
        document.querySelectorAll("input[type='checkbox']:checked").forEach(obj=>checkedValues.push(obj.value))
        const sortedPrice = [...products].sort((x, y) => x.price - y.price)
        if(checkedValues[0] == "draga"){
            sortedPrice.reverse().forEach((obj)=>{
                document.querySelector(".cards").innerHTML += renderCards(obj)  
            })    
            
        }else{
            sortedPrice.forEach((obj)=>{
                document.querySelector(".cards").innerHTML += renderCards(obj)    
            })   
        }
    }
    
    
}


function renderCards(obj){
    
    return `
    <a href="#" class=" max-w-sm p-6 flex justify-center flex-wrap bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
    
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center dark:text-white ">${obj.title}</h5>
    <p class="font-normal w-[100%] text-gray-700 text-center dark:text-orange-500">${obj.description}</p>
    <p class="font-bold w-[100%] text-[2rem] text-gray-700 text-center  dark:text-gray-200">${"⭐".repeat(roundRating(obj.rating))}</p>
    <img src="https://picsum.photos/id/${getRandomInt(200)}/300" class="text-center">
    <p class="font-bold w-[100%] text-[2.5rem] text-gray-700 text-center dark:text-gray-200">$${+obj.price}</p>
    </a>
    `
    
    
}

function getRandomInt(max) {
        return Math.floor(Math.random() * max);
}

