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
  constructor(private router: Router, public pokemonCardService: PokemonCardService) { }

  ngOnInit() {
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
        this.pokemonCards = [...result]
      })
  }
  goToCardsUpdatePage() {
    this.router.navigate(['/', 'cards', 'update'])
  }

}
