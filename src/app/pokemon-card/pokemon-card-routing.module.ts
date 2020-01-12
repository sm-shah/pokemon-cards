import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { UpdatePokemonComponent } from './update-pokemon-list/update-pokemon.component';

const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'cards/update', component: UpdatePokemonComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonCardRoutingModule { }
