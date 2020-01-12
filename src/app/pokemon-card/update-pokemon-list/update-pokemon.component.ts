import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { PokemonCardService } from 'src/app/shared/service/pokemon-card.service';
import { map } from 'rxjs/operators'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { pokemonPhotos } from 'src/app/shared/common/constants';


@Component({
  selector: 'app-update-pokemon',
  templateUrl: './update-pokemon.component.html',
  styleUrls: ['./update-pokemon.component.scss']
})
export class UpdatePokemonComponent implements OnInit {
  pokemonCards = []
  PokemonForm: FormGroup
  pokemonPhotos: string[] = pokemonPhotos;
  isSubmit: boolean

  constructor(public pokemonCardService: PokemonCardService, private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.createForm()
    this.getPokemons();
  }
  createForm() {
    this.PokemonForm = this.fb.group({
      name: ['', Validators.required],
      weight: [null, Validators.required],
      height: [null, Validators.required],
      description: ['', Validators.required],
      photo: ['', Validators.required],

    })
  }
  getPokemons() {
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
  addCard() {
    this.isSubmit = true
    if (this.PokemonForm.valid) {
      this.pokemonCardService.addCard(this.PokemonForm.value).then(res => {
        this.createForm()
        this.isSubmit = false
        this.getPokemons();
      })
    }
  }

}
