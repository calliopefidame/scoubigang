import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {

  historiques: any[] = [];

  constructor(private server: ServerService) { }

  ngOnInit(): void {
    this.getHistoriques();
  }

  
  private getHistoriques() {
    this.server.getHistoriques().then((response: any) => {
      if (!(typeof(response) == 'undefined' || typeof(response.body) == 'undefined')) {
        
        response.body.forEach((histo: { user: any; ancien_titre: any; nouveau_titre: any; ancien_texte: any; nouveau_texte: any; ancien_auteur: any; nouveau_auteur: any; }) => {
          this.historiques.push({
            user:histo.user,
            ancien_titre:histo.ancien_titre,
            nouveau_titre:histo.nouveau_titre,
            ancien_texte:histo.ancien_texte,
            nouveau_texte:histo.nouveau_texte,
            ancien_auteur:histo.ancien_auteur,
            nouveau_auteur:histo.nouveau_auteur
          })
        });
      } else {
        this.historiques = new Array;
      }
    });
  }
}
