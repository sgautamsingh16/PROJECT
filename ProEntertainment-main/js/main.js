import moviesData from '../data/moviesData.json' with { type: "json" };
// import newsData from '../newsData.json' with { type: "json" };

var newsData = [];
var currentImg = 0;
var imgs = document.querySelectorAll('.slider img');
let dots = document.querySelectorAll('.dot');
var interval = 3000;

// Second banner
var secondEventTitle = 'Hi! *Freshmen* Orientation Day';

// Third banner
var thirdEventDate = new Date('2023-02-01'); // pull this from database
var thirdEventDateString = thirdEventDate.toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric' });
var days = calculateDays(new Date(), thirdEventDate) || 0;
const countdownText = days > 0 ? `${days} days left` : 'Live Now!';

var secondImageUrl = '../Images/slide2.PNG'
var thirdImageUrl = '../Images/slide4.PNG'

document.getElementById('img-2').src = secondImageUrl;
document.getElementById('img-3').src = thirdImageUrl;

var timer = setInterval(changeSlide, interval);

function changeSlide(n) {
  for (var i = 0; i < imgs.length; i++) {
    imgs[i].style.opacity = 0;
    dots[i].className = dots[i].className.replace(' active', '');
  }

  currentImg = (currentImg + 1) % imgs.length;

  if (n != undefined) {
    clearInterval(timer);
    timer = setInterval(changeSlide, interval);
    currentImg = n;
  }

  imgs[currentImg].style.opacity = 1;
  dots[currentImg].className += ' active';
}

function calculateDays(today, eventDate) {
  const difference = eventDate.getTime() - today.getTime();

  return Math.ceil(difference / (1000 * 3600 * 24)); // convert to days
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

var openButton = document.getElementById("open-button");
openButton.addEventListener("click", openForm);

var closeButton = document.getElementById("close-button");
closeButton.addEventListener("click", closeForm);


let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

var locationSetter = document.getElementById("location-setter");
locationSetter.addEventListener("click", ()=> {
  console.log("Event triggered")
  initMap();
})


document.addEventListener('DOMContentLoaded', function() {
  // console.log("data: ", data['upcoming']);
  var newsData = fetch("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=2f6e5d2c1f9a447fa0c57f1a88558a05")
  .then(response=> {
    if(!response.ok) {
      throw new Error("")
    }
    return response.json();
  })
  .then(data=>{
    console.log("data: ", data);
    return data;
  })
  .catch(err=> {
    console.error("error: ", err);
  })
  var mainSec = document.getElementById('mainSection');
  var i = 0;
  for(var obj in moviesData) {
    const objName = obj;
    console.log("objName: ", objName);
    var movieSec = document.createElement('div');
    movieSec.classList.add('movieSec')
    var sectionHead = document.createElement('div');
    sectionHead.classList.add('sectionHead');
    var headText = document.createElement('span');
    const map = new Map([
      ["nowShowing", "Now Showing"],
      ["upcoming", "Upcoming"],
      ["drama", "Drama"],
      ["comedy", "Comedy"]
    ]);
    
    headText.textContent = map.get(objName)
    sectionHead.appendChild(headText);
    movieSec.appendChild(sectionHead)
    // console.log(newRealeses.id)
    var list = document.createElement('div');
    list.classList.add("moviesList");
    // console.log(list.id)
    moviesData[obj].map((movie)=> {
    var movieCard = document.createElement('div')
    movieCard.classList.add('movieCard')
    var movieImg = document.createElement('img');
    movieImg.src = movie.posterURL
    movieImg.width='200'
    movieImg.height='250'
    movieCard.appendChild(movieImg);
  
    var movieTitle = document.createElement('div');
    movieTitle.id = "movieTitle"
    var titleText = document.createElement('p');
    titleText.textContent = movie.title
    movieTitle.appendChild(titleText);
    movieCard.appendChild(movieTitle)
  
    var actions = document.createElement('div');
    actions.id = 'actions';
    var bookBtn = document.createElement('button');
    bookBtn.textContent = 'Book Tickets'
    bookBtn.classList.add('bookBtn')
    actions.appendChild(bookBtn);
    var infoBtn = document.createElement('button');
    infoBtn.innerHTML = '<i class="fa-solid fa-circle-info"></i>';
    infoBtn.classList.add('infoBtn')
    actions.appendChild(infoBtn);

    movieCard.appendChild(actions)
  
    // var movieLang = document.createElement('div');
    // var langText = document.createElement('p');
    // langText.textContent = 'Hindii'
    // movieLang.appendChild(langText);
    // movieCard.appendChild(movieLang)
    
    list.appendChild(movieCard)
    movieSec.appendChild(list)
    if(i%2!=0) {
    movieSec.classList.add('bg-beige');
    }
    mainSec.appendChild(movieSec)
    // var hr = this.document.createElement('hr');
    // mainSec.appendChild(hr)
    i++;
  })
}
});