import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';
import { SsoService } from '../../shared/services/sso.service';
import {SignupModel} from '../../shared/models/signup.model';

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public form: FormGroup;
  urlData={
    status:'',
    email:'',
    refrenceId:''
  };
  signupModel=new SignupModel();
  constructor(
    private fb: FormBuilder,
    private service: SsoService,
    private route: ActivatedRoute,
    private router: Router
    ) {
    this.urlData.status=this.route.snapshot.paramMap.get("status");
    this.urlData.email=this.route.snapshot.paramMap.get("email");
    this.urlData.refrenceId=this.route.snapshot.paramMap.get("refrenceId");
  }
  ngOnInit() {

  }
  onSubmit() {
    this.service.signup(this.signupModel).subscribe(result => {
      console.log({result});
    });
    this.router.navigate( ['/dashboard'] );
  }
}
