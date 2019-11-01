import {Component} from '@angular/core';
import {ToasterService} from 'angular2-toaster';

@Component({
    template: ``
})
export class MessageBoxComponent {
    constructor(private toasterService: ToasterService) {
    }

    showSuccess(title: string, message: string) {
        const toast = {
            type: 'success',
            title: title,
            body: message
        };
        this.toasterService.pop(toast);
    }

    showError(title: string, message: string) {
        const toast = {
            type: 'error',
            title: title,
            body: message
        };
        this.toasterService.pop(toast);
    }

    showWarning(title: string, message: string) {
        const toast = {
            type: 'warning',
            title: title,
            body: message
        };
        this.toasterService.pop(toast);
    }

    showInfo(title: string, message: string) {
        const toast = {
            type: 'info',
            title: title,
            body: message
        };
        this.toasterService.pop(toast);
    }
}
