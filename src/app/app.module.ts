import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxElectronModule } from 'ngx-electron';

import { AppComponent } from './app.component';
import { ConverterComponent } from './components/converter/converter.component';
import { AddButtonComponent } from './shared/add-button/add-button.component';
import { GroupComponent } from './shared/group/group.component';
import { BufferUnitService } from './shared/services/buffer-unit.service';

@NgModule({
	declarations: [
		AppComponent,
		AddButtonComponent,
		ConverterComponent,
		GroupComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		NgxElectronModule,
	],
	providers: [
		BufferUnitService,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
