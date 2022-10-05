import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-constants';
import { EncrDecrService } from 'src/app/encr-decr.service';
import { ServerService } from '../../server.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  profileForm = this.fb.group({
    email :  ['', Validators.required],
    password : ['', Validators.required],
    passwordConfirm : ['', Validators.required],
    prenom : ['', Validators.required]
  })
  erreurPassConfirm :boolean = false;
  erreurPass :boolean = false;
  erreur_serveur : string = '';


  constructor(private fb: FormBuilder, private service : ServerService, private route: ActivatedRoute, private router: Router, private encrDecr : EncrDecrService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let email : string = this.profileForm.value.email;
    let password : string = this.profileForm.value.password;
    let passwordConfirm : string = this.profileForm.value.passwordConfirm;
    let prenom : string = this.profileForm.value.prenom;

    this.erreurPassConfirm = password != passwordConfirm;
    if (this.erreurPassConfirm) return;

    password = this.encrDecr.set(GlobalConstants.encrypteKey, password);

    this.service.createProfile({
      email:email,
      password:password,
      prenom:prenom
    }).then((response) => {
      if(response == 'EMAIL_ALREADY_EXISTS'){
        this.erreur_serveur = 'L\'email que vous essayez d\'utiliser est déjà en base !';
      } else {
        this.router.navigate(['/login']);
      }
    });

  }

}