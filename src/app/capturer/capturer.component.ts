import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'iai-capturer',
  templateUrl: './capturer.component.html',
  styleUrls: ['./capturer.component.scss']
})
export class CapturerComponent implements OnInit {

  mouseIsDown: boolean = false;
  lastPosition: {x: number, y: number} = {x: 0, y: 0};
  currentPosition: {x: number, y: number} = {x: 0, y: 0};
  allPositions: {x: number, y: number}[] = [];

  @ViewChild('canvas') canvas: ElementRef;
  drawer: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.drawer = this.canvas.nativeElement.getContext('2d');

    this.canvas.nativeElement.addEventListener("mousemove", (e) => {
        this.mousemove(e.clientX, e.clientY)
    }, false);
    this.canvas.nativeElement.addEventListener("mousedown", (e) => {
        this.mousedown(e.clientX, e.clientY);
    }, false);
    this.canvas.nativeElement.addEventListener("mouseup", (e) => {
        this.mouseup();
    }, false);
    this.canvas.nativeElement.addEventListener("mouseout", (e) => {
        this.mouseup();
    }, false);

  }

  updateMousePositions(x, y) {
    this.lastPosition.x = this.currentPosition.x;
    this.lastPosition.y = this.currentPosition.y;
    this.currentPosition.x = x - this.canvas.nativeElement.offsetLeft;
    this.currentPosition.y = y - this.canvas.nativeElement.offsetTop;

    this.allPositions.push({x: this.currentPosition.x, y: this.currentPosition.y});
  }

  mousemove(x, y) {
    if (!this.mouseIsDown)
      return;

    this.updateMousePositions(x, y);

    this.drawLine();
  }

  mouseup() {
    this.mouseIsDown = false;
  }

  mousedown(x, y) {
    this.mouseIsDown = true;
    this.clearDrawing();
    this.allPositions = [];
    this.updateMousePositions(x, y);
    this.drawDot();
  }

  drawDot() {
    this.drawer.beginPath();
    this.drawer.fillStyle = 'lack';
    this.drawer.fillRect(this.currentPosition.x, this.currentPosition.y, 2, 2);
    this.drawer.closePath();
  }

  drawLine() {
    this.drawer.beginPath();
    this.drawer.moveTo(this.lastPosition.x, this.lastPosition.y);
    this.drawer.lineTo(this.currentPosition.x, this.currentPosition.y);
    this.drawer.strokeStyle = "black";
    this.drawer.lineWidth = 1;
    this.drawer.stroke();
    this.drawer.closePath();
  }

  clearDrawing() {
    this.drawer.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

}