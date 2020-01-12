import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonCardService {

  constructor(public db: AngularFirestore) { }

  getCards(): Observable<any> {
    return this.db.collection('card').snapshotChanges();
  }
  addCard(card): Promise<any> {
    return ((this.db.collection('card').add(card)))
  }
  updateCard(card): Promise<any> {
    return (this.db.collection('card').doc(card.id).set(card));
  }
  deleteCard(card): Promise<any> {
    return (this.db.collection('card').doc(card.id).delete());
  }
}
