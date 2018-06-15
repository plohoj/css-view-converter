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

	public set width(value: number | string) {
		this.values.width = typeof value === 'string' ? parseFloat(value) : value;
		this.updatePX();
	}
	public get width() {
		return this.round(this.values.width);
	}
	public set height(value: number | string) {
		this.values.height = typeof value === 'string' ? parseFloat(value) : value;
		this.updatePX();
	}
	public get height() {
		return this.round(this.values.height);
	}
	public set px(value: number | string) {
		this.values.px = typeof value === 'string' ? parseFloat(value) : value;
		this.updatePX();
	}
	public get px() {
		return this.round(this.values.px);
	}
	public set vw(value: number | string) {
		const valueNumber = typeof value === 'string' ? parseFloat(value) : value;
		this.values.vw = valueNumber;
		this.values.px = this.values.width * 0.01 * valueNumber;
		this.values.vh = this.values.px / this.values.height * 100;
	}
	public get vw() {
		return this.round(this.values.vw);
	}
	public set vh(value: number | string) {
		const valueNumber = typeof value === 'string' ? parseFloat(value) : value;
		this.values.vh = valueNumber;
		this.values.px = this.values.height * 0.01 * valueNumber;
		this.values.vw = this.values.px / this.values.width * 100;
	}
	public get vh() {
		return this.round(this.values.vh);
	}

	ngOnInit() {}
	private updatePX() {
		this.values.vw = this.values.px / this.values.width * 100;
		this.values.vh = this.values.px / this.values.height * 100;
	}
	private round(value: number) {
		if (value && typeof value === 'number' && value !== Infinity) {
			let roundValueString = (Math.round(value * 100) / 100).toString().replace(',', '.');
			const shot = roundValueString.search('.');
			if (shot > 0 && roundValueString.length - shot > 2) {
				roundValueString = roundValueString.substr(0, shot + 2);
			}
			return roundValueString;
		}
		return '';
	}
	public onInputFocus(event: FocusEvent) {
		(event.target as HTMLInputElement).select();
	}
}
