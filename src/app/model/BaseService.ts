import { IBaseService } from '../model/IBaseService';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IBaseEntity } from '../model/IBaseEntity';

export abstract class BaseService<T extends IBaseEntity> implements IBaseService<T> {

    protected collection: AngularFirestoreCollection<T>;

    constructor(protected afs: AngularFirestore) {}

    // set collection should always be called first
    setCollection(path: string) {
        console.log('set collection called');
        console.log(path);
        this.collection = this.afs.collection(path);
    }

    get(identifier: string): Observable<T> {
        return this.collection
            .doc<T>(identifier)
            .snapshotChanges()
            .pipe(
                map(doc => {
                    if (doc.payload.exists) {
                /* workaround until spread works with generic types */
                        const data = doc.payload.data() as any;
                        const id = doc.payload.id;
                        return { id, ...data };
                    }
                })
            );
    }

    list(): Observable<T[]> {
        console.log('list method called');
        return this.collection
            .snapshotChanges()
            .pipe(
                map(changes => {
                    return changes.map(a => {
                        const data = a.payload.doc.data() as T;
                        data.id = a.payload.doc.id;
                        return data;
                    });
                })
            );
    }

    add(item: T): Promise<T> {
        const promise = new Promise<T>((resolve, reject) => {
            this.collection.add(item).then(ref => {
                const newItem = {
                    id: ref.id,
                    /* workaround until spread works with generic types */
                    ...(item as any)
                };
                resolve(newItem);
            });
        });
        return promise;
    }

    update(item: T): Promise<T> {
        const promise = new Promise<T>((resolve, reject) => {
        const docRef = this.collection
            .doc<T>(item.id)
            .set(item)
            .then(() => {
                resolve({
                    ...(item as any)
                });
            });
        });
        return promise;
    }

    delete(id: string): void {
        const docRef = this.collection.doc<T>(id);
        docRef.delete();
    }
}
