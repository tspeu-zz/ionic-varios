import { Component,  OnInit, ViewChild  } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import {PockedexService }  from '../services/pockedex.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  offset = 0;
  pokemon = [];

  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;

  constructor(private pokeService: PockedexService ) {}

  ngOnInit(): void {
    this.loadPokemon();
  }
  
  loadPokemon(loadMore = false, event?) {
    console.log('loadMOre');
    console.log(event);
    if (loadMore) {
      this.offset += 25;
    }
 
    this.pokeService.getPokemon(this.offset)
    .subscribe(res => {
      console.log('load res', res);
      this.pokemon = [...this.pokemon, ...res];
      console.log('this.pokemon', this.pokemon);
      
      if (event) {
        event.target.complete();
      }
 
      // Optional
      if (this.offset == 125) {
        this.infinite.disabled = true;
      }
    });
  }

  onSearchChange(e) {
    let value = e.detail.value;
 
    if (value == '') {
      this.offset = 0;
      this.loadPokemon();
      return;
    }
 
    this.pokeService.findPokemon(value).subscribe(res => {
      this.pokemon = [res];
    }, err => {
      this.pokemon = [];
    });
  }

}
