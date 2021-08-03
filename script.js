const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
console.log(ctx);  
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = 'white';
ctx.fillRect(1, 1, 2, 2);

window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const colours = {
    0: 'white', 1: 'blue', 2: 'lightgreen', 3: 'cyan', 4: 'lightblue', 5: 'black', 6: 'pink', 7: 'voilet', 8: 'red', 9: 'golden', 10: 'white'
}

const mouse = {
    x:undefined,
    y:undefined
}
 

class Particle{
    constructor(createParticleWithClick=false, fill='cyan'){
        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
        this.createParticleWithClick = createParticleWithClick;
        this.size = Math.random()*9 + 1;
        this.vx = Math.random()*4 - 2;
        this.vy = Math.random()*4 - 2;
        this.fill = fill
        this.sizestate = true; //true for decreasing and false for increasing
        if(createParticleWithClick){
            this.x = mouse.x;
            this.y = mouse.y;
        }
    }
    update(){
        this.x += this.vx;
        this.y += this.vy;
        if(this.x >= canvas.width || this.x <= 0){
            this.vx = -this.vx;
            this.x += this.vx*5;
        }
        if(this.y >= canvas.height || this.y <= 0){
            this.vy = -this.vy;
            this.y += this.vy*5;
        }
        if(this.sizestate) --this.size;
        if(!this.sizestate) this.size += Math.random();
        if(this.size < 0.5){
            ++this.size;  
            this.sizestate = false;
        } 
        if(this.size > 30){
            this.size += Math.random()*2 - 2;
            this.sizestate = true;
        } 

    }
    draw(sizeinc = 0,size=this.size, fill=this.fill){
        if(size + sizeinc < 0) sizeinc = 0;
        ctx.fillStyle = fill;
        ctx.beginPath();
        let posx = this.x; let posy = this.y; 
        ctx.arc(posx,posy,size+sizeinc,0,Math.PI*2);
        ctx.fill();           
    }
    getSize(){
        return this.size;
    }
}

const particles = [];

const init = (num=100) => {
    for(let i=0; i<num; ++i){
        let color = colours[Math.floor(Math.random()*10)];
        particles.push(new Particle(false,color));
    }    
}
init();

const generate = () => {    
    for(let i=0; i<particles.length; ++i){
        particles[i].update();
        //particles[i].draw(Math.random()*10 + -5); 
        particles[i].draw(Math.random()*10 + -5);
        if(particles[i].getSize() > 30){
            particles.splice(i,1);
            --i;
        }
    }
}

let dragging = false;
canvas.addEventListener('mousedown', () => {
    dragging = true;
})

canvas.addEventListener('mouseup', () => {
    dragging = false;
})

canvas.addEventListener('mousemove', (event) => {
    if(dragging){
        mouse.x = event.x; mouse.y = event.y;
        for(let i=0; i<3; ++i){
            let color = colours[Math.floor(Math.random()*10)];
            particles.push(new Particle(true,color));
        }
    } 
})

const animate = () => {
    //ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    generate();
    requestAnimationFrame(animate);
}
animate();
