const paths = [
    '/',
    '/index.html',
    '/es/',
    '/es/index.html',
    '/es/calculadora-de-plata-esterlina',
    '/es/calculadora-de-plata-esterlina.html',
    '/ru/калькулятор-лома-серебра',
    '/ar/حاسبة-خردة-الفضة/'
];

const langRegex = /\/(ar|de|es|fr|hi|it|pt|ru|tr|ur|zh)([/?#]|$)/;

paths.forEach(p => {
    const match = p.match(langRegex);
    const lang = match ? match[1] : 'en';
    console.log(`Path: ${p.padEnd(40)} -> Lang: ${lang}`);
});
