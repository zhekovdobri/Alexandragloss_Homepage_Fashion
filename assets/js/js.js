// let sidenavheader = document.querySelector('.header');
// menuLink = document.querySelectorAll('.header a');
// menuLi = document.querySelectorAll('.header li');
// addressbook = document.querySelectorAll('#addressBook a');
// iconLink = document.querySelectorAll('.mb-4 a u');

// (function() {
//     sidenavheader.style.opacity = '0.6';
//     sidenavheader.style.width = '1200px';
//     sidenavheader.style.marginLeft = '40px';
//     sidenavheader.style.fontFamily = 'serif';
    

//     console.log(menuLink);

//     Array.from(menuLink).forEach((link)=> {
//         link.style.textDecoration = 'none'
//         link.style.color = '#af7407'
//         link.style.fontWeight = 'bold'
//         link.style.fontSize = '25px'
//         link.style.margin = '10px'
//     })

//     Array.from(menuLi).forEach((link)=> {
//         link.style.display = 'inline'
//     })

//     Array.from(addressbook).forEach((link)=> {
//         link.style.color = '#000'
//     })
//     Array.from(iconLink).forEach((link)=> {
//         link.style.color = '#000'
//         link.style.textDecoration = 'none'  
//     })
    


//     document.getElementById("logo").style.fontWeight = "900"
//     document.getElementById("logo").style.fontSize = "56px"
//     document.getElementById("io").style.color = "#000"
//     document.getElementById("pro").style.color = "#000"
//     document.getElementById("home").style.color = "#000"
//     document.body.style.backgroundColor = "#fff"
    
      


//     console.log(menuLink)
// })()

// // SEARCH
// function search () {
//     let input, inputValue, contacts, contactText;
//     input = document.getElementById('globalSearch');
//     inputValue = input.value.toLowerCase();
//     contacts = document.querySelectorAll('#addressBook li a');

//     Array.from(contacts).forEach((contact) => {
//         // console.log('innerText',contact.innerText)
//         // console.log('textContent', contact.innerText)
//         contactText = contact.innerText;

//         if (contactText.toLowerCase().indexOf(inputValue) > -1) { 
//             contact.parentElement.style.display = '';
//         } else {
//             contact.parentElement.style.display = 'none';
//         }
//     })
// }
// // HAMBURGER MENU
// let sideNav = document.querySelector('.sidenav');
//     menuLink = document. querySelectorAll('.sidenav a');

// (function() {
//     sideNav.style.backgroundColor = '#000';
//     sideNav.style.height = '100%';
//     sideNav.style.width = '0';
//     sideNav.style.position = 'fixed';
//     sideNav.style.top = '0';
//     sideNav.style.left = '0';
//     sideNav.style.opacity = '0.6'
//     sideNav.style.paddingTop = '60px';
//     // sideNav.style.marginTop = '500px';
//     // sideNav.style.paddingLeft = '20px'; 
    

//     console.log(menuLink)
//     Array.from(menuLink).forEach((link) => {
//         link.style.display = 'block';
//         link.style.textDecoration = 'none'
//         link.style.color = '#fff';
//         link.style.lineHeight = '36px';
//         link.style.fontSize = '18px';
//         link.style.fontFamily = 'Arial Narrow';
//         link.style.display = 'flexbox'
        
//     })
// })();

// function openSideNav() {
//     if (sideNav.style.width !== '500px') { 
//         sideNav.style.width = '500px';
//         document.querySelector('.container1').style.marginLeft = '500px';
//     } else { 
//         sideNav.style.width = '0px';
//         document.querySelector('.container1').style.marginLeft = '0px';
//         document.querySelectorAll('.bold').style.color = '#000'
//     }

//     document.querySelector('.sidenav').style.transition = '1s';
// }

canvas = document.getElementById("stars");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
ctx = canvas.getContext("2d");
var numParticles = 1000;
var particles = [];

var starSettings = {
  alphaMin: 0.2,
  alphaMax: 1,
  fadeSpeedMax: 0.02,
  fadeSpeedMin: 0.005
};

stage = {
  width: 300,
  height: 250
};

var Particle = function(){
  var settings = starSettings;
  
  this.x = 0;
  this.y = 0;
  this.height = 0;
  this.width = 0;
  this.radius = 0;
  this.scale = 0;
  this.alpha = 0;
  this.id = 0;
  this.fadeSpeed = settings.fadeSpeedMin + (settings.fadeSpeedMax * Math.random());
  this.radSpeed = this.fadeSpeed;
  this.rad = 180 * Math.random();
  if (this.alpha < settings.alphaMin) this.fadeSpeed = Math.abs(this.fadeSpeed);
  if (this.alpha >= settings.alphaMax) this.fadeSpeed = -Math.abs(this.fadeSpeed);
  
  this.init = function(){
    this.id = numParticles++;
  }.bind(this);
  
  this.init();
};

function init() {
  prepareParticles();
  render();
	
}//////////

function prepareParticles(){
  var count = numParticles;
  while(count--){
    var particle = new Particle();
    particle.x = Math.random();
    particle.y = Math.random();
    particle.radius = 1.5;
    particle.scale = 0.5 + (Math.random()*0.5);
    particle.alpha = Math.random();
    particles.push(particle);
   // console.log(particle.x);
  }
}

function render(){
    ctx.clearRect(0, 0, stage.width, stage.height);
    for(p in particles){
      var p = particles[p];
      sineFade(p);
      ctx.beginPath();
      ctx.arc(p.x*stage.width, p.y*stage.height, (p.scale*p.radius), 0, 2*Math.PI, true);
      ctx.fillStyle = 'rgba(255, 255, 255, ' + p.alpha + ')';
      ctx.fill();
    }   
    
    window.requestAnimationFrame(render);
}

function sineFade(particle){
  particle.rad += particle.radSpeed * 3;
  var fade = (Math.sin(particle.rad)+1) / 2;
  particle.alpha = starSettings.alphaMin + (starSettings.alphaMax * fade);
}

function resizeCanvas() {
  canvas.setAttribute("width", window.innerWidth);
  //canvas.style.width = window.innerWidth + "px";//
  
  stage.width = window.innerWidth;
  setTimeout(function() {
    //canvas.style.height = window.innerHeight + "px";
    canvas.setAttribute("height", window.innerHeight);
    stage.height = window.innerHeight;
  }, 0);
};

// Webkit/Blink will fire this on load, but Gecko doesn't.
window.onresize = resizeCanvas;

// So we fire it manually...
resizeCanvas();
setTimeout(function() {
    init();
 }, 0);






