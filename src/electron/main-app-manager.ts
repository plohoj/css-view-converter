import { BrowserWindow, app } from 'electron';
import { ApplicationMode } from './interfaces/application-mode';

const PATH = __dirname;

export class MainAppManager {
	private mainWindow = new BrowserWindow({
		width: 500,
		height: 500,
	});
	constructor(mode: ApplicationMode) {
		switch (mode) {
			case 'NG_SERVE':
				this.mainWindow.loadURL(`http://localhost:4200`);
				this.mainWindow.webContents.openDevTools();
				break;
			case 'FiLE_SYSTEM':
			default:
				this.mainWindow.loadFile(`${PATH}/../../dist/css-view-converter/index.html`);
				break;
		}
		console.log(`Open main window, mode: ${mode}`);
	}
}
