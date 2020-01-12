import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPokemon',
  pure: false

})
export class SearchPokemonPipe implements PipeTransform {

  transform(items: any[], filter: any): any {
    if (!filter || !items) {
      return items;
    }
    return items.filter(item => {
      return item.name.toLowerCase().indexOf(filter) > -1
    })
  }

}
