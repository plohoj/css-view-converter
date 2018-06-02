import { Component, OnInit, Input } from '@angular/core';
import { IConverterSize } from '../../interfaces/iconverter-size';

@Component({
	selector: 'app-converter',
	templateUrl: './converter.component.html',
	styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
	@Input() public coverter: IConverterSize = {width: 1920, height: 320};
	constructor() { }

	ngOnInit() {
	}

}
