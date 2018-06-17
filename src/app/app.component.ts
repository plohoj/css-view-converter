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
		const convertersString = localStorage.getItem('converters');
		if (convertersString) {
			const converters = JSON.parse(convertersString);
			if (converters instanceof Array) {
				this.converters = converters;
			}
		}
		window.addEventListener('unload', this.saveConverters.bind(this));
	}
	public add() {
		this.converters.push({width: null, height: null});
	}
	public delete(item: IConverterSize) {
		const index = this.converters.findIndex(converter => converter === item);
		if (index >= 0) {
			this.converters.splice(index, 1);
		}
	}
	public modification(item: IConverterSize, size: IConverterSize) {
		item.width = size.width;
		item.height = size.height;
		this.saveConverters();
	}
	public saveConverters() {
		localStorage.setItem('converters', JSON.stringify(this.converters));
	}
}
