import { Component, OnInit } from '@angular/core';
import { HttpService } from './cards.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {

  classes: Array<string> = [
    "Death Knight",
    "Druid",
    "Hunter",
    "Mage",
    "Paladin",
    "Priest",
    "Rogue",
    "Shaman",
    "Warlock",
    "Warrior",
    "Dream",
    "Neutral"
  ];

  types: Array<string> = [
    "Hero",
    "Minion",
    "Spell",
    "Enchantment",
    "Weapon",
    "Hero Power"
  ];

  qualities: Array<string> =  [
    "Free",
    "Common",
    "Rare",
    "Epic",
    "Legendary"
  ];

  races: Array<string> = [
    "Demon",
    "Dragon",
    "Elemental",
    "Mech",
    "Murloc",
    "Beast",
    "Pirate",
    "Totem"
  ];

  cards = [];

  constructor(private myHttpService: HttpService){}

  onGetData(){

    this.myHttpService.getDataFromApi().
    subscribe(
      (response) => {
        console.log(response.json());
      },
      (error) => {
        console.error(error);
      }
    )
  }

  filters_classes(classe: string){
    this.cards = [];
    this.myHttpService.getDataClasses(classe).
    subscribe(
      (response) => {
        response.json().forEach(card => {
            if(card.img){
              this.cards.push(card);
              console.log(card);
            }
        });
      },
      (error) => {
        console.error(error);
      }
    )
  }

}
