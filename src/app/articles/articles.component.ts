import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ServerService } from '../../../../scoubigang/src/app/server.service';
import { AuthService } from '../auth/auth.service';
import { GlobalConstants } from '../common/global-constants';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  form: any;
  modalRef: BsModalRef = new BsModalRef;

  articles: any[] = [];
  currentArticle: any = {id: null, titre: '', texte: ''};
  modalCallback!: () => void;
  username: string = "anonyme";

  constructor(private fb: FormBuilder,
              private modalService: BsModalService,
              private server: ServerService,
              private authservice : AuthService) { }

  ngOnInit() {
    this.form = this.fb.group({
      titre: [this.currentArticle.titre, Validators.required],
      texte: this.currentArticle.texte,
    });
    this.getArticles();
    this.username = this.authservice.username;
  }

  private updateForm() {
    this.form.setValue({
      titre: this.currentArticle.titre,
      texte: this.currentArticle.texte
    });
  }

  private getArticles() {
    this.server.getArticles().then((response: any) => {
      if (!(typeof(response) == 'undefined' || typeof(response.body) == 'undefined')) {
        this.articles = response.body.map((ev: any) => {
          ev.body = ev.texte;
          ev.header = ev.titre;
          ev.icon = 'fa-clock-o';
          return ev;
        });
      } else {
        this.articles = new Array;
      }
    });
  }

  addArticle(template:any) {
    this.currentArticle = {id: null, titre: '', texte: ''};
    this.updateForm();
    this.modalCallback = this.createArticle.bind(this);
    this.modalRef = this.modalService.show(template);
  }

  createArticle() {
    const newArticle = {
      titre: this.form.get('titre').value,
      texte: this.form.get('texte').value,
      proprietaire: this.authservice.username,
      dateCreation: new Date()
    };
    this.modalRef.hide();
    this.server.createArticle(newArticle).then(() => {
      this.getArticles();
    });
  }

  editArticle(index:any, template:any) {
    this.currentArticle = this.articles[index];
    this.updateForm();
    this.modalCallback = this.updateArticle.bind(this);
    this.modalRef = this.modalService.show(template);
  }

  updateArticle() {
    const articleData = {
      id: this.currentArticle.id,
      titre: this.form.get('titre').value,
      texte: this.form.get('texte').value,
      proprietaire: this.authservice.username,
      dateCreation: new Date(),
    };
    this.modalRef.hide();
    this.server.updateArticle(articleData).then(() => {
      this.getArticles();
    });
  }

  deleteArticle(index:any) {
    this.server.deleteArticle(this.articles[index]).then(() => {
      this.getArticles();
    });
  }

  onCancel() {
    this.modalRef.hide();
  }
}
