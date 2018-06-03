import { Component, OnInit, Input } from '@angular/core';
import { IConverterSize } from '../../interfaces/iconverter-size';

@Component({
	selector: 'app-converter',
	templateUrl: './converter.component.html',
	styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
	@Input() public set converter(size: IConverterSize) {
		this.values.width = size.width;
		this.height = size.height;
	}
	public values = {
		width: 1920,
		height: 1080,
		px: null as number,
		vw: null as number,
		vh: null as number,
	};
	constructor() { }

	public set width(value: number) {
		this.values.width = value;
		this.updatePX();
	}
	public get width() {
		return this.values.width;
	}
	public set height(value: number) {
		this.values.height = value;
		this.updatePX();
	}
	public get height() {
		return this.round(this.values.height);
	}
	public set px(value: number) {
		this.values.px = value;
		this.updatePX();
	}
	public get px() {
		return this.round(this.values.px);
	}
	public set vw(value: number) {
		this.values.vw = value;
		this.values.px = this.values.width * 0.01 * value;
		this.values.vh = this.values.px / this.values.height * 100;
	}
	public get vw() {
		return this.round(this.values.vw);
	}
	public set vh(value: number) {
		this.values.vh = value;
		this.values.px = this.values.height * 0.01 * value;
		this.values.vw = this.values.px / this.values.width * 100;
	}
	public get vh() {
		return this.round(this.values.vh);
	}
	private updatePX() {
		this.values.vw = this.values.px / this.values.width * 100;
		this.values.vh = this.values.px / this.values.height * 100;
	}
	private round(value: number) {
		return (Math.round(value * 100) * 0.01);
	}
	ngOnInit() {}
}
