import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ConverterComponent } from './components/converter/converter.component';
import { AddButtonComponent } from './shared/add-button/add-button.component';
import { GroupComponent } from './shared/group/group.component';

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
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
