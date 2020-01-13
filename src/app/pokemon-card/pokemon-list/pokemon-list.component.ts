import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonCardService } from 'src/app/shared/service/pokemon-card.service';
import { map } from 'rxjs/operators'


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemonCards: any[] = [];
  searchQuery = ''
  showSpinner: boolean;
  constructor(private router: Router, public pokemonCardService: PokemonCardService) { }

  ngOnInit() {
    this.showSpinner = true
    this.pokemonCardService.getCards().pipe(
      map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data()
          }
        })
      }))
      .subscribe(result => {
        this.showSpinner = false
        this.pokemonCards = [...result]
      }, err => {
        this.showSpinner = false
      })
  }
  goToCardsUpdatePage() {
    this.router.navigate(['/', 'cards', 'update'])
  }

}
