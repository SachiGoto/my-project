import '@testing-library/jest-dom';
import 'whatwg-fetch';
import 'next-router-mock';
import {server} from './src/mocks/server';
// import {mswWorker} from './src/mocks/service'; 

server.listen();
        // Establish API mock before all tests.
beforeAll(()=> server.listen());

// Reset the request handlers between each test.
// This way the handlers we add on a per-test basis
// do not leak to other, irrelevant tests.
afterEach(()=> server.resetHandlers());

// Finally, disable API mocking after the tests are done.
afterAll(()=> server.close());
       


// const IS_BROWSER = typeof window !== 'undefined'


// export const setupMocks = async()=>{
//     if(IS_BROWSER){
//         mswWorker.start(); 
//     }else{
//         server.listen();
//         // Establish API mock before all tests.
// beforeAll(()=> server.listen());

// // Reset the request handlers between each test.
// // This way the handlers we add on a per-test basis
// // do not leak to other, irrelevant tests.
// afterEach(()=> server.resetHandlers());

// // Finally, disable API mocking after the tests are done.
// afterAll(()=> server.close());
       
//     }
// }

