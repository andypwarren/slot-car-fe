import { AccelerometerService } from './../services/accelerometer/accelerometer.service';
import { Observable } from 'rxjs/Observable';
import { Component, ViewChild, ElementRef, AfterViewInit, Input, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
    selector: 'app-meter',
    template: '<canvas class="canvas" #canvas></canvas>',
    styleUrls: ['./meter.component.scss']
})
export class MeterComponent implements AfterViewInit, AfterViewChecked {
    @ViewChild('canvas') public canvas: ElementRef;
    @Input() public endAngle: number;
    @Input() public height: number;
    private offset: number;
    private canvasEl: HTMLCanvasElement;
    private cx: CanvasRenderingContext2D;
    private gaugeWidth = 16;

    constructor() { }

    public ngAfterViewInit(): void {
        this.createCanvas();
    }

    public ngAfterViewChecked(): void {
        this.drawArcTo(this.endAngle);
    }

    private createCanvas() {
        this.canvasEl = this.canvas.nativeElement;
        this.canvasEl.height = this.height + (this.gaugeWidth * 2);
        this.canvasEl.width = this.canvasEl.height;
        this.cx = this.canvasEl.getContext('2d');
        this.cx.lineWidth = this.gaugeWidth;
        this.cx.strokeStyle = '#00B245';
        this.cx.globalCompositeOperation = 'copy';
    }

    private drawArcTo(endAngle: number) {
        const offset = 90;
        const pos = this.canvasEl.height / 2;
        this.cx.beginPath();
        this.cx.arc(pos, pos, pos - (this.gaugeWidth / 2),  this.toRadians(135), this.toRadians(endAngle + 90), false);
        this.cx.stroke();
    }

    private toRadians(angle: number): number {
        return angle * (Math.PI / 180);
    }
}
