import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {SigninModel} from '../../shared/models/signin.model';
import {SsoService} from '../../shared/services/sso.service';
import {MessageBoxComponent} from '../../shared/messageBox';

@Component({
    selector: 'app-signout',
    templateUrl: './signout.component.html',
    styleUrls: ['./signout.component.scss']
})
export class SignoutComponent implements OnInit {
  
    constructor(private service: SsoService,
                private messageBox: MessageBoxComponent,
                private fb: FormBuilder,
                private router: Router) {

                   localStorage.setItem('token', '');
                   this.router.navigate(['/signin']);
    }

    ngOnInit() {
    
    }

}
