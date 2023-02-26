import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

describe("Async Testing Examples", () => {
  it('Asynchronous test example with Jasmine done()', (done: DoneFn) => {
    let test = false;

    setTimeout(() => {

      console.log('running assertions');

      test = true;

      expect(test).toBeTruthy();

      done();
    }, 1000);
  });

  it("Asynchronous test example - fakeAsync", fakeAsync(() => {

    let test = false;

    setTimeout(() => {

      console.log('running assertions');

      test = true;

    }, 1000);

    flush();

    expect(test).toBeTruthy();

  }));

  it('Asynchronous test example - plain Promise', fakeAsync(() => {

    let test = false;

    console.log('Creating Promise');

    Promise.resolve().then(() => {
      console.log('Promise first then() evaluted successfully');
      test = true;
      return Promise.resolve();
    }).then(() => {
      console.log('Promise second then() evaluted successfully');
    });

    flushMicrotasks();

    console.log('running assertions');

    expect(test).toBeTruthy();


  }));

  it('Asynchronous test example - Promise + setTimeout()', fakeAsync(() => {

    let counter = 0;

    Promise.resolve().then(() => {

      counter += 10;

      setTimeout(() => {
        counter += 1;
      }, 1000);
    });

    expect(counter).toBe(0);

    flushMicrotasks();

    expect(counter).toBe(10);

    flush();

    expect(counter).toBe(11);

  }));

  it('Asynchronous test example - Observables', fakeAsync(() => {

    let test = false;

    console.log('Create Observable');

    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(() => {

      test = true;

    });

    tick(1000);

    console.log('running assertions');

    expect(test).toBe(true);

  }));

});
