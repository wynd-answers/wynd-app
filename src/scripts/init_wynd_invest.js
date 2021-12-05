#!/usr/bin/env node
/*jshint esversion: 8 */

/* eslint-disable @typescript-eslint/naming-convention */
const { accounts, contracts, createSigningClient } = require("./config");


const locations = [
  "830c00fffffffff",
  "830c01fffffffff",
  "830c02fffffffff",
  "830c03fffffffff",
  "830c04fffffffff",
  "830c05fffffffff",
  "830c06fffffffff",
  "830c08fffffffff",
  "830c09fffffffff",
  "830c0afffffffff",
  "830c0bfffffffff",
  "830c0cfffffffff",
  "830c0dfffffffff",
  "830c0efffffffff",
  "830c11fffffffff",
  "830c13fffffffff",
  "830c14fffffffff",
  "830c15fffffffff",
  "830c18fffffffff",
  "830c19fffffffff",
  "830c1afffffffff",
  "830c1bfffffffff",
  "830c1cfffffffff",
  "830c1dfffffffff",
  "830c1efffffffff",
  "830c20fffffffff",
  "830c21fffffffff",
  "830c22fffffffff",
  "830c23fffffffff",
  "830c24fffffffff",
  "830c25fffffffff",
  "830c26fffffffff",
  "830c28fffffffff",
  "830c29fffffffff",
  "830c2afffffffff",
  "830c2bfffffffff",
  "830c2cfffffffff",
  "830c2dfffffffff",
  "830c2efffffffff",
  "830c30fffffffff",
  "830c31fffffffff",
  "830c32fffffffff",
  "830c33fffffffff",
  "830c34fffffffff",
  "830c35fffffffff",
  "830c42fffffffff",
  "830c44fffffffff",
  "830c45fffffffff",
  "830c51fffffffff",
  "830c52fffffffff",
  "830c54fffffffff",
  "830c55fffffffff",
  "830c56fffffffff",
  "830c5afffffffff",
  "830c60fffffffff",
  "830c61fffffffff",
  "830c62fffffffff",
  "830c63fffffffff",
  "830c64fffffffff",
  "830c65fffffffff",
  "830c66fffffffff",
  "830c68fffffffff",
  "830c6afffffffff",
  "830c6cfffffffff",
  "830c6dfffffffff",
  "830c6efffffffff",
  "830c70fffffffff",
  "830c71fffffffff",
  "830c72fffffffff",
  "830c73fffffffff",
  "830c74fffffffff",
  "830c75fffffffff",
  "830c76fffffffff",
  "830ca0fffffffff",
  "830ca5fffffffff",
  "830ca9fffffffff",
  "830cabfffffffff",
  "830cadfffffffff",
  "830cc1fffffffff",
  "830cc3fffffffff",
  "830cdcfffffffff",
  "830cdefffffffff",
  "830ce0fffffffff",
  "830ce1fffffffff",
  "830ce2fffffffff",
  "830ce3fffffffff",
  "830ce4fffffffff",
  "830ce5fffffffff",
  "830ce6fffffffff",
  "830ce8fffffffff",
  "830ce9fffffffff",
  "830ceafffffffff",
  "830cecfffffffff",
  "830cedfffffffff",
  "830ceefffffffff",
  "830cf1fffffffff",
  "830cf4fffffffff",
  "830cf5fffffffff",
  "830cf6fffffffff",
  "830d03fffffffff",
  "830d08fffffffff",
  "830d09fffffffff",
  "830d0afffffffff",
  "830d0bfffffffff",
  "830d0cfffffffff",
  "830d0dfffffffff",
  "830d0efffffffff",
  "830d18fffffffff",
  "830d19fffffffff",
  "830d1afffffffff",
  "830d1bfffffffff",
  "830d1cfffffffff",
  "830d1dfffffffff",
  "830d1efffffffff",
  "830d40fffffffff",
  "830d42fffffffff",
  "830d43fffffffff",
  "830d44fffffffff",
  "830d46fffffffff",
  "830d4afffffffff",
  "830d4bfffffffff",
  "830d4efffffffff",
  "830d50fffffffff",
  "830d51fffffffff",
  "830d52fffffffff",
  "830d53fffffffff",
  "830d54fffffffff",
  "830d55fffffffff",
  "830d56fffffffff",
  "830d58fffffffff",
  "830d59fffffffff",
  "830d5afffffffff",
  "830d5bfffffffff",
  "830d5cfffffffff",
  "830d5dfffffffff",
  "830d5efffffffff",
  "830d70fffffffff",
  "830d71fffffffff",
  "830d72fffffffff",
  "830d73fffffffff",
  "830d75fffffffff",
  "830d76fffffffff",
  "830d89fffffffff",
  "830da9fffffffff",
  "8312b0fffffffff",
  "8312b1fffffffff",
  "8312c9fffffffff",
  "8312cafffffffff",
  "8312cbfffffffff",
  "8312d8fffffffff",
  "8312d9fffffffff",
  "8312dafffffffff",
  "8312dbfffffffff",
  "8312defffffffff",
  "831393fffffffff",
  "831396fffffffff",
  "83139efffffffff",
  "832600fffffffff",
  "832601fffffffff",
  "832602fffffffff",
  "832603fffffffff",
  "832604fffffffff",
  "832605fffffffff",
  "832606fffffffff",
  "832608fffffffff",
  "832609fffffffff",
  "83260afffffffff",
  "83260bfffffffff",
  "83260cfffffffff",
  "83260dfffffffff",
  "83260efffffffff",
  "832610fffffffff",
  "832611fffffffff",
  "832612fffffffff",
  "832613fffffffff",
  "832614fffffffff",
  "832615fffffffff",
  "832616fffffffff",
  "832618fffffffff",
  "832619fffffffff",
  "83261afffffffff",
  "83261bfffffffff",
  "83261cfffffffff",
  "83261dfffffffff",
  "83261efffffffff",
  "832620fffffffff",
  "832621fffffffff",
  "832622fffffffff",
  "832623fffffffff",
  "832624fffffffff",
  "832625fffffffff",
  "832626fffffffff",
  "832628fffffffff",
  "832629fffffffff",
  "83262afffffffff",
  "83262bfffffffff",
  "83262cfffffffff",
  "83262dfffffffff",
  "83262efffffffff",
  "832630fffffffff",
  "832631fffffffff",
  "832632fffffffff",
  "832633fffffffff",
  "832634fffffffff",
  "832635fffffffff",
  "832636fffffffff",
  "832640fffffffff",
  "832641fffffffff",
  "832642fffffffff",
  "832643fffffffff",
  "832644fffffffff",
  "832645fffffffff",
  "832646fffffffff",
  "832648fffffffff",
  "832649fffffffff",
  "83264afffffffff",
  "83264bfffffffff",
  "83264cfffffffff",
  "83264dfffffffff",
  "83264efffffffff",
  "832650fffffffff",
  "832651fffffffff",
  "832652fffffffff",
  "832653fffffffff",
  "832654fffffffff",
  "832655fffffffff",
  "832656fffffffff",
  "832658fffffffff",
  "832659fffffffff",
  "83265afffffffff",
  "83265bfffffffff",
  "83265cfffffffff",
  "83265dfffffffff",
  "83265efffffffff",
  "832660fffffffff",
  "832661fffffffff",
  "832662fffffffff",
  "832663fffffffff",
  "832664fffffffff",
  "832665fffffffff",
  "832666fffffffff",
  "832668fffffffff",
  "832669fffffffff",
  "83266afffffffff",
  "83266bfffffffff",
  "83266cfffffffff",
  "83266dfffffffff",
  "83266efffffffff",
  "832670fffffffff",
  "832671fffffffff",
  "832672fffffffff",
  "832673fffffffff",
  "832674fffffffff",
  "832675fffffffff",
  "832676fffffffff",
  "832680fffffffff",
  "832681fffffffff",
  "832682fffffffff",
  "832684fffffffff",
  "832685fffffffff",
  "832686fffffffff",
  "832688fffffffff",
  "832689fffffffff",
  "83268afffffffff",
  "83268bfffffffff",
  "83268cfffffffff",
  "83268dfffffffff",
  "83268efffffffff",
  "832690fffffffff",
  "832691fffffffff",
  "832692fffffffff",
  "832693fffffffff",
  "832694fffffffff",
  "832695fffffffff",
  "832696fffffffff",
  "832698fffffffff",
  "832699fffffffff",
  "83269afffffffff",
  "83269bfffffffff",
  "83269cfffffffff",
  "83269dfffffffff",
  "83269efffffffff",
  "8326a0fffffffff",
  "8326a1fffffffff",
  "8326a2fffffffff",
  "8326a3fffffffff",
  "8326a4fffffffff",
  "8326a5fffffffff",
  "8326a6fffffffff",
  "8326a8fffffffff",
  "8326a9fffffffff",
  "8326aafffffffff",
  "8326abfffffffff",
  "8326acfffffffff",
  "8326adfffffffff",
  "8326aefffffffff",
  "8326b0fffffffff",
  "8326b1fffffffff",
  "8326b2fffffffff",
  "8326b3fffffffff",
  "8326b4fffffffff",
  "8326b5fffffffff",
  "8326b6fffffffff",
  "8326c0fffffffff",
  "8326c1fffffffff",
  "8326c2fffffffff",
  "8326c3fffffffff",
  "8326c4fffffffff",
  "8326c5fffffffff",
  "8326c6fffffffff",
  "8326c8fffffffff",
  "8326c9fffffffff",
  "8326cafffffffff",
  "8326cbfffffffff",
  "8326ccfffffffff",
  "8326cdfffffffff",
  "8326cefffffffff",
  "8326d0fffffffff",
  "8326d1fffffffff",
  "8326d2fffffffff",
  "8326d3fffffffff",
  "8326d4fffffffff",
  "8326d5fffffffff",
  "8326d6fffffffff",
  "8326d8fffffffff",
  "8326d9fffffffff",
  "8326dafffffffff",
  "8326dbfffffffff",
  "8326dcfffffffff",
  "8326ddfffffffff",
  "8326defffffffff",
  "8326e0fffffffff",
  "8326e1fffffffff",
  "8326e2fffffffff",
  "8326e3fffffffff",
  "8326e4fffffffff",
  "8326e5fffffffff",
  "8326e6fffffffff",
  "8326e8fffffffff",
  "8326e9fffffffff",
  "8326eafffffffff",
  "8326ebfffffffff",
  "8326ecfffffffff",
  "8326edfffffffff",
  "8326eefffffffff",
  "8326f0fffffffff",
  "8326f1fffffffff",
  "8326f2fffffffff",
  "8326f3fffffffff",
  "8326f4fffffffff",
  "8326f5fffffffff",
  "8326f6fffffffff",
  "832708fffffffff",
  "832709fffffffff",
  "83270afffffffff",
  "83270bfffffffff",
  "83270dfffffffff",
  "83270efffffffff",
  "832718fffffffff",
  "832719fffffffff",
  "83271afffffffff",
  "83271bfffffffff",
  "83271dfffffffff",
  "83271efffffffff",
  "832740fffffffff",
  "832741fffffffff",
  "832742fffffffff",
  "832743fffffffff",
  "832744fffffffff",
  "832745fffffffff",
  "832746fffffffff",
  "832748fffffffff",
  "832749fffffffff",
  "83274afffffffff",
  "83274bfffffffff",
  "83274cfffffffff",
  "83274dfffffffff",
  "83274efffffffff",
  "832750fffffffff",
  "832751fffffffff",
  "832752fffffffff",
  "832753fffffffff",
  "832754fffffffff",
  "832755fffffffff",
  "832756fffffffff",
  "832758fffffffff",
  "832759fffffffff",
  "83275afffffffff",
  "83275bfffffffff",
  "83275cfffffffff",
  "83275dfffffffff",
  "83275efffffffff",
  "832763fffffffff",
  "832768fffffffff",
  "83276afffffffff",
  "83276bfffffffff",
  "83276efffffffff",
  "832771fffffffff",
  "832772fffffffff",
  "832773fffffffff",
  "832780fffffffff",
  "832781fffffffff",
  "832782fffffffff",
  "832783fffffffff",
  "832784fffffffff",
  "832785fffffffff",
  "832786fffffffff",
  "832788fffffffff",
  "832789fffffffff",
  "83278afffffffff",
  "83278bfffffffff",
  "83278cfffffffff",
  "83278dfffffffff",
  "83278efffffffff",
  "832790fffffffff",
  "832791fffffffff",
  "832792fffffffff",
  "832793fffffffff",
  "832794fffffffff",
  "832795fffffffff",
  "832796fffffffff",
  "832798fffffffff",
  "832799fffffffff",
  "83279afffffffff",
  "83279bfffffffff",
  "83279cfffffffff",
  "83279dfffffffff",
  "83279efffffffff",
  "8327a8fffffffff",
  "8327a9fffffffff",
  "8327aafffffffff",
  "8327abfffffffff",
  "8327acfffffffff",
  "8327adfffffffff",
  "8327aefffffffff",
  "8327b3fffffffff",
  "832802fffffffff",
  "832806fffffffff",
  "832810fffffffff",
  "832811fffffffff",
  "832812fffffffff",
  "832813fffffffff",
  "832814fffffffff",
  "832815fffffffff",
  "832816fffffffff",
  "832818fffffffff",
  "83281afffffffff",
  "83281bfffffffff",
  "83281cfffffffff",
  "83281efffffffff",
  "832830fffffffff",
  "832831fffffffff",
  "832832fffffffff",
  "832833fffffffff",
  "832834fffffffff",
  "832836fffffffff",
  "832880fffffffff",
  "832881fffffffff",
  "832882fffffffff",
  "832883fffffffff",
  "832884fffffffff",
  "832885fffffffff",
  "832886fffffffff",
  "832888fffffffff",
  "832889fffffffff",
  "83288afffffffff",
  "83288bfffffffff",
  "83288cfffffffff",
  "83288dfffffffff",
  "83288efffffffff",
  "832890fffffffff",
  "832891fffffffff",
  "832892fffffffff",
  "832893fffffffff",
  "832894fffffffff",
  "832895fffffffff",
  "832896fffffffff",
  "832898fffffffff",
  "832899fffffffff",
  "83289afffffffff",
  "83289bfffffffff",
  "83289cfffffffff",
  "83289dfffffffff",
  "83289efffffffff",
  "8328a0fffffffff",
  "8328a1fffffffff",
  "8328a2fffffffff",
  "8328a3fffffffff",
  "8328a4fffffffff",
  "8328a5fffffffff",
  "8328a6fffffffff",
  "8328a8fffffffff",
  "8328a9fffffffff",
  "8328aafffffffff",
  "8328abfffffffff",
  "8328acfffffffff",
  "8328adfffffffff",
  "8328aefffffffff",
  "8328b0fffffffff",
  "8328b1fffffffff",
  "8328b2fffffffff",
  "8328b3fffffffff",
  "8328b4fffffffff",
  "8328b5fffffffff",
  "8328b6fffffffff",
  "8328c2fffffffff",
  "8328c6fffffffff",
  "8328d0fffffffff",
  "8328d1fffffffff",
  "8328d2fffffffff",
  "8328d3fffffffff",
  "8328d4fffffffff",
  "8328d5fffffffff",
  "8328d6fffffffff",
  "8328f0fffffffff",
  "8328f1fffffffff",
  "8328f2fffffffff",
  "8328f3fffffffff",
  "8328f4fffffffff",
  "8328f5fffffffff",
  "8328f6fffffffff",
  "832913fffffffff",
  "832980fffffffff",
  "832981fffffffff",
  "832982fffffffff",
  "832983fffffffff",
  "832984fffffffff",
  "832985fffffffff",
  "832986fffffffff",
  "832988fffffffff",
  "832989fffffffff",
  "83298afffffffff",
  "83298bfffffffff",
  "83298cfffffffff",
  "83298dfffffffff",
  "83298efffffffff",
  "832990fffffffff",
  "832991fffffffff",
  "832992fffffffff",
  "832993fffffffff",
  "832994fffffffff",
  "832995fffffffff",
  "832996fffffffff",
  "832998fffffffff",
  "832999fffffffff",
  "83299afffffffff",
  "83299bfffffffff",
  "83299cfffffffff",
  "83299dfffffffff",
  "83299efffffffff",
  "8329a0fffffffff",
  "8329a1fffffffff",
  "8329a2fffffffff",
  "8329a3fffffffff",
  "8329a4fffffffff",
  "8329a5fffffffff",
  "8329a6fffffffff",
  "8329a8fffffffff",
  "8329a9fffffffff",
  "8329aafffffffff",
  "8329abfffffffff",
  "8329acfffffffff",
  "8329adfffffffff",
  "8329aefffffffff",
  "8329b0fffffffff",
  "8329b1fffffffff",
  "8329b2fffffffff",
  "8329b3fffffffff",
  "8329b4fffffffff",
  "8329b5fffffffff",
  "8329b6fffffffff",
  "832a10fffffffff",
  "832a12fffffffff",
  "832a13fffffffff",
  "832a14fffffffff",
  "832a15fffffffff",
  "832a16fffffffff",
  "832a30fffffffff",
  "832a31fffffffff",
  "832a32fffffffff",
  "832a33fffffffff",
  "832a34fffffffff",
  "832a36fffffffff",
  "832a80fffffffff",
  "832a81fffffffff",
  "832a82fffffffff",
  "832a83fffffffff",
  "832a84fffffffff",
  "832a85fffffffff",
  "832a86fffffffff",
  "832a88fffffffff",
  "832a89fffffffff",
  "832a8afffffffff",
  "832a8bfffffffff",
  "832a8cfffffffff",
  "832a8dfffffffff",
  "832a8efffffffff",
  "832a90fffffffff",
  "832a91fffffffff",
  "832a92fffffffff",
  "832a93fffffffff",
  "832a94fffffffff",
  "832a95fffffffff",
  "832a96fffffffff",
  "832a98fffffffff",
  "832a99fffffffff",
  "832a9afffffffff",
  "832a9bfffffffff",
  "832a9cfffffffff",
  "832a9dfffffffff",
  "832a9efffffffff",
  "832aa0fffffffff",
  "832aa1fffffffff",
  "832aa2fffffffff",
  "832aa3fffffffff",
  "832aa4fffffffff",
  "832aa5fffffffff",
  "832aa6fffffffff",
  "832aa8fffffffff",
  "832aa9fffffffff",
  "832aaafffffffff",
  "832aabfffffffff",
  "832aacfffffffff",
  "832aadfffffffff",
  "832aaefffffffff",
  "832ab0fffffffff",
  "832ab1fffffffff",
  "832ab2fffffffff",
  "832ab3fffffffff",
  "832ab5fffffffff",
  "832ab6fffffffff",
  "832ad0fffffffff",
  "832ad2fffffffff",
  "832ad3fffffffff",
  "832ad4fffffffff",
  "832ad5fffffffff",
  "832ad6fffffffff",
  "832af0fffffffff",
  "832af2fffffffff",
  "832af3fffffffff",
  "832af6fffffffff",
  "832b10fffffffff",
  "832b11fffffffff",
  "832b12fffffffff",
  "832b13fffffffff",
  "832b18fffffffff",
  "832b1afffffffff",
  "832b1efffffffff",
  "832b88fffffffff",
  "832b89fffffffff",
  "832b8afffffffff",
  "832b8bfffffffff",
  "832b8cfffffffff",
  "832b8dfffffffff",
  "832b8efffffffff",
  "832b99fffffffff",
  "832b9bfffffffff",
  "832ba8fffffffff",
  "832ba9fffffffff",
  "832babfffffffff",
  "832bacfffffffff",
  "832badfffffffff",
  "834412fffffffff",
  "834413fffffffff",
  "83441afffffffff",
  "83441bfffffffff",
  "83441efffffffff",
  "834440fffffffff",
  "834441fffffffff",
  "834442fffffffff",
  "834443fffffffff",
  "834444fffffffff",
  "834445fffffffff",
  "834446fffffffff",
  "834448fffffffff",
  "834449fffffffff",
  "83444afffffffff",
  "83444bfffffffff",
  "83444cfffffffff",
  "83444dfffffffff",
  "83444efffffffff",
  "834450fffffffff",
  "834451fffffffff",
  "834452fffffffff",
  "834453fffffffff",
  "834455fffffffff",
  "834456fffffffff",
  "834458fffffffff",
  "834459fffffffff",
  "83445afffffffff",
  "83445bfffffffff",
  "83445cfffffffff",
  "83445dfffffffff",
  "83445efffffffff",
  "834463fffffffff",
  "834468fffffffff",
  "834469fffffffff",
  "83446afffffffff",
  "83446bfffffffff",
  "83446cfffffffff",
  "83446dfffffffff",
  "83446efffffffff",
  "834471fffffffff",
  "834473fffffffff",
  "8344a8fffffffff",
  "8344a9fffffffff",
  "8344acfffffffff",
  "8344adfffffffff",
  "8344aefffffffff",
  "8344c0fffffffff",
  "8344c1fffffffff",
  "8344c2fffffffff",
  "8344c3fffffffff",
  "8344c4fffffffff",
  "8344c5fffffffff",
  "8344c6fffffffff",
  "8344c8fffffffff",
  "8344c9fffffffff",
  "8344cafffffffff",
  "8344cbfffffffff",
  "8344ccfffffffff",
  "8344cdfffffffff",
  "8344cefffffffff",
  "8344d0fffffffff",
  "8344d1fffffffff",
  "8344d3fffffffff",
  "8344d5fffffffff",
  "8344d8fffffffff",
  "8344d9fffffffff",
  "8344dafffffffff",
  "8344dbfffffffff",
  "8344dcfffffffff",
  "8344ddfffffffff",
  "8344defffffffff",
  "8344e0fffffffff",
  "8344e1fffffffff",
  "8344e2fffffffff",
  "8344e3fffffffff",
  "8344e4fffffffff",
  "8344e5fffffffff",
  "8344e6fffffffff",
  "8344e8fffffffff",
  "8344e9fffffffff",
  "8344eafffffffff",
  "8344ebfffffffff",
  "8344ecfffffffff",
  "8344edfffffffff",
  "8344eefffffffff",
  "8344f0fffffffff",
  "8344f1fffffffff",
  "8344f3fffffffff",
  "8344f4fffffffff",
  "8344f5fffffffff",
  "8344f6fffffffff",
  "834648fffffffff",
  "834649fffffffff",
  "834859fffffffff",
  "83485afffffffff",
  "83485bfffffffff",
  "834880fffffffff",
  "834882fffffffff",
  "834883fffffffff",
  "834886fffffffff",
  "834888fffffffff",
  "834889fffffffff",
  "83488afffffffff",
  "83488bfffffffff",
  "83488dfffffffff",
  "83488efffffffff",
  "834891fffffffff",
  "834892fffffffff",
  "834893fffffffff",
  "834895fffffffff",
  "834898fffffffff",
  "834899fffffffff",
  "83489afffffffff",
  "83489bfffffffff",
  "83489cfffffffff",
  "83489dfffffffff",
  "83489efffffffff",
  "8348abfffffffff",
  "8348b1fffffffff",
  "8348b3fffffffff",
  "8348c0fffffffff",
  "8348c1fffffffff",
  "8348c2fffffffff",
  "8348c3fffffffff",
  "8348c4fffffffff",
  "8348c5fffffffff",
  "8348c6fffffffff",
  "8348c8fffffffff",
  "8348c9fffffffff",
  "8348cafffffffff",
  "8348cbfffffffff",
  "8348ccfffffffff",
  "8348cdfffffffff",
  "8348cefffffffff",
  "8348d0fffffffff",
  "8348d1fffffffff",
  "8348d2fffffffff",
  "8348d3fffffffff",
  "8348d4fffffffff",
  "8348d5fffffffff",
  "8348d6fffffffff",
  "8348d8fffffffff",
  "8348d9fffffffff",
  "8348dafffffffff",
  "8348dbfffffffff",
  "8348dcfffffffff",
  "8348ddfffffffff",
  "8348defffffffff",
  "8348e3fffffffff",
  "8348e8fffffffff",
  "8348e9fffffffff",
  "8348eafffffffff",
  "8348ebfffffffff",
  "8348ecfffffffff",
  "8348edfffffffff",
  "8348eefffffffff",
  "8348f2fffffffff",
  "8348f3fffffffff",
  "8348f6fffffffff",
  "835d10fffffffff",
  "835d11fffffffff",
];

const initMsg = {
  // same as facuet account... for testing
  oracle: accounts.oracle,
  token: contracts.wyndAddr,
  max_investment_hex: "999999000000", // just shy of 1 million WYND
  maturity_days: 2, // for testing
  measurement_window: 7,
  locations,
};

async function main() {
  const {client, address} = await createSigningClient();

  // get this from running upload_contracts
  const codeId = contracts.investId;

  console.log(`Instantiating Code ${codeId} with:`);
  console.log(initMsg);

  const receipt = await client.instantiate(address, codeId, initMsg, "WYND Invest", "auto", {admin: address});

  console.debug(`Instantiate succeeded. Receipt: ${JSON.stringify(receipt)}`);
  console.debug("");
  console.log(`Contract Address: ${receipt.contractAddress}`);
}

main().then(
  () => {
    console.info('All done, let the coins flow.');
    process.exit(0);
  },
  (error) => {
    console.error(error);
    process.exit(1);
  }
);
