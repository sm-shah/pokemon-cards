import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PokemonCardService } from 'src/app/shared/service/pokemon-card.service';
import { pokemonPhotos } from 'src/app/shared/common/constants';


@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {

  @Input('pokemonCards') pokemonCards;
  modalRef: BsModalRef;
  selectedCard: any;
  PokemonForm: FormGroup
  pokemonPhotos: string[] = pokemonPhotos;
  isSubmit: any;
  showSpinner: boolean;

  constructor(public pokemonCardService: PokemonCardService,
    private modalService: BsModalService, private fb: FormBuilder) { }
  ngOnInit() {
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
  setFormValue() {
    this.PokemonForm.patchValue(this.selectedCard)
  }
  openModal(template: TemplateRef<any>, card) {
    this.selectedCard = card
    this.modalRef = this.modalService.show(template);
    this.createForm()
    this.setFormValue()
  }
  updateLocalCard() {
    this.selectedCard.name = this.PokemonForm.value.name;
    this.selectedCard.height = this.PokemonForm.value.height;
    this.selectedCard.weight = this.PokemonForm.value.weight;
    this.selectedCard.description = this.PokemonForm.value.description;
    this.selectedCard.photo = this.PokemonForm.value.photo;
  }
  updateCard() {
    this.showSpinner = true
    this.isSubmit = true;
    if (this.PokemonForm.valid) {
      this.isSubmit = false;

      this.updateLocalCard();
      this.pokemonCardService.updateCard(this.selectedCard).then(res => {
        this.modalRef.hide()
        this.showSpinner = false;

      }, err => {
        this.modalRef.hide()
        this.showSpinner = false;
      })
    }
  }
  deleteCard(cardTD) {
    this.showSpinner = true
    this.pokemonCardService.deleteCard(cardTD).then(res => {
      this.showSpinner = false
      this.pokemonCards.forEach((card, index) => {
        if (card.id === cardTD.id) {
          this.pokemonCards.splice(index, 1)
        }
      })
    }, err => {
      this.showSpinner = false

    })
  }
}
