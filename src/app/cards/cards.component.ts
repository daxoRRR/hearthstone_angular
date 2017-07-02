import { Component, OnInit } from '@angular/core';
import { HttpService } from './cards.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {

  images: Array<string> = [
    "/assets/class_icon/colorless/deathknight.png",
    "/assets/class_icon/colorless/druid.png",
    "/assets/class_icon/colorless/hunter.png",
    "/assets/class_icon/colorless/mage.png",
    "/assets/class_icon/colorless/paladin.png",
    "/assets/class_icon/colorless/priest.png",
    "/assets/class_icon/colorless/rogue.png",
    "/assets/class_icon/colorless/shaman.png",
    "/assets/class_icon/colorless/warlock.png",
    "/assets/class_icon/colorless/warrior.png",
    "/assets/class_icon/colorless/dream.jpg",
    "/assets/class_icon/colorless/neutral.jpg"
  ]

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

  filters_classes(classe: string, index: number){
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
    //changer couleurs images
    var size = this.images.length;
    for(var i = 0; i < size; i++){
      this.images[i] = this.images[i].replace("colorful", "colorless");
    }
    this.images[index] = this.images[index].replace("colorless", "colorful");
  }
}
