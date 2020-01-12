import { TestBed } from '@angular/core/testing';

import { PokemonCardService } from './pokemon-card.service';

describe('PokemonCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PokemonCardService = TestBed.get(PokemonCardService);
    expect(service).toBeTruthy();
  });
});
