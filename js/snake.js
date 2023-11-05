document.body.innerHTML = `<canvas id="canvas"
    width="256" height="256" style="background: black;">`;
let ctx   = canvas.getContext("2d");
let snake = [[8,8]], apple = [4,4], [dx,dy] = [0,0];
onkeydown = ({key}) => [dx,dy] =
    { [key]: [dx,dy], ArrowRight:[dx||1, 0], ArrowLeft:[dx||-1, 0] ,
                      ArrowDown: [0, dy||1], ArrowUp:  [0, dy||-1] }[key];
setInterval(() => {
    snake.unshift([ (snake[0][0] + dx) & 15 ,
                    (snake[0][1] + dy) & 15 ]);
    if(""+snake[0] == apple)
        do apple = [ Math.floor(Math.random()*16) ,
                     Math.floor(Math.random()*16) ];
        while(snake.some(seg => ""+seg == apple));
    else if(snake.slice(1).some(seg => ""+seg == snake[0]))
        snake.splice(1);
    else
        snake.pop();
    ctx.clearRect(0, 0, 256, 256);
    ctx.fillStyle = "red";
    ctx.fillRect(apple[0]*16, apple[1]*16, 16, 16);
    ctx.fillStyle = "lime";
    snake.forEach(([x,y]) => ctx.fillRect(x*16, y*16, 16, 16));
}, 125);