'use strict';

// get elements

var resultEl = document.getElementById('results');

var containerEl = document.getElementById('item-container');

var canvasEl = document.getElementById('my-canvas');

var filepathArr = ['img/bag.jpg', 'img/banana.jpg', 'img/bathroom.jpg', 'img/boots.jpg', 'img/breakfast.jpg', 'img/bubblegum.jpg', 'img/chair.jpg', 'img/cthulhu.jpg', 'img/dog-duck.jpg', 'img/dragon.jpg', 'img/pen.jpg', 'img/pet-sweep.jpg', 'img/scissors.jpg', 'img/shark.jpg', 'img/sweep.png', 'img/tauntaun.jpg', 'img/unicorn.jpg', 'img/usb.gif', 'img/water-can.jpg', 'img/wine-glass.jpg'];

var names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

var numberOfImg = 3;
var totalClick = 0;
var maxClick = 25;
var indexArr = [];
var allItems = [];

// construction function
function Product (name, pathway){
  this.name = name;
  this.pathway = pathway;
  this.votes = 0;
  this.views = 0;

  allItems.push(this);
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

// creating image elements
Product.prototype.renderImage = function(parent){
  var imageEl = document.createElement('img');
  imageEl.src = this.pathway;
  imageEl.alt = this.name;
  imageEl.title = this.name;
  parent.appendChild(imageEl);
  this.views ++;
  return imageEl;
};

// helper function - calculate randon number
function random(max){
  return Math.floor(Math.random() * (max));
}

// creating a unick index for 6 images
function createIndex() {
  var index = random(allItems.length);
  while (indexArr.includes(index)) {
    index = random(allItems.length);
  }
  while (indexArr.length >= numberOfImg * 2) {
    indexArr.shift();
  }
  indexArr.push(index);
  return index;
}

// generating images
function generatePicture() {
  var index = createIndex();
  var newEl = allItems[index].renderImage(containerEl);
  console.log('new element', newEl);
  return newEl;
}

// rendering pictures to the page
function renderAllPictures() {
  while(containerEl.firstChild) {
    containerEl.removeChild(containerEl.firstChild);
  }
  for (var i = 0; i < numberOfImg; i++) {
    generatePicture();
  }
}

function eventClick(e) {
  totalClick++;
  for (var i = 0; i < allItems.length; i++) {
    if (e.target.title === allItems[i].name) {
      allItems[i].votes++;
    }
  }
  if (totalClick >= maxClick) {
    containerEl.removeEventListener('click', eventClick);
    addResult();
    renderChart();
  }
  renderAllPictures();
}

// envoking this function after 25 votes
function addResult(){
  addElement('h3', 'Results', resultEl);
  var ulEl = addElement ('ul', false, resultEl);
  for (var i = 0; i < allItems.length; i++) {
    var text = `${allItems[i].name} ${allItems[i].views} views ${allItems[i].votes} votes`;
    addElement('li', text, ulEl);
  }
}


// creating new image instance
for (var i = 0; i < filepathArr.length; i++) {
  new Product(names[i],filepathArr[i]);
}

// render all pictures
renderAllPictures();

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

    new Chart(ctx, {
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




