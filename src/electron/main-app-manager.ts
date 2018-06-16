
import { ApplicationMode } from './interfaces/application-mode';
import { Menu, BrowserWindow, MenuItem, MenuItemConstructorOptions } from 'electron';

const PATH = __dirname;

export class MainAppManager {
	private mainWindow = new BrowserWindow({
		width: 500,
		height: 500,
	});
	private menu = new Menu();
	private options = new MenuItem({
		label: 'Опции',
		submenu: [
			{
				type: 'checkbox',
				label: 'Поверх окон',
				click: (option) => this.toggleAlwaysOnTop(option.checked),
			}, {
				id: 'devTools',
				type: 'checkbox',
				label: 'Панель разработчика',
				accelerator: 'F12',
				click: this.updateShowDevTools.bind(this),
			}, {
				label: 'Выход',
				click: () => this.mainWindow.close(),
			}
		],
	});

	constructor(mode: ApplicationMode) {
		this.menu.insert(0, this.options);
		this.mainWindow.setMenu(this.menu);
		switch (mode) {
			case 'NG_SERVE':
				this.mainWindow.loadURL('http://localhost:4200');
				this.isShowDevTools = true;
				break;
			case 'FiLE_SYSTEM':
			default:
				this.mainWindow.loadFile(`${PATH}/../../dist/css-view-converter/index.html`);
				break;
		}
		console.log(`Open main window, mode: ${mode}`);
	}
	private set isShowDevTools(show: boolean) {
		const devTools = this.menu.getMenuItemById('devTools')
		if (devTools) {
			devTools.checked = show;
		}
		this.updateShowDevTools();
	}
	private get isShowDevTools() {
		const devTools = this.menu.getMenuItemById('devTools')
		if (devTools) {
			return devTools.checked;
		}
		return false;
	}
	private updateShowDevTools() {
		if (this.isShowDevTools) {
			this.mainWindow.webContents.openDevTools();
		} else {
			this.mainWindow.webContents.closeDevTools();
		}
	}
	private toggleAlwaysOnTop(showOnTop: boolean) {
		this.mainWindow.setAlwaysOnTop(showOnTop);
	}
}
