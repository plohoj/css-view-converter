import { Component, OnInit } from '@angular/core';
import { IConverterSize } from './interfaces/iconverter-size';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	public converters: IConverterSize[] = [];

	ngOnInit() {

	}
	public add() {
		this.converters.push({width: null, height: null});
	}
}
