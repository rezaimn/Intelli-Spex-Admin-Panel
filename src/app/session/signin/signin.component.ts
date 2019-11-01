import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {SigninModel} from '../../shared/models/signin.model';
import {SsoService} from '../../shared/services/sso.service';
import {MessageBoxComponent} from '../../shared/messageBox';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
    model: SigninModel = new SigninModel();
    public form: FormGroup;

    constructor(private service: SsoService,
                private messageBox: MessageBoxComponent,
                private fb: FormBuilder,
                private router: Router) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            email: [null, Validators.compose([Validators.required])], password: [null, Validators.compose([Validators.required])]
        });
    }

    onSubmit() {
        this.service.login(this.model).subscribe(result => {
            if (result.status === 200) {
                this.router.navigate(['/dashboard']);
                localStorage.setItem('token', result.result.token.token);
                localStorage.setItem('role', result.result.user.roles[0].name);

            } else {
                this.messageBox.showError(null, 'Authentication Failed!');
            }
        });
    }
}
