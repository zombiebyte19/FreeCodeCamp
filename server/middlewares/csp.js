import helmet from 'helmet';

const trusted = [
  "'self'",
  'blob:',
  '104.236.218.15',
  '*.freecodecamp.com',
  'http://www.freecodecamp.com',
  'http://freecodecamp.com',
  'https://www.freecodecamp.com',
  'https://freecodecamp.com',
  'ws://freecodecamp.com/',
  'ws://www.freecodecamp.com/',
  '*.google-analytics.com',
  '*.google.com',
  '*.gstatic.com',
  '*.doubleclick.net',
  '*.twitter.com',
  '*.twitch.tv',
  "'unsafe-eval'",
  "'unsafe-inline'",
  '*.bootstrapcdn.com',
  '*.cloudflare.com',
  'localhost:3001',
  'ws://localhost:3001/',
  'http://localhost:3001',
  'localhost:3000',
  'ws://localhost:3000/',
  'http://localhost:3000',
  '*.youtube.com',
  '*.jsdelivr.net',
  'https://*.jsdelivr.net',
  '*.bitly.com'
];

export default function csp() {
  return helmet.csp({
    defaultSrc: trusted,
    scriptSrc: [
      '*.optimizely.com'
    ].concat(trusted),
    'connect-src': [
      '*.vimeo.com'
    ].concat(trusted),
    styleSrc: [].concat(trusted),
    imgSrc: [
      // allow all input since we have user submitted images for
      // public profile
      '*'
    ].concat(trusted),
    fontSrc: [].concat(trusted),
    mediaSrc: [
      '*.amazonaws.com',
      '*.twitter.com'
    ].concat(trusted),
    frameSrc: [
      '*.vimeo.com',
      '*.twitter.com'
    ].concat(trusted),
    // set to true if you only want to report errors
    reportOnly: false,
    // set to true if you want to set all headers
    setAllHeaders: false,
    // set to true if you want to force buggy CSP in Safari 5
    safari5: false
  });
}
