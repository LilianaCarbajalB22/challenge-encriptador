document.addEventListener('DOMContentLoaded', function () {
    const encriptacionMap = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    const desencriptacionMap = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };

    const mediaQueryIPad = window.matchMedia('(max-width: 810px)');
    const mediaQueryIPhone = window.matchMedia('(max-width: 375px)');

    // Expresión regular para validar solo letras minúsculas sin acentos
    const regexSoloMinisculasYSinAcento = /^[a-z\s]+$/;    

    const btnEncriptar = document.getElementById('btn-encriptar');
    const btnCopiar = document.getElementById('btn-copiar');
    const btnDesencriptar = document.getElementById('btn-desencriptar');

    const txtareaValor = document.getElementById('txtarea-valor');
    const txtareaResult = document.getElementById('txtarea-result');

    const lblInfo = document.getElementById('lbl-info');
    const seccionResultado =  document.getElementById('seccion-resultado');

    const imgBusq = document.getElementById('img-busq');
    const txtMsg1 = document.getElementById('txt-msg-1');
    const txtMsg2 = document.getElementById('txt-msg-2');

    btnEncriptar.addEventListener('click', handleClickEncriptacion);
    btnDesencriptar.addEventListener('click', handleClickDesencriptacion);
    btnCopiar.addEventListener('click', handleClickCopiar);
    mediaQueryIPad.addEventListener('change', redimensionarElementos);
    mediaQueryIPhone.addEventListener('change', redimensionarElementos);

    txtareaValor.value = '';
    txtareaResult.value = '';


    function handleClickEncriptacion() {
        imgBusq.style.visibility = 'collapse';
        txtMsg1.style.visibility = 'collapse';
        txtMsg2.style.visibility = 'collapse';
        txtareaResult.style.visibility = 'visible';
        btnCopiar.style.visibility = 'visible';

        txtareaResult.value = encriptar(txtareaValor.value);

        txtareaValor.value = '';
    }

    function handleClickDesencriptacion() {
        txtareaResult.value = desencriptar(txtareaValor.value);

        txtareaValor.value = '';
    }

    function handleClickCopiar() {
        txtareaResult.select();
        document.execCommand('copy');
    }


    function encriptar(valor) {
        redimensionarElementos();

        lblInfo.style.color = '#495057';
        if(!esSoloMinisculasYSinAcento(valor)){
            lblInfo.style.color = 'red';
            return '';
        }

        return valor.split('').map(caracter => {
            // Reemplazar el carácter si está en el mapa de encriptación, sino devolver el carácter original
            return encriptacionMap[caracter] || caracter;
        }).join('');
    }

    function desencriptar(valor) {
        // Ordenar las claves del mapa de desencriptación por longitud descendente
        const sortedKeys = Object.keys(desencriptacionMap).sort((a, b) => b.length - a.length);

        // Reemplazar las secuencias en el texto, asegurándose de reemplazar primero las secuencias más largas
        sortedKeys.forEach(key => {
            const regex = new RegExp(key, 'g'); // Crear una expresión regular global para la clave actual
            valor = valor.replace(regex, desencriptacionMap[key]);
        });

        return valor;
    }

    function esSoloMinisculasYSinAcento(valor){
        return regexSoloMinisculasYSinAcento.test(valor);
    }

    function redimensionarElementos() {
        if (mediaQueryIPad.matches) {
            seccionResultado.style.height = '300px';
        }
        else {
            seccionResultado.style.height = '763px';
        }           
    }    
});
