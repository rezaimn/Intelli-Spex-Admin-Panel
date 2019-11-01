import { Component, OnInit } from '@angular/core';
import { MessageBoxComponent } from '../../shared/messageBox';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateProjectModel } from 'src/app/shared/models/create-project.model';
import { UsersService } from 'src/app/shared/services/users-service';
import { template } from '@angular/core/src/render3';
import {DataSharingService} from '../../shared/services/data-sharing.service';

@Component({
  selector: 'app-create-user-group',
  templateUrl: './create-user-group.component.html',
  styleUrls: ['./create-user-group.component.scss']
})
export class CreateUserGroupComponent implements OnInit {
  model = [];
  id: number=0;
  name: string;
  isLoading = true;
  count = 0;
  offset = 0;
  limit = 8;
  term = ' ';
  selectedUsers=[];
  constructor(
    private service: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private messageBox: MessageBoxComponent,
    public dialog: MatDialog,

    public dataSharingService: DataSharingService
  ) {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 0);

  }
  ngOnInit() {
    if (this.id) {
      this.getUserList();
      this.getGroupUsers();
      if (this.dataSharingService.selectedUserGroup) {
        this.name = this.dataSharingService.selectedUserGroup.name;
      }

    }
  }
  setSelectedUser(userId) {
    if(this.selectedUsers.indexOf(userId)!=-1){
      this.selectedUsers.splice(this.selectedUsers.indexOf(userId),1);
    }else{
      this.selectedUsers.push(userId);
    }

  }
  getGroupUsers(){
    this.service.getGroupUserList(this.id).subscribe(res => {
      if (res.status === 200) {

        this.selectedUsers=res.result.map(user=>{
          return user.user_id;
        });
        this.name = res.result[0].group.name;
      }

    })

  }
  getUserList(event?) {
    const offset = event ? event.offset : this.offset;
    this.service.getUserListForGroup(offset + 1).subscribe(result => {
      if (result.status === 200) {

          this.isLoading = false;
            this.count = result.result.total;
            this.offset = result.result.page - 1;
            this.limit = result.result.perPage;
            this.model = result.result.data;

            // this.model = this.model.map((m) =>
            //   ({
            //     ...m,
            //     checked: res.result.filter(r => Number(r['user_id']) === Number(m.id)).length >= 1
            //   })
            // );
          } else {
        this.messageBox.showError(null, 'Operation failed!');
      }
    });
  }
  backClicked() {
    this.dataSharingService.goBackToGroupTab=1;
    this.router.navigate(['/users/user-group']);
  }
  addUserToGroup() {
    this.service.addUserToGroup(this.id , this.selectedUsers).subscribe((result) => {
      if (result.status === 200) {
        this.messageBox.showSuccess(null, `updated successfully`);
        this.dataSharingService.goBackToGroupTab=1;
        this.router.navigate(['/users/user-group']);
      } else {
        this.messageBox.showError(null, 'Operation failed!');
      }
    });
  }
  createGroup() {
    if (this.name.length >= 1) {
      this.service.createGroup(this.name).subscribe(result => {
        if (result.status === 200) {
          this.messageBox.showSuccess(null, `${result.result.name} created successfully`);
          this.dataSharingService.goBackToGroupTab=1;
          this.router.navigate(['/users/user-group']);
        } else {
          this.messageBox.showError(null, result);
        }
      });
    } else {
      this.messageBox.showError(null, 'please enter the name');

    }
  }
}
