let amount = JSON.parse(localStorage.getItem('amount'));
document.getElementById('wallet').innerText=amount
// Implement debouncing for network request
// On clicking book now store the selected movie in localstorage as key "movie"
// so that you can retrive it on checkout.html page

let id;
async function searchMovies(){
    try{
        const name = document.getElementById('search').value;
        const res = await fetch(`https://www.omdbapi.com/?apikey=d1fe58f3&s=${name}`)
        let data = await res.json()
        let movies = data.Search
        append(movies)
    }
    catch(err){
        console.log(err)
    }
}

function append(data){
    document.getElementById('movies').innerHTML=null;
    data.forEach(ele => {
        let box = document.createElement('div')
        let imgbox = document.createElement('div')
        let img = document.createElement('img')
        img.src = ele.Poster
        imgbox.append(img)

        let name = document.createElement('p')
        name.innerText = ele.Title

        let btn = document.createElement('button')
        btn.innerText = "Book Now"
        btn.addEventListener("click",function(){
            addData(ele)
        })
        btn.setAttribute("class","book_now")

        box.append(imgbox,name,btn)
        document.getElementById('movies').append(box)
    });
}
function addData(ele){
    let arr = []
    arr.push(ele)
    localStorage.setItem('movie',JSON.stringify(arr))
    window.location.href='checkout.html'
}

async function main(){
    let data = await searchMovies();
    if(data == undefined){
        return false;
    }
    append(data)
}

function debounce(func,delay){
    if(id){
        clearTimeout(id)
    }
    id=setTimeout(()=>{
        func();
    },delay)
}