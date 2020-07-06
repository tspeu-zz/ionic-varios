import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PockedexService {
  baseUrl = 'https://pokeapi.co/api/v2';
  imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

  constructor(private _http: HttpClient) { }

  public getPokemon(offset = 0) {
    const _URL = `${this.baseUrl}/pokemon?offset=${offset}&limit=25`;
    return this._http.get(_URL)
      .pipe(  
          map(result =>{
            console.log(result);
            //return result;
            return result['results'];
          }),
          map(pokemon => {
            return pokemon.map((poke, index) => {
              poke.image = this.getPokeImage(offset + index + 1);
              poke.pokeIndex = offset + index + 1;
              return poke;
            });
          })
      );
  }

  public findPokemon(search: string) {
    console.log('search', search);
    return this._http.get(`${this.baseUrl}/pokemon/${search}`)
      .pipe(
        map( pokemon =>{
          pokemon['image'] = this.getPokeImage(pokemon['id']);
          pokemon['pokeIndex'] = pokemon['id'];
          return pokemon;
        })
      );
  }

  public getPokeImage(index) {
    console.log(`${this.imageUrl}${index}.png`);
    return `${this.imageUrl}${index}.png`;
  }

  public getPokeDetails(index) {
    return this._http.get(`${this.baseUrl}/pokemon/${index}`)
    .pipe(
      map(poke => {
        let sprites = Object.keys(poke['sprites']);
        poke['images'] = sprites
          .map(spriteKey => poke['sprites'][spriteKey])
          .filter(img => img);
        return poke;
      })
    );
  }




}
