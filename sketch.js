function setup() {
  h=windowHeight
  w=windowWidth
  var cnv=createCanvas(w, h,WEBGL);
  seed=random()*64;

  cnv.style('display', 'block');
}

function drawPanes(){
  translate(-w/2,-h/2)
  push();

  noStroke()

  // white shapes
  rect(0,0,paneWidth,h);
  rect(w-paneWidth,0,paneWidth,h);
  rect(0,0,w,paneWidth);
  rect(0,h-paneWidth,w,paneWidth);
  rect(w/2-thinWidth/2,0,thinWidth,h);
  rect(0,h/2-thinWidth/2,w,thinWidth);
  pop();

  push();
  noFill();
  //grey lines
  strokeWeight(5);
  stroke(51);
  rect(0,0,w,h)
  rect(paneWidth,paneWidth,w-2*paneWidth,h-2*paneWidth)
  rect(paneWidth,paneWidth,w/2-paneWidth-thinWidth/2,h/2-paneWidth-thinWidth/2)
  rect(w/2+thinWidth/2,paneWidth,w/2-paneWidth-thinWidth/2,h/2-paneWidth-thinWidth/2)
  rect(paneWidth,h/2+thinWidth/2,w/2-paneWidth-thinWidth/2,h/2-paneWidth-thinWidth/2)
  rect(w/2+thinWidth/2,h/2+thinWidth/2,w/2-paneWidth-thinWidth/2,h/2-paneWidth-thinWidth/2)
  rect(thinWidth,h-paneWidth,w-thinWidth*2,h-thinWidth)
  pop();
}

function drawMountains(){
  const dirY = (mouseY / h/2 - 0.5) * 2;
  const dirX = (mouseX / w - 0.5) * 2;
  //radius=radius*seed
  push()
  noStroke();
  fill(25,200,40)
  directionalLight(220, 220, 220, -dirX, -dirY, -0.5);
  translate(-1.5 * radius, h/2+paneWidth, -radius*7/4);
  ellipsoid(radius*3,radius/3,radius*1.5);
  push();
  fill(30,100,250)
  translate(radius*2,radius-radius/32,radius)
  box(radius*3,radius*2,radius*1.5)
  pop();
  translate(3 * radius, radius, radius*1/4);
  ellipsoid(radius*3,radius*2,radius);
  translate(-radius/16,-radius,0)
//  sphere(radius)
  rotateZ(PI)
  //for (let i=0;i<9;i++){
    push();
//    sphere(radius)
    translate(radius,0,-radius*2.5)
    cone(radius*3,radius*4)
    translate(-radius*1.75,0,-radius*0.5)
    cone(radius*3,radius*6)
    fill('white');
    translate(0,radius*2.51,0)
    cone(radius*1/2,radius)
    fill(25,200,40)
    translate(radius*6,-radius*4,radius)
    ellipsoid(radius*5,radius*3,radius*3);
    pop();
    //}
  pop()

}

function drawSun(){
  push();
  fill(200,220,120)
  noStroke();
  translate((mouseX- 0.5-w/2)*3.25,(mouseY-h/2 - 0.5)*3.25,-(h+w))
  sphere(radius/2);
  pop();
}

function mouseClicked(){
  seed=-seed;
}

function drawGradient(){
  const dirY = (mouseY / h - 0.5)*255;
  const dirX = (mouseX / w - 0.5)*255;
  push();
  translate(-w*2,-h*2,-(w+h))
  noStroke();
  beginShape();

  fill(0-seed,100+seed*2,255-dirY-seed);
  vertex(0,0); //top-left

  fill(200-dirY/2-seed,120-dirX/2+seed,255-dirY);
  vertex(0,h*4); //bottom-left

  fill(120+dirY-seed,160-dirX-seed,200-dirX);
  vertex(w*4,h*4); //bottom-right

  fill(dirX,dirY-seed,100+dirX+dirY+seed);
  vertex(w*4,0); //top-right

  endShape(CLOSE);
  pop();
}

function draw() {
  paneWidth=min(windowWidth/20,50);
  thinWidth=paneWidth/3
  radius=h/3;
  //translate(-windowWidth/2,-windowHeight/2)
  background(60,210,280);

  drawGradient()

  drawSun();
  drawMountains();
  drawPanes();


}
