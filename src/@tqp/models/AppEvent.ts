import { Observable, Subject, Subscription } from 'rxjs';

export class AppEvent<T> {
  public observable: Observable<T>;
  public source: Subject<T>;

  constructor() {
    this.source = new Subject<T>();
    this.observable = this.source.asObservable();
  }

  public emit(payload: T) {
    this.source.next(payload);
  }

  public subscribe(generatorOrNext: any): Subscription {
    return this.observable.subscribe(generatorOrNext);
  }
}
