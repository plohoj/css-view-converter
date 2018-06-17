import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IConverterSize } from '../../interfaces/iconverter-size';
import { BufferUnitService } from '../../shared/services/buffer-unit.service';

@Component({
	selector: 'app-converter',
	templateUrl: './converter.component.html',
	styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

	public _size: IConverterSize = {
		width: 1920,
		height: 1080,
	};
	@Input() public set size(value: IConverterSize) {
		this._size.width = value.width;
		this.height = value.height;
	}
	@Output() public modification = new EventEmitter<IConverterSize>();
	@Output() public delete = new EventEmitter();
	public values = {
		px: null as number,
		vw: null as number,
		vh: null as number,
	};
	constructor(private bufferUnitService: BufferUnitService) {}
	public get size() {
		return this._size;
	}
	public set width(value: number | string) {
		this.size.width = typeof value === 'string' ? parseFloat(value) : value;
		this.modification.next(this.size);
		this.updatePX();
	}
	public get width() {
		return this.round(this.size.width);
	}
	public set height(value: number | string) {
		this.size.height = typeof value === 'string' ? parseFloat(value) : value;
		this.modification.next(this.size);
		this.updatePX();
	}
	public get height() {
		return this.round(this.size.height);
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
		this.values.px = this.size.width * 0.01 * valueNumber;
		this.values.vh = this.values.px / this.size.height * 100;
	}
	public get vw() {
		return this.round(this.values.vw);
	}
	public set vh(value: number | string) {
		const valueNumber = typeof value === 'string' ? parseFloat(value) : value;
		this.values.vh = valueNumber;
		this.values.px = this.size.height * 0.01 * valueNumber;
		this.values.vw = this.values.px / this.size.width * 100;
	}
	public get vh() {
		return this.round(this.values.vh);
	}

	public ngOnInit() {
		console.log('init');
	}

	private updatePX() {
		this.values.vw = this.values.px / this.size.width * 100;
		this.values.vh = this.values.px / this.size.height * 100;
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
	public copyToBuffer(event: ClipboardEvent, units = 'px') {
		if (!this.bufferUnitService.addBufferUnit.value) {
			return;
		}
		const input = event.target as HTMLInputElement;
		const value = input.value.substring(input.selectionStart, input.selectionEnd);
		if (!value) {
			return;
		}
		event.clipboardData.setData('text/plain', value + units);
		event.preventDefault();
	}
	onDelete() {
		this.delete.next();
	}
}
