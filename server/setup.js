import * from as constants './constants.js';

export function setupEnv(){
  process.env.DB_URI = constants.DB_URI;
  console.log('mongo lab env', process.env.DB_URI);
}

setupEnv();
