import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EncrDecrService } from 'src/app/encr-decr.service';
import { AuthService } from '../../auth/auth.service';
import { CALIGuard } from '../../auth/cali.guard';
import { GlobalConstants } from '../../common/global-constants';
import { ServerService } from '../../server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  profileFormCo = this.fb.group({
    email :  ['', Validators.required],
    password : ['', Validators.required],
  })
  erreurLogin : boolean = false;

  constructor(private fb: FormBuilder, private service : ServerService, private route: ActivatedRoute, private router: Router, private authService : AuthService, private encrDecr : EncrDecrService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let email : string = this.profileFormCo.value.email;
    let password : string = this.encrDecr.set(GlobalConstants.encrypteKey, this.profileFormCo.value.password);

    this.service.connectProfile({
      email:email,
      password:password
    }).then((response: any) => {
      if(response == 'Login ou mot de passe invalide.'){
        this.erreurLogin = true;
      } else {
        this.authService.login(response.body[0].prenom);
        this.router.navigate(['/home']);
      }
    });
  }

}
