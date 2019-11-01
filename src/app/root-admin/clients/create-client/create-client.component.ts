import {Component, OnInit} from '@angular/core';
import {MessageBoxComponent} from '../../../shared/messageBox';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {CreateClientModel} from '../../../shared/models/create-client.model';
import {ClientService} from '../../../shared/services/client-service';

@Component({
    selector: 'app-create-client',
    templateUrl: './create-client.component.html',
    styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent {
    model: CreateClientModel = new CreateClientModel();
    id: number;

    constructor(
        private service: ClientService,
        private router: Router,
        private route: ActivatedRoute,
        private messageBox: MessageBoxComponent,
        public dialog: MatDialog,
    ) {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'), 0);
        if (this.id) {
            this.getClientById();
        }
    }

    getClientById() {
        this.service.getClientById(this.id).subscribe(result => {
            if (result.status === 200) {
                this.model.name = result.result[0].name;
                this.model.email = result.result[0].user.email;
            } else {
                this.messageBox.showError(null, 'Operation failed!');
            }
        });
    }

    backClicked() {
        this.router.navigate(['/root-admin/clients/client-list']);
    }

    addUpdateClient() {
        if (this.id) {
            let modelT = {...this.model};
            delete modelT.email;
            this.service.updateClient(this.model, this.id).subscribe((result) => {
                if (result.status === 200) {
                    this.messageBox.showSuccess(null, `${result.result.name} Updated successfully`);
                } else {
                    this.messageBox.showError(null, result);
                }
            });
        } else {
            this.service.addClient(this.model).subscribe((result) => {
                if (result.status === 200) {
                    this.messageBox.showSuccess(null, `${result.result.name} created successfully`);
                } else {
                    this.messageBox.showError(null, result);
                }
            });
        }

    }
}
