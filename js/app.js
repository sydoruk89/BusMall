'use strict';

// get elements

var imageOne = document.getElementById ('image1');

var imageTwo = document.getElementById ('image2');

var imageThree = document.getElementById ('image3');

var resultEl = document.getElementById('results');

var containerEl = document.getElementById('item-container');

var canvasEl = document.getElementById('my-canvas');

var filepathArr = ['img/bag.jpg', 'img/banana.jpg', 'img/bathroom.jpg', 'img/boots.jpg', 'img/breakfast.jpg', 'img/bubblegum.jpg', 'img/chair.jpg', 'img/cthulhu.jpg', 'img/dog-duck.jpg', 'img/dragon.jpg', 'img/pen.jpg', 'img/pet-sweep.jpg', 'img/scissors.jpg', 'img/shark.jpg', 'img/sweep.png', 'img/tauntaun.jpg', 'img/unicorn.jpg', 'img/usb.gif', 'img/water-can.jpg', 'img/wine-glass.jpg'];

var names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

var numberOfImg = 3;
var maxClick = 25;
var indexArr = [];
var allItems = [];

// construction function
function Product (name, src){
  this.name = name;
  this.src = src;
  this.votes = 0;
  this.views = 0;

  allItems.push(this);
}


// check items in the local storage
var localStorageProducts = localStorage.getItem('products');

if (localStorageProducts) {
  allItems = JSON.parse(localStorageProducts);
  console.log(allItems);
} else {
  for (var i = 0; i < filepathArr.length; i++) {
    new Product(names[i],filepathArr[i]);
  }
}

// helper function
function addElement(element, content, parent){
  var newElement = document.createElement(element);
  if(content){
    var newContent = document.createTextNode(content);
    newElement.appendChild(newContent);
  }

  parent.appendChild(newElement);
  return newElement;
}


// helper function - calculate randon number
function random(max){
  return Math.floor(Math.random() * (max));
}

// render images
function render() {
  generateImg(imageOne);
  generateImg(imageTwo);
  generateImg(imageThree);
}


// rendering pictures to the page
function generateImg(domEl) {
  var index = generateIndex();
  allItems[index].views++;
  domEl.src = allItems[index].src;
  domEl.title = allItems[index].name;
  domEl.alt = allItems[index].name;
}

// generating index
function generateIndex() {
  var index = random(allItems.length);
  while (indexArr.includes(index)) {
    index = random(allItems.length);
  }
  indexArr.push(index);
  console.log('index array', indexArr);
  if (indexArr.length >= numberOfImg*2) {
    indexArr.shift();
  }
  return index;
}

// render the best product
function renderBestProduct() {
  var bestProduct;
  var temp = 0;
  for (var i = 0; i < allItems.length; i++){
    if (allItems[i].votes > temp) {
      temp = allItems[i].votes;
      console.log('the best', temp);
      bestProduct = allItems[i];
      console.log ('the best product', bestProduct);
    }
  }
  var content = `The best product is ${bestProduct.name} with ${bestProduct.votes} votes`;
  addElement('h2', content, resultEl);
}


// event handler
function eventClick(e) {
  for (var i = 0; i < allItems.length; i++) {
    if (e.target.title === allItems[i].name) {
      allItems[i].votes++;
      maxClick--;
    }
  }
  if (maxClick === 0) {
    containerEl.removeEventListener('click', eventClick);
    renderBestProduct();
    renderChart();
  }
  localStorage.setItem('products', JSON.stringify(allItems));
  render();
}


// render all pictures
render();

// adding event listenar
containerEl.addEventListener('click', eventClick);



// Chart
function renderChart(){
  var votesArr = [];
  var namesArr = [];

  for(var i = 0; i < allItems.length; i++){
    if(allItems[i].votes > 0){
      votesArr.push(allItems[i].votes);
      namesArr.push(allItems[i].name);
    }
  }


  var ctx = canvasEl.getContext('2d');

  new Chart (ctx, {
    type: 'bar',
    data: {
      labels: namesArr, // names of each object
      datasets: [{
        label: '# of Votes',
        data: votesArr, // number of votes for each object
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

}




