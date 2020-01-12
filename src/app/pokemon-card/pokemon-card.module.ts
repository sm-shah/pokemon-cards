import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonCardRoutingModule } from './pokemon-card-routing.module';
import { UpdatePokemonComponent } from './update-pokemon-list/update-pokemon.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchPokemonPipe } from './pokemon-list/search-pokemon.pipe';

@NgModule({
  declarations: [UpdatePokemonComponent, PokemonCardComponent, PokemonListComponent, SearchPokemonPipe],
  imports: [
    CommonModule,
    PokemonCardRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class PokemonCardModule { }
