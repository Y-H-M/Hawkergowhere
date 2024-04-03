document.addEventListener('DOMContentLoaded', function() {

    // Update the headers & footers, then set cookies for a new visitor and setup dark mode
    Promise.all([uploadHeader(), uploadFooter()]).then(() => {
        newVisitor();
        darkMode();
    });

    // Run JS code for each page
    if (window.location.pathname.includes('/home.html')) {
        searchLocation();
    } else if (window.location.pathname.includes('/search.html')) {
        processSearch();
        saveItem();
    } else if (window.location.pathname.includes('/saved.html')) {
        loadSave();
        saveItem();
    }
});

import hawkersData from './hawkers.json'assert {type: 'json'};

// Upload header into page
const uploadHeader = () => {
    return fetch('header.html')
        .then(response => {
            return response.text();
        })
        .then(htmlContent => {
            document.getElementsByTagName('header')[0].innerHTML = htmlContent;
        });
};

// Upload footer into page
const uploadFooter = () => {
    return fetch('footer.html')
        .then(response => {
            return response.text();
        })
        .then(htmlContent => {
            document.getElementsByTagName('footer')[0].innerHTML = htmlContent;
            document.getElementById('year').innerHTML = new Date().getFullYear();
        });
};

// Submit form with user's location
const searchLocation = () => {
    document.getElementById('locationsearch').addEventListener('submit', function(event) {
        event.preventDefault();

        const latInput = document.getElementById('lat');
        const longInput = document.getElementById('long');

        navigator.geolocation.getCurrentPosition(function(position) {
            latInput.value = position.coords.latitude;
            longInput.value = position.coords.longitude;
            event.target.submit();
        });
    });
};

// Set cookies for new user
const newVisitor = () => {
    let visited = parseInt(getCookies()['visited']);
    if (!visited) {
        for (let i = 0; i < hawkersData.length; i++) {
            setCookie(i + 1, 0);
        }
        setCookie('visited', 1);
        setCookie('dark', 0);
    }
};

// Toggle dark mode
const darkMode = () => {
    let cookies = getCookies();
    let button = document.getElementById('Dark-Mode');
    button.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    let home = document.getElementById('Home');
    home.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100" height="18.0978601403" viewBox="498.55111,269.28352,539.49892,97.63776"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="none" stroke-linecap="none" stroke-linejoin="none" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><text x="318.0337" y="168.3833" transform="scale(2.03412,2.03412)" id="PointText 1" fill="#3c4245" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" font-family="font-18th-Century-Muster" font-weight="normal" font-size="40" text-anchor="middle">Hawkerg</text><path d="M800.04569,317.10239c0,-9.73142 7.88888,-17.62031 17.62031,-17.62031c9.73142,0 17.62031,7.88888 17.62031,17.62031c0,9.73142 -7.88888,17.62031 -17.62031,17.62031c-9.73142,0 -17.62031,-7.88888 -17.62031,-17.62031zM817.666,328.78417c6.91538,0 12.52142,-5.23011 12.52142,-11.68178c0,-6.45166 -5.60603,-11.68178 -12.52142,-11.68178c-6.91538,0 -12.52142,5.23011 -12.52142,11.68178c0,6.45166 5.60603,11.68178 12.52142,11.68178z" id="CompoundPath 1" fill="#3c4245" stroke="#3c4245" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/><path d="M800.72807,321.34394l15.87762,44.13904" id="Path 1" fill-opacity="0" fill="#3c4245" stroke="#3c4245" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/><path d="M834.44471,321.34394l-17.83902,44.13904" id="Path 1" fill-opacity="0" fill="#3c4245" stroke="#3c4245" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/><path d="M827.47071,328.70316c-1.10213,3.3587 -3.02441,6.07956 -4.54663,9.23694c-2.53429,5.25661 -4.96833,11.52111 -5.90864,17.31444c-0.09429,0.57851 -0.19622,1.15517 -0.30791,1.73057c-0.04851,0.24993 -0.10846,1.00297 -0.14158,0.75054c-0.25367,-1.93343 0.04243,-3.94311 -0.10814,-5.89312c-0.45748,-5.92467 -1.58821,-12.25915 -4.65389,-17.43753c-0.79539,-1.34353 -1.67848,-2.62648 -2.63407,-3.86053c-0.1044,-0.13482 -0.78483,-1.17498 -0.90666,-1.16322c-0.7428,0.07175 -0.625,1.84647 -0.57797,2.25708c0.24619,2.14962 1.21628,4.26169 1.97022,6.27333c1.57244,4.10642 3.42801,8.09705 4.90708,12.24042c0.35439,0.99276 0.68943,1.99277 1.01756,2.99447c0.01459,0.04454 0.27731,1.04283 0.34449,1.05092c0.44334,0.05342 0.60131,-0.68164 0.77385,-1.09351c0.42731,-1.02004 0.56099,-2.17859 0.63898,-3.27221c0.32337,-4.53397 -0.17057,-9.07602 0.511,-13.58917c0.00474,-0.03138 0.30628,-1.72293 0.31851,-1.71953c0.75504,0.21032 0.37656,2.80037 0.28677,3.38204c-0.05435,0.35209 -0.52704,0.93474 -0.19051,1.05167c0.41575,0.14446 0.77386,-0.43762 1.09324,-0.74046c0.65174,-0.61798 1.15196,-1.38649 1.64402,-2.13011c0.16695,-0.2523 0.31386,-0.4912 0.47506,-0.75278c0.115,-0.18661 0.55754,-0.54376 0.33921,-0.56337c-0.17466,-0.01569 -0.31679,0.15053 -0.47519,0.22579c-1.57035,0.97701 -8.75042,3.64564 -5.18329,-1.08141" id="Path 1" fill-opacity="0" fill="#3c4245" stroke="#3c4245" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M828.68316,327.51146c-0.65641,1.50972 -1.31076,2.99481 -1.71271,4.59622c-0.12573,0.50091 -0.2333,0.99777 -0.37964,1.49451c-0.05257,0.17846 -0.11075,0.35552 -0.17145,0.53136c-0.0377,0.10923 -0.178,0.42417 -0.11597,0.32668c0.52056,-0.81817 0.83558,-1.84545 1.22713,-2.73014c0.12988,-0.29347 0.25786,-0.5876 0.39086,-0.87967c0.05551,-0.1219 0.13409,-0.49092 0.17289,-0.36272c0.14211,0.46947 -0.29706,1.24998 -0.48699,1.65668c-0.06852,0.14672 -0.13901,0.29252 -0.20856,0.43875c-0.04564,0.09597 -0.20866,0.36586 -0.13595,0.28836c0.69249,-0.73799 1.20732,-1.66218 1.62438,-2.58042c0.15488,-0.34099 0.28681,-0.69097 0.40974,-1.04448c0.04538,-0.13051 0.2604,-0.44776 0.13383,-0.39233c-0.3496,0.1531 -0.76035,0.97043 -0.95861,1.27849c-0.98144,1.525 -1.70313,3.15501 -2.33248,4.85002c-0.64463,1.81961 -1.20978,3.66692 -1.8334,5.49387c-0.29195,0.8553 -1.48436,3.28369 -1.00239,2.51917c1.26505,-2.00666 2.24912,-4.45708 3.07637,-6.68472c0.40229,-1.08328 1.37148,-4.41298 1.07006,-3.29742c-1.12049,4.14687 -3.83704,8.76511 -5.99424,12.53515" id="Path 1" fill-opacity="0" fill="#3c4245" stroke="#3c4245" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M821.9612,344.61552c-0.49092,1.28731 -0.76725,2.65245 -1.31728,3.91497c-0.18899,0.43381 -0.42112,0.82758 -0.6752,1.22487c-0.08311,0.12995 -0.15673,0.26375 -0.21953,0.40476c-0.04043,0.09077 -0.20174,0.28389 -0.10245,0.27995c0.31397,-0.01247 0.60194,-0.63402 0.73231,-0.87442c0.57606,-1.06224 1.2,-2.14981 1.66656,-3.26427c0.17497,-0.41794 0.32922,-0.84311 0.4833,-1.26908c0.055,-0.15205 0.1068,-0.3052 0.15865,-0.45834c0.0221,-0.06528 0.09986,-0.2561 0.06666,-0.19571c-1.28423,2.33572 -2.04173,5.09023 -2.82876,7.62799c-0.4698,1.4629 -1.08063,2.9956 -1.79329,4.36074" id="Path 1" fill-opacity="0" fill="#3c4245" stroke="#3c4245" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M815.12278,356.49845c-0.50541,-1.11206 -0.94927,-2.37746 -1.17552,-3.58376c-0.14208,-0.75753 -0.13564,-1.54491 -0.34372,-2.28998c-0.56801,-2.03391 -1.36589,-4.04803 -2.06551,-6.04149c-0.12708,-0.34779 -0.293,-0.67929 -0.46341,-1.0075" id="Path 1" fill-opacity="0" fill="#3c4245" stroke="#3c4245" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M806.48114,328.27767c1.28215,3.74427 -0.40213,3.34628 -0.88204,0.33687" id="Path 1" fill-opacity="0" fill="#3c4245" stroke="#3c4245" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M816.77182,357.93333c-0.12373,1.55773 -0.13485,3.09544 -0.32612,4.64918c-0.02141,0.17391 -0.22228,1.37766 -0.04302,1.41004c0.40633,0.0734 0.73269,-0.77829 0.83474,-0.98114c0.57318,-1.13936 0.61877,-2.6018 0.72505,-3.85047c0.03702,-0.43499 0.06902,-0.87027 0.10177,-1.30558c0.01298,-0.17246 0.02566,-0.34485 0.04124,-0.51709c0.00584,-0.06462 0.05012,-0.25089 0.01949,-0.19368c-0.34877,0.65134 -0.31411,1.54232 -0.38889,2.25816c-0.02476,0.23705 -0.33758,0.6903 -0.09989,0.70801c0.18689,0.01393 0.78769,-1.14318 0.92482,-1.37639c0.58199,-1.03023 -0.38957,3.34024 -1.56288,3.18719c-1.24319,-0.16217 0.6959,-4.86592 0.10594,-3.75967c-0.25237,0.47323 0.00254,3.45857 -0.40852,3.61652c-0.80105,0.30779 0.21462,-3.24521 0.07627,-3.84507z" id="Path 1" fill-opacity="0" fill="#3c4245" stroke="#3c4245" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/><path d="M815.19177,358.18916c0.24679,1.04845 0.47412,2.09964 0.83272,3.11689c-0.06701,-0.2882 -0.7765,-2.8264 -0.83272,-3.11689z" id="Path 1" fill-opacity="0" fill="#3c4245" stroke="#3c4245" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/><text x="461.46155" y="168.3833" transform="scale(2.03412,2.03412)" id="PointText 1" fill="#3c4245" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" font-family="font-18th-Century-Muster" font-weight="normal" font-size="40" text-anchor="middle">where</text></g></svg>`;
    if (parseInt(cookies['dark'])) {
        document.body.classList.toggle('darkMode');
        button.innerHTML = `<i class="fa-solid fa-moon"></i>`;
        home.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100" height="18.0978601403" viewBox="498.55111,269.28352,539.49892,97.63776"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="none" stroke-linecap="none" stroke-linejoin="none" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><text x="318.0337" y="168.3833" transform="scale(2.03412,2.03412)" id="PointText 1" fill="#c3bdba" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" font-family="font-18th-Century-Muster" font-weight="normal" font-size="40" text-anchor="middle">Hawkerg</text><path d="M800.04569,317.10239c0,-9.73142 7.88888,-17.62031 17.62031,-17.62031c9.73142,0 17.62031,7.88888 17.62031,17.62031c0,9.73142 -7.88888,17.62031 -17.62031,17.62031c-9.73142,0 -17.62031,-7.88888 -17.62031,-17.62031zM817.666,328.78417c6.91538,0 12.52142,-5.23011 12.52142,-11.68178c0,-6.45166 -5.60603,-11.68178 -12.52142,-11.68178c-6.91538,0 -12.52142,5.23011 -12.52142,11.68178c0,6.45166 5.60603,11.68178 12.52142,11.68178z" id="CompoundPath 1" fill="#c3bdba" stroke="#c3bdba" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/><path d="M800.72807,321.34394l15.87762,44.13904" id="Path 1" fill-opacity="0" fill="#c3bdba" stroke="#c3bdba" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/><path d="M834.44471,321.34394l-17.83902,44.13904" id="Path 1" fill-opacity="0" fill="#c3bdba" stroke="#c3bdba" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/><path d="M827.47071,328.70316c-1.10213,3.3587 -3.02441,6.07956 -4.54663,9.23694c-2.53429,5.25661 -4.96833,11.52111 -5.90864,17.31444c-0.09429,0.57851 -0.19622,1.15517 -0.30791,1.73057c-0.04851,0.24993 -0.10846,1.00297 -0.14158,0.75054c-0.25367,-1.93343 0.04243,-3.94311 -0.10814,-5.89312c-0.45748,-5.92467 -1.58821,-12.25915 -4.65389,-17.43753c-0.79539,-1.34353 -1.67848,-2.62648 -2.63407,-3.86053c-0.1044,-0.13482 -0.78483,-1.17498 -0.90666,-1.16322c-0.7428,0.07175 -0.625,1.84647 -0.57797,2.25708c0.24619,2.14962 1.21628,4.26169 1.97022,6.27333c1.57244,4.10642 3.42801,8.09705 4.90708,12.24042c0.35439,0.99276 0.68943,1.99277 1.01756,2.99447c0.01459,0.04454 0.27731,1.04283 0.34449,1.05092c0.44334,0.05342 0.60131,-0.68164 0.77385,-1.09351c0.42731,-1.02004 0.56099,-2.17859 0.63898,-3.27221c0.32337,-4.53397 -0.17057,-9.07602 0.511,-13.58917c0.00474,-0.03138 0.30628,-1.72293 0.31851,-1.71953c0.75504,0.21032 0.37656,2.80037 0.28677,3.38204c-0.05435,0.35209 -0.52704,0.93474 -0.19051,1.05167c0.41575,0.14446 0.77386,-0.43762 1.09324,-0.74046c0.65174,-0.61798 1.15196,-1.38649 1.64402,-2.13011c0.16695,-0.2523 0.31386,-0.4912 0.47506,-0.75278c0.115,-0.18661 0.55754,-0.54376 0.33921,-0.56337c-0.17466,-0.01569 -0.31679,0.15053 -0.47519,0.22579c-1.57035,0.97701 -8.75042,3.64564 -5.18329,-1.08141" id="Path 1" fill-opacity="0" fill="#c3bdba" stroke="#c3bdba" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M828.68316,327.51146c-0.65641,1.50972 -1.31076,2.99481 -1.71271,4.59622c-0.12573,0.50091 -0.2333,0.99777 -0.37964,1.49451c-0.05257,0.17846 -0.11075,0.35552 -0.17145,0.53136c-0.0377,0.10923 -0.178,0.42417 -0.11597,0.32668c0.52056,-0.81817 0.83558,-1.84545 1.22713,-2.73014c0.12988,-0.29347 0.25786,-0.5876 0.39086,-0.87967c0.05551,-0.1219 0.13409,-0.49092 0.17289,-0.36272c0.14211,0.46947 -0.29706,1.24998 -0.48699,1.65668c-0.06852,0.14672 -0.13901,0.29252 -0.20856,0.43875c-0.04564,0.09597 -0.20866,0.36586 -0.13595,0.28836c0.69249,-0.73799 1.20732,-1.66218 1.62438,-2.58042c0.15488,-0.34099 0.28681,-0.69097 0.40974,-1.04448c0.04538,-0.13051 0.2604,-0.44776 0.13383,-0.39233c-0.3496,0.1531 -0.76035,0.97043 -0.95861,1.27849c-0.98144,1.525 -1.70313,3.15501 -2.33248,4.85002c-0.64463,1.81961 -1.20978,3.66692 -1.8334,5.49387c-0.29195,0.8553 -1.48436,3.28369 -1.00239,2.51917c1.26505,-2.00666 2.24912,-4.45708 3.07637,-6.68472c0.40229,-1.08328 1.37148,-4.41298 1.07006,-3.29742c-1.12049,4.14687 -3.83704,8.76511 -5.99424,12.53515" id="Path 1" fill-opacity="0" fill="#c3bdba" stroke="#c3bdba" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M821.9612,344.61552c-0.49092,1.28731 -0.76725,2.65245 -1.31728,3.91497c-0.18899,0.43381 -0.42112,0.82758 -0.6752,1.22487c-0.08311,0.12995 -0.15673,0.26375 -0.21953,0.40476c-0.04043,0.09077 -0.20174,0.28389 -0.10245,0.27995c0.31397,-0.01247 0.60194,-0.63402 0.73231,-0.87442c0.57606,-1.06224 1.2,-2.14981 1.66656,-3.26427c0.17497,-0.41794 0.32922,-0.84311 0.4833,-1.26908c0.055,-0.15205 0.1068,-0.3052 0.15865,-0.45834c0.0221,-0.06528 0.09986,-0.2561 0.06666,-0.19571c-1.28423,2.33572 -2.04173,5.09023 -2.82876,7.62799c-0.4698,1.4629 -1.08063,2.9956 -1.79329,4.36074" id="Path 1" fill-opacity="0" fill="#c3bdba" stroke="#c3bdba" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M815.12278,356.49845c-0.50541,-1.11206 -0.94927,-2.37746 -1.17552,-3.58376c-0.14208,-0.75753 -0.13564,-1.54491 -0.34372,-2.28998c-0.56801,-2.03391 -1.36589,-4.04803 -2.06551,-6.04149c-0.12708,-0.34779 -0.293,-0.67929 -0.46341,-1.0075" id="Path 1" fill-opacity="0" fill="#c3bdba" stroke="#c3bdba" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M806.48114,328.27767c1.28215,3.74427 -0.40213,3.34628 -0.88204,0.33687" id="Path 1" fill-opacity="0" fill="#c3bdba" stroke="#c3bdba" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M816.77182,357.93333c-0.12373,1.55773 -0.13485,3.09544 -0.32612,4.64918c-0.02141,0.17391 -0.22228,1.37766 -0.04302,1.41004c0.40633,0.0734 0.73269,-0.77829 0.83474,-0.98114c0.57318,-1.13936 0.61877,-2.6018 0.72505,-3.85047c0.03702,-0.43499 0.06902,-0.87027 0.10177,-1.30558c0.01298,-0.17246 0.02566,-0.34485 0.04124,-0.51709c0.00584,-0.06462 0.05012,-0.25089 0.01949,-0.19368c-0.34877,0.65134 -0.31411,1.54232 -0.38889,2.25816c-0.02476,0.23705 -0.33758,0.6903 -0.09989,0.70801c0.18689,0.01393 0.78769,-1.14318 0.92482,-1.37639c0.58199,-1.03023 -0.38957,3.34024 -1.56288,3.18719c-1.24319,-0.16217 0.6959,-4.86592 0.10594,-3.75967c-0.25237,0.47323 0.00254,3.45857 -0.40852,3.61652c-0.80105,0.30779 0.21462,-3.24521 0.07627,-3.84507z" id="Path 1" fill-opacity="0" fill="#c3bdba" stroke="#c3bdba" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/><path d="M815.19177,358.18916c0.24679,1.04845 0.47412,2.09964 0.83272,3.11689c-0.06701,-0.2882 -0.7765,-2.8264 -0.83272,-3.11689z" id="Path 1" fill-opacity="0" fill="#c3bdba" stroke="#c3bdba" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/><text x="461.46155" y="168.3833" transform="scale(2.03412,2.03412)" id="PointText 1" fill="#c3bdba" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" font-family="font-18th-Century-Muster" font-weight="normal" font-size="40" text-anchor="middle">where</text></g></svg>`;
    }
    button.addEventListener('click', () => {
        let cookies = getCookies();
        let newStatus = parseInt(cookies['dark'])? 0: 1;
        setCookie('dark', newStatus);
        button.innerHTML = newStatus? `<i class="fa-solid fa-moon"></i>` : `<i class="fa-solid fa-sun"></i>`;
        home.innerHTML = newStatus? `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100" height="18.0978601403" viewBox="498.55111,269.28352,539.49892,97.63776"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="none" stroke-linecap="none" stroke-linejoin="none" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><text x="318.0337" y="168.3833" transform="scale(2.03412,2.03412)" id="PointText 1" fill="#3c4245" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" font-family="font-18th-Century-Muster" font-weight="normal" font-size="40" text-anchor="middle">Hawkerg</text><path d="M800.04569,317.10239c0,-9.73142 7.88888,-17.62031 17.62031,-17.62031c9.73142,0 17.62031,7.88888 17.62031,17.62031c0,9.73142 -7.88888,17.62031 -17.62031,17.62031c-9.73142,0 -17.62031,-7.88888 -17.62031,-17.62031zM817.666,328.78417c6.91538,0 12.52142,-5.23011 12.52142,-11.68178c0,-6.45166 -5.60603,-11.68178 -12.52142,-11.68178c-6.91538,0 -12.52142,5.23011 -12.52142,11.68178c0,6.45166 5.60603,11.68178 12.52142,11.68178z" id="CompoundPath 1" fill="#3c4245" stroke="#3c4245" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/><path d="M800.72807,321.34394l15.87762,44.13904" id="Path 1" fill-opacity="0" fill="#3c4245" stroke="#3c4245" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/><path d="M834.44471,321.34394l-17.83902,44.13904" id="Path 1" fill-opacity="0" fill="#3c4245" stroke="#3c4245" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/><path d="M827.47071,328.70316c-1.10213,3.3587 -3.02441,6.07956 -4.54663,9.23694c-2.53429,5.25661 -4.96833,11.52111 -5.90864,17.31444c-0.09429,0.57851 -0.19622,1.15517 -0.30791,1.73057c-0.04851,0.24993 -0.10846,1.00297 -0.14158,0.75054c-0.25367,-1.93343 0.04243,-3.94311 -0.10814,-5.89312c-0.45748,-5.92467 -1.58821,-12.25915 -4.65389,-17.43753c-0.79539,-1.34353 -1.67848,-2.62648 -2.63407,-3.86053c-0.1044,-0.13482 -0.78483,-1.17498 -0.90666,-1.16322c-0.7428,0.07175 -0.625,1.84647 -0.57797,2.25708c0.24619,2.14962 1.21628,4.26169 1.97022,6.27333c1.57244,4.10642 3.42801,8.09705 4.90708,12.24042c0.35439,0.99276 0.68943,1.99277 1.01756,2.99447c0.01459,0.04454 0.27731,1.04283 0.34449,1.05092c0.44334,0.05342 0.60131,-0.68164 0.77385,-1.09351c0.42731,-1.02004 0.56099,-2.17859 0.63898,-3.27221c0.32337,-4.53397 -0.17057,-9.07602 0.511,-13.58917c0.00474,-0.03138 0.30628,-1.72293 0.31851,-1.71953c0.75504,0.21032 0.37656,2.80037 0.28677,3.38204c-0.05435,0.35209 -0.52704,0.93474 -0.19051,1.05167c0.41575,0.14446 0.77386,-0.43762 1.09324,-0.74046c0.65174,-0.61798 1.15196,-1.38649 1.64402,-2.13011c0.16695,-0.2523 0.31386,-0.4912 0.47506,-0.75278c0.115,-0.18661 0.55754,-0.54376 0.33921,-0.56337c-0.17466,-0.01569 -0.31679,0.15053 -0.47519,0.22579c-1.57035,0.97701 -8.75042,3.64564 -5.18329,-1.08141" id="Path 1" fill-opacity="0" fill="#3c4245" stroke="#3c4245" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M828.68316,327.51146c-0.65641,1.50972 -1.31076,2.99481 -1.71271,4.59622c-0.12573,0.50091 -0.2333,0.99777 -0.37964,1.49451c-0.05257,0.17846 -0.11075,0.35552 -0.17145,0.53136c-0.0377,0.10923 -0.178,0.42417 -0.11597,0.32668c0.52056,-0.81817 0.83558,-1.84545 1.22713,-2.73014c0.12988,-0.29347 0.25786,-0.5876 0.39086,-0.87967c0.05551,-0.1219 0.13409,-0.49092 0.17289,-0.36272c0.14211,0.46947 -0.29706,1.24998 -0.48699,1.65668c-0.06852,0.14672 -0.13901,0.29252 -0.20856,0.43875c-0.04564,0.09597 -0.20866,0.36586 -0.13595,0.28836c0.69249,-0.73799 1.20732,-1.66218 1.62438,-2.58042c0.15488,-0.34099 0.28681,-0.69097 0.40974,-1.04448c0.04538,-0.13051 0.2604,-0.44776 0.13383,-0.39233c-0.3496,0.1531 -0.76035,0.97043 -0.95861,1.27849c-0.98144,1.525 -1.70313,3.15501 -2.33248,4.85002c-0.64463,1.81961 -1.20978,3.66692 -1.8334,5.49387c-0.29195,0.8553 -1.48436,3.28369 -1.00239,2.51917c1.26505,-2.00666 2.24912,-4.45708 3.07637,-6.68472c0.40229,-1.08328 1.37148,-4.41298 1.07006,-3.29742c-1.12049,4.14687 -3.83704,8.76511 -5.99424,12.53515" id="Path 1" fill-opacity="0" fill="#3c4245" stroke="#3c4245" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M821.9612,344.61552c-0.49092,1.28731 -0.76725,2.65245 -1.31728,3.91497c-0.18899,0.43381 -0.42112,0.82758 -0.6752,1.22487c-0.08311,0.12995 -0.15673,0.26375 -0.21953,0.40476c-0.04043,0.09077 -0.20174,0.28389 -0.10245,0.27995c0.31397,-0.01247 0.60194,-0.63402 0.73231,-0.87442c0.57606,-1.06224 1.2,-2.14981 1.66656,-3.26427c0.17497,-0.41794 0.32922,-0.84311 0.4833,-1.26908c0.055,-0.15205 0.1068,-0.3052 0.15865,-0.45834c0.0221,-0.06528 0.09986,-0.2561 0.06666,-0.19571c-1.28423,2.33572 -2.04173,5.09023 -2.82876,7.62799c-0.4698,1.4629 -1.08063,2.9956 -1.79329,4.36074" id="Path 1" fill-opacity="0" fill="#3c4245" stroke="#3c4245" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M815.12278,356.49845c-0.50541,-1.11206 -0.94927,-2.37746 -1.17552,-3.58376c-0.14208,-0.75753 -0.13564,-1.54491 -0.34372,-2.28998c-0.56801,-2.03391 -1.36589,-4.04803 -2.06551,-6.04149c-0.12708,-0.34779 -0.293,-0.67929 -0.46341,-1.0075" id="Path 1" fill-opacity="0" fill="#3c4245" stroke="#3c4245" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M806.48114,328.27767c1.28215,3.74427 -0.40213,3.34628 -0.88204,0.33687" id="Path 1" fill-opacity="0" fill="#3c4245" stroke="#3c4245" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M816.77182,357.93333c-0.12373,1.55773 -0.13485,3.09544 -0.32612,4.64918c-0.02141,0.17391 -0.22228,1.37766 -0.04302,1.41004c0.40633,0.0734 0.73269,-0.77829 0.83474,-0.98114c0.57318,-1.13936 0.61877,-2.6018 0.72505,-3.85047c0.03702,-0.43499 0.06902,-0.87027 0.10177,-1.30558c0.01298,-0.17246 0.02566,-0.34485 0.04124,-0.51709c0.00584,-0.06462 0.05012,-0.25089 0.01949,-0.19368c-0.34877,0.65134 -0.31411,1.54232 -0.38889,2.25816c-0.02476,0.23705 -0.33758,0.6903 -0.09989,0.70801c0.18689,0.01393 0.78769,-1.14318 0.92482,-1.37639c0.58199,-1.03023 -0.38957,3.34024 -1.56288,3.18719c-1.24319,-0.16217 0.6959,-4.86592 0.10594,-3.75967c-0.25237,0.47323 0.00254,3.45857 -0.40852,3.61652c-0.80105,0.30779 0.21462,-3.24521 0.07627,-3.84507z" id="Path 1" fill-opacity="0" fill="#3c4245" stroke="#3c4245" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/><path d="M815.19177,358.18916c0.24679,1.04845 0.47412,2.09964 0.83272,3.11689c-0.06701,-0.2882 -0.7765,-2.8264 -0.83272,-3.11689z" id="Path 1" fill-opacity="0" fill="#3c4245" stroke="#3c4245" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/><text x="461.46155" y="168.3833" transform="scale(2.03412,2.03412)" id="PointText 1" fill="#3c4245" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" font-family="font-18th-Century-Muster" font-weight="normal" font-size="40" text-anchor="middle">where</text></g></svg>` : `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100" height="18.0978601403" viewBox="498.55111,269.28352,539.49892,97.63776"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="none" stroke-linecap="none" stroke-linejoin="none" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><text x="318.0337" y="168.3833" transform="scale(2.03412,2.03412)" id="PointText 1" fill="#c3bdba" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" font-family="font-18th-Century-Muster" font-weight="normal" font-size="40" text-anchor="middle">Hawkerg</text><path d="M800.04569,317.10239c0,-9.73142 7.88888,-17.62031 17.62031,-17.62031c9.73142,0 17.62031,7.88888 17.62031,17.62031c0,9.73142 -7.88888,17.62031 -17.62031,17.62031c-9.73142,0 -17.62031,-7.88888 -17.62031,-17.62031zM817.666,328.78417c6.91538,0 12.52142,-5.23011 12.52142,-11.68178c0,-6.45166 -5.60603,-11.68178 -12.52142,-11.68178c-6.91538,0 -12.52142,5.23011 -12.52142,11.68178c0,6.45166 5.60603,11.68178 12.52142,11.68178z" id="CompoundPath 1" fill="#c3bdba" stroke="#c3bdba" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/><path d="M800.72807,321.34394l15.87762,44.13904" id="Path 1" fill-opacity="0" fill="#c3bdba" stroke="#c3bdba" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/><path d="M834.44471,321.34394l-17.83902,44.13904" id="Path 1" fill-opacity="0" fill="#c3bdba" stroke="#c3bdba" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/><path d="M827.47071,328.70316c-1.10213,3.3587 -3.02441,6.07956 -4.54663,9.23694c-2.53429,5.25661 -4.96833,11.52111 -5.90864,17.31444c-0.09429,0.57851 -0.19622,1.15517 -0.30791,1.73057c-0.04851,0.24993 -0.10846,1.00297 -0.14158,0.75054c-0.25367,-1.93343 0.04243,-3.94311 -0.10814,-5.89312c-0.45748,-5.92467 -1.58821,-12.25915 -4.65389,-17.43753c-0.79539,-1.34353 -1.67848,-2.62648 -2.63407,-3.86053c-0.1044,-0.13482 -0.78483,-1.17498 -0.90666,-1.16322c-0.7428,0.07175 -0.625,1.84647 -0.57797,2.25708c0.24619,2.14962 1.21628,4.26169 1.97022,6.27333c1.57244,4.10642 3.42801,8.09705 4.90708,12.24042c0.35439,0.99276 0.68943,1.99277 1.01756,2.99447c0.01459,0.04454 0.27731,1.04283 0.34449,1.05092c0.44334,0.05342 0.60131,-0.68164 0.77385,-1.09351c0.42731,-1.02004 0.56099,-2.17859 0.63898,-3.27221c0.32337,-4.53397 -0.17057,-9.07602 0.511,-13.58917c0.00474,-0.03138 0.30628,-1.72293 0.31851,-1.71953c0.75504,0.21032 0.37656,2.80037 0.28677,3.38204c-0.05435,0.35209 -0.52704,0.93474 -0.19051,1.05167c0.41575,0.14446 0.77386,-0.43762 1.09324,-0.74046c0.65174,-0.61798 1.15196,-1.38649 1.64402,-2.13011c0.16695,-0.2523 0.31386,-0.4912 0.47506,-0.75278c0.115,-0.18661 0.55754,-0.54376 0.33921,-0.56337c-0.17466,-0.01569 -0.31679,0.15053 -0.47519,0.22579c-1.57035,0.97701 -8.75042,3.64564 -5.18329,-1.08141" id="Path 1" fill-opacity="0" fill="#c3bdba" stroke="#c3bdba" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M828.68316,327.51146c-0.65641,1.50972 -1.31076,2.99481 -1.71271,4.59622c-0.12573,0.50091 -0.2333,0.99777 -0.37964,1.49451c-0.05257,0.17846 -0.11075,0.35552 -0.17145,0.53136c-0.0377,0.10923 -0.178,0.42417 -0.11597,0.32668c0.52056,-0.81817 0.83558,-1.84545 1.22713,-2.73014c0.12988,-0.29347 0.25786,-0.5876 0.39086,-0.87967c0.05551,-0.1219 0.13409,-0.49092 0.17289,-0.36272c0.14211,0.46947 -0.29706,1.24998 -0.48699,1.65668c-0.06852,0.14672 -0.13901,0.29252 -0.20856,0.43875c-0.04564,0.09597 -0.20866,0.36586 -0.13595,0.28836c0.69249,-0.73799 1.20732,-1.66218 1.62438,-2.58042c0.15488,-0.34099 0.28681,-0.69097 0.40974,-1.04448c0.04538,-0.13051 0.2604,-0.44776 0.13383,-0.39233c-0.3496,0.1531 -0.76035,0.97043 -0.95861,1.27849c-0.98144,1.525 -1.70313,3.15501 -2.33248,4.85002c-0.64463,1.81961 -1.20978,3.66692 -1.8334,5.49387c-0.29195,0.8553 -1.48436,3.28369 -1.00239,2.51917c1.26505,-2.00666 2.24912,-4.45708 3.07637,-6.68472c0.40229,-1.08328 1.37148,-4.41298 1.07006,-3.29742c-1.12049,4.14687 -3.83704,8.76511 -5.99424,12.53515" id="Path 1" fill-opacity="0" fill="#c3bdba" stroke="#c3bdba" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M821.9612,344.61552c-0.49092,1.28731 -0.76725,2.65245 -1.31728,3.91497c-0.18899,0.43381 -0.42112,0.82758 -0.6752,1.22487c-0.08311,0.12995 -0.15673,0.26375 -0.21953,0.40476c-0.04043,0.09077 -0.20174,0.28389 -0.10245,0.27995c0.31397,-0.01247 0.60194,-0.63402 0.73231,-0.87442c0.57606,-1.06224 1.2,-2.14981 1.66656,-3.26427c0.17497,-0.41794 0.32922,-0.84311 0.4833,-1.26908c0.055,-0.15205 0.1068,-0.3052 0.15865,-0.45834c0.0221,-0.06528 0.09986,-0.2561 0.06666,-0.19571c-1.28423,2.33572 -2.04173,5.09023 -2.82876,7.62799c-0.4698,1.4629 -1.08063,2.9956 -1.79329,4.36074" id="Path 1" fill-opacity="0" fill="#c3bdba" stroke="#c3bdba" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M815.12278,356.49845c-0.50541,-1.11206 -0.94927,-2.37746 -1.17552,-3.58376c-0.14208,-0.75753 -0.13564,-1.54491 -0.34372,-2.28998c-0.56801,-2.03391 -1.36589,-4.04803 -2.06551,-6.04149c-0.12708,-0.34779 -0.293,-0.67929 -0.46341,-1.0075" id="Path 1" fill-opacity="0" fill="#c3bdba" stroke="#c3bdba" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M806.48114,328.27767c1.28215,3.74427 -0.40213,3.34628 -0.88204,0.33687" id="Path 1" fill-opacity="0" fill="#c3bdba" stroke="#c3bdba" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M816.77182,357.93333c-0.12373,1.55773 -0.13485,3.09544 -0.32612,4.64918c-0.02141,0.17391 -0.22228,1.37766 -0.04302,1.41004c0.40633,0.0734 0.73269,-0.77829 0.83474,-0.98114c0.57318,-1.13936 0.61877,-2.6018 0.72505,-3.85047c0.03702,-0.43499 0.06902,-0.87027 0.10177,-1.30558c0.01298,-0.17246 0.02566,-0.34485 0.04124,-0.51709c0.00584,-0.06462 0.05012,-0.25089 0.01949,-0.19368c-0.34877,0.65134 -0.31411,1.54232 -0.38889,2.25816c-0.02476,0.23705 -0.33758,0.6903 -0.09989,0.70801c0.18689,0.01393 0.78769,-1.14318 0.92482,-1.37639c0.58199,-1.03023 -0.38957,3.34024 -1.56288,3.18719c-1.24319,-0.16217 0.6959,-4.86592 0.10594,-3.75967c-0.25237,0.47323 0.00254,3.45857 -0.40852,3.61652c-0.80105,0.30779 0.21462,-3.24521 0.07627,-3.84507z" id="Path 1" fill-opacity="0" fill="#c3bdba" stroke="#c3bdba" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/><path d="M815.19177,358.18916c0.24679,1.04845 0.47412,2.09964 0.83272,3.11689c-0.06701,-0.2882 -0.7765,-2.8264 -0.83272,-3.11689z" id="Path 1" fill-opacity="0" fill="#c3bdba" stroke="#c3bdba" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/><text x="461.46155" y="168.3833" transform="scale(2.03412,2.03412)" id="PointText 1" fill="#c3bdba" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" font-family="font-18th-Century-Muster" font-weight="normal" font-size="40" text-anchor="middle">where</text></g></svg>`;
        document.body.classList.toggle('darkMode');
    });
};

// Calling different function for method of searching
const processSearch = () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('keyword')) {
        const keyword = urlParams.get('keyword');
        console.log(keyword);
        processKeywordSearch(keyword);
    } else if (urlParams.has('lat') && urlParams.has('long')) {
        const lat = urlParams.get('lat');
        const long = urlParams.get('long');
        console.log(lat, long);
        processLocationSearch(lat, long);
    } else {
        window.location.assign('/hawkergowhere/home.html');
    }
};

// Process search via keywords using keyword match
const processKeywordSearch = (keyword) => {
    const results = document.getElementById('results');
    let resultList = [];
    for (let hawker of hawkersData) {
        if (keywordMatch(keyword, hawker['NAME'])) {
            resultList.push(hawker);
        } else if (keywordMatch(keyword, hawker['ADDRESS'])) {
            resultList.push(hawker);
        }
    }
    let resultHtml = '';
    if (resultList.length === 0) {
        resultHtml = ':( No hawkers found.';
    } else {
        for (let hawker of resultList) {
            let html = hawkerHtmlFormat(hawker);
            resultHtml += html;
        }
        resultHtml += `<p>You've reached the end of the search results.</p>`;
    }
    results.innerHTML = resultHtml;
    let searchBar = document.getElementById('search-bar');
    searchBar.value = keyword;
};

// Process search via location for hawkers in vicinity
const processLocationSearch = (lat, long) => {
    const results = document.getElementById('results');
    let resultList = [];
    for (let hawker of hawkersData) {
        let distance = calculateDistance(lat, long, hawker['LATITUDE'], hawker['LONGITUDE']);
        hawker['distance'] = distance;
        if (distance < 5) {
            resultList.push(hawker);
        }
    }
    let resultHtml = '';
    if (resultList.length === 0) {
        resultHtml = ':( No hawkers found.';
    } else {
        for (let hawker of resultList) {
            let html = hawkerHtmlFormat(hawker);
            resultHtml += html;
        }
        resultHtml += `<p>You've reached the end of the search results.</p>`;
    }
    results.innerHTML = resultHtml;
};

// Check if the query is in text.
const keywordMatch = (query, text) => {
    return text.toLowerCase().includes(query.toLowerCase());
};

// Calculate distance in km between 2 points marked with lat long
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    let R = 6371;
    let dLat = deg2rad(lat2 - lat1);
    let dLon = deg2rad(lon2 - lon1);
    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d;
};
const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
};

// Process hawker format of a div for HTML
const hawkerHtmlFormat = (hawker) => {
    let url = `https://www.google.com/maps/place/Singapore+${hawker['POSTAL']}/`;
    let saveIcon = ''
    let saved = false;
    let cookies = document.cookie.split(';');
    let id = hawker['ID']
    let distance = '';
    if (hawker['distance']) {
        distance = `${hawker['distance'].toFixed(2)}km away<br>`;
    }
    saved = parseInt(getCookies()[id]);
    if (saved) {
        saveIcon = '<i class="fa-solid fa-bookmark"></i>'
    } else {
        saveIcon = '<i class="fa-regular fa-bookmark"></i>'
    }
    let html = `<div id="hawker">
    <div id="details">
        <h1>${hawker['NAME']}</h1>${hawker['ADDRESS']}<br>${distance}<a href='${url}' target='_blank'>Google Maps</a><div class="saveButton"><button type="button" class="save" hawkerId=${hawker['ID']}>${saveIcon}</button></div></div><div id="map">${hawker['DIV']}</div></div>`;
    return html;
};

// Save a hawker into user's cookies
const saveItem = () => {
    let buttons = document.querySelectorAll('.save');
    buttons.forEach(function(button) {
        button.addEventListener('click', () => {
            let id = button.getAttribute('hawkerId');
            let saved = 0;
            saved = parseInt(getCookies()[id]);
            saved = saved ? 0 : 1;
            button.innerHTML = saved ? '<i class="fa-solid fa-bookmark"></i>' : '<i class="fa-regular fa-bookmark"></i>';
            setCookie(id, saved);
            if (window.location.pathname.startsWith('/saved.html')) {
                location.reload()
            }
        });
    });
};

// Load saved hawkers from cookies
const loadSave = () => {
    const results = document.getElementById('results');
    let cookies = getCookies();
    let resultList = [];
    for (let hawker of hawkersData) {
        if (parseInt(cookies[hawker['ID']])) {
            resultList.push(hawker);
        }
    }
    let resultHtml = '';
    if (resultList.length === 0) {
        resultHtml = 'You have not saved any hawkers yet.';
    } else {
        resultHtml += `<h1>Saved hawkers</h1>`
        for (let hawker of resultList) {
            let html = hawkerHtmlFormat(hawker);
            resultHtml += html;
        }
        resultHtml += `That's all the hawkers you've saved!`;
    }
    results.innerHTML = resultHtml;
};

// Output JSON of cookies
const getCookies = () => {
    let cookieString = document.cookie;
    let cookieArray = cookieString.split(';');
    let cookies = {};

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        let parts = cookie.split('=');
        let name = parts[0];
        let value = parts[1];
        cookies[name] = value;
    }
    return cookies;
};

// Input cookies
const setCookie = (name, value) => {
    let cookieString = `${name}=${value};path=/`;
    document.cookie = cookieString;
}
