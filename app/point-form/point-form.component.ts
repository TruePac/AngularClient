import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core'

import { AlertService } from '../_services/index';
import { PointService } from './point.service';

import {Point} from './point-form.point.interface';

@Component({
    selector: 'point-form',
    templateUrl: './point-form.component.html',
    styleUrls: ['./point-form.component.css']
})
export class PointFormComponent implements OnInit {

    @ViewChild('canvas') canvasRef: ElementRef;
    public point: Point;
    points: Point[];
    ctx: CanvasRenderingContext2D;
    event: MouseEvent;

    public xValues = [
        { value: -3, display: '-3' },
        { value: -2, display: '-2' },
        { value: -1, display: '-1' },
        { value: 0, display: '0' },
        { value: 1, display: '1' },
        { value: 2, display: '2' },
        { value: 3, display: '3' },
        { value: 4, display: '4' },
        { value: 5, display: '5' }
    ];

    public rValues = [
        { value: -3, display: '-3' },
        { value: -2, display: '-2' },
        { value: -1, display: '-1' },
        { value: 0, display: '0' },
        { value: 1, display: '1' },
        { value: 2, display: '2' },
        { value: 3, display: '3' },
        { value: 4, display: '4' },
        { value: 5, display: '5' }
    ];

    constructor(private alertService: AlertService, private pointService: PointService) { }

    ngOnInit() {
        this.getPoints();
        this.point = {
            xValue: null,
            rValue: 0
        }
    }

    ngAfterViewInit() {
        let canvas = this.canvasRef.nativeElement;
        this.ctx = canvas.getContext("2d");
        this.draw_graph();
    }

    draw_graph() {
        var ctx = this.ctx;
        let canvas_width = this.canvasRef.nativeElement.width;
        let canvas_height = this.canvasRef.nativeElement.height;
        let grid_size = 320;
        if (this.canvasRef != null) {
            if (this.point.rValue < 0) {
                this.alertService.error("R must be >= 0");
                return null;
            }
            let r1 = this.point.rValue * 32;
            let x0 = 160;
            let y0 = 160;

            ctx.clearRect(0, 0, canvas_width, canvas_height);
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000"
            ctx.moveTo(0, grid_size / 2);
            ctx.lineTo(canvas_width, grid_size / 2);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000"
            ctx.moveTo(grid_size / 2, 0);
            ctx.lineTo(grid_size / 2, canvas_height);
            ctx.stroke();

            ctx.beginPath();
            ctx.rect(x0, y0, r1/2, r1);
            ctx.fillStyle = "#66ccff"
            ctx.fill();
            ctx.stroke();

            let radius = r1 / 2;
            let startAngle = Math.PI * 0.5;
            let endAngle = Math.PI;
            let antiClockwise = false;
            ctx.beginPath();
            ctx.arc(x0, y0, radius, startAngle, endAngle, antiClockwise);
            ctx.lineTo(x0, y0);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.lineTo(x0, y0 - r1);
            ctx.lineTo(x0 - r1 / 2, y0);
            ctx.lineTo(x0, y0);
            ctx.fill();
            ctx.stroke();
        }

    }
    
    drawOnClick(event: MouseEvent): void {
        var ctx = this.ctx;
        if (this.canvasRef != null) {
            var clientX = event.clientX - this.canvasRef.nativeElement.offsetLeft;
            var clientY = event.clientY - this.canvasRef.nativeElement.offsetTop;
            var x, y;
            if (clientX >= 160) {
                x = (clientX - 160) * 5 / 160;
            } else
                x = -(160 - clientX) * 5 / 160;
            if (clientY >= 160) {
                y = -(clientY - 160) * 5 / 160;
            } else
                y = (160 - clientY) * 5 / 160;
            this.drawPoint(clientX, clientY, "blue");
            this.point.xValue = x;
            this.point.yValue = y;
            
        }
    }
    
    drawPoint(x, y, color) {
        var ctx = this.ctx;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    getPoints(): void {
        this.pointService.getPoints()
            .subscribe(points => this.points = points);
    }


    getCurrentPoint() { return JSON.stringify(this.point); }

}
