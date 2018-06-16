import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ElectronService } from 'ngx-electron';

@Injectable()
export class BufferUnitService {
	public addBufferUnit = new BehaviorSubject(true);
	constructor(private electronService: ElectronService) {
		if (electronService.isElectronApp) {
			electronService.ipcRenderer.on('addBufferUnit', (event, addBufferUnit) => {
				this.addBufferUnit.next(addBufferUnit);
			});
			electronService.ipcRenderer.send('addBufferUnit');
		}
	}
}
