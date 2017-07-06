import { Component, OnInit } from '@angular/core';
import { HttpService } from './cards.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {

  images: Array<string> = [
    "/assets/class_icon/colorless/druid.png",
    "/assets/class_icon/colorless/hunter.png",
    "/assets/class_icon/colorless/mage.png",
    "/assets/class_icon/colorless/paladin.png",
    "/assets/class_icon/colorless/priest.png",
    "/assets/class_icon/colorless/rogue.png",
    "/assets/class_icon/colorless/shaman.png",
    "/assets/class_icon/colorless/warlock.png",
    "/assets/class_icon/colorless/warrior.png",
    "/assets/class_icon/colorless/neutral.png",
    "/assets/class_icon/colorless/favoris.png"
  ]

  classes: Array<string> = [
    "Druid",
    "Hunter",
    "Mage",
    "Paladin",
    "Priest",
    "Rogue",
    "Shaman",
    "Warlock",
    "Warrior",
    "Neutral",
    "Favoris"
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

  favoris = JSON.parse(localStorage.getItem('mesFavoris'));
  cards = [];
  actualClasse = "";
  p: number = 1;

  constructor(private myHttpService: HttpService){}

  onGetData(){

    this.myHttpService.getDataFromApi().
    subscribe(
      (response) => {
        //console.log(response.json());
      },
      (error) => {
        console.error(error);
      }
    )
  }

  filters_classes(classe: string, index: number){
    this.actualClasse = classe;
    this.cards = [];
    if(classe == "Favoris"){
      this.cards = JSON.parse(localStorage.getItem('mesFavoris'));
    }
    else{
      this.myHttpService.getDataClasses(classe).
      subscribe(
        (response) => {
          response.json().forEach(card => {
              if(card.img){
                this.cards.push(card);
                //console.log(card);
              }
          });
        },
        (error) => {
          console.error(error);
        }
      )
    }
    //changer couleurs des images
    var size = this.images.length;
    for(var i = 0; i < size; i++){
      this.images[i] = this.images[i].replace("colorful", "colorless");
    }
    this.images[index] = this.images[index].replace("colorless", "colorful");
    //retour à la page 1
    this.p = 1;
  }

  handleStorage(card){
    //passé this en parametre ne renvoyait pas la balise img mais cardComponent. On récupère la balise img d'une autre facon :
    var img = <HTMLImageElement>document.querySelector('#fav'+card.cardId);
    
    if(!this.dansFavoris(card)){
      //ajout aux favoris
      img.src="/assets/class_icon/colorful/favoris.png";
      this.favoris.push(card);
      localStorage.setItem('mesFavoris', JSON.stringify(this.favoris));
    }
    else{
      //on le retire des favoris
      img.src="/assets/class_icon/colorless/favoris.png";
      var size = this.favoris.length;
      for(let i =0; i < size; i++){
        if(this.favoris[i].cardId == card.cardId){
          this.favoris.splice(i, 1);
          localStorage.setItem('mesFavoris', JSON.stringify(this.favoris));
          if(this.actualClasse == "Favoris"){
            this.cards = this.favoris;
          } 
          break;
        }
      }

    }
  }

  dansFavoris(card){
    var sizeOf = this.favoris.length;
    for(let i =0; i < sizeOf; i++){
      if(this.favoris[i].cardId == card.cardId){
        console.log(true);
        return true;
        //déjà dans les favoris, on ne l'ajoute pas à nouveau
      }
    }
    console.log(false);
    return false;
  }
}
