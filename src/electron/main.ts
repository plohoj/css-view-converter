import { app } from 'electron';
import { MainAppManager } from './main-app-manager';
import { ApplicationMode } from './interfaces/application-mode';

let mainAppManager: MainAppManager;

export function main(mode: ApplicationMode = 'FiLE_SYSTEM') {
    mainAppManager = null;
    app.on('ready', () => mainAppManager = new MainAppManager(mode));
}
