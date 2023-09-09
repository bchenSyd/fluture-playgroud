import { readFile } from "fs";
import { node, encase, chain, map, fork } from "fluture";

/** conventions
 *  https://github.com/fluture-js/Fluture#type-signatures
 * Nodeback a b - A Node-style callback; A function of signature (a | Nil, b) -> x.

*/


const getPackageName = (file) =>
  // Creates a Future which rejects with the first argument given to the function, or resolves with the second if the first is not present.
  // which is inline with nodejs convention (bluebird/promisify)
  node((done) => { // node :: (Nodeback e r -> x) -> Future e r
    //chrome://inspect
    debugger;
    readFile(file, "utf8", done);
  })
    /**
     *
     * Takes a function and a value, and returns a Future which when forked calls the function with the value and resolves with the result. 
     * If the function throws an exception, it is caught and the Future will reject with the exception.
     */
    .pipe(chain(encase(JSON.parse)))  // encase :: Throwing e a r -> a -> Future e r
                                      // encase :: (Throwing e) a(para1) r(eturn) -> a (para1) -> Future e(rror) r(eturn)
    .pipe(map((x) => x.name));

getPackageName("package1.json").pipe(fork(console.error)(console.log));
