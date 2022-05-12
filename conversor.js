document.addEventListener('DOMContentLoaded', () => {
    converteDeMunicipioLinhaAntiga();
    converteDeOperadorLinhaAntiga();
    listaNovasLinhasDeMunicipio();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function converteDeMunicipioLinhaAntiga() {
    //-------------------------------------------------------------------------------
    // Cria o seletor de municípios
    //-------------------------------------------------------------------------------

    let text = '<b>Pesquisa por Município</b><br><select id="seletorMunicipios"><option value="escolha">escolha</option>' // escolha

    for (let municipio in diretorio) {
        text += `<option value="${municipio}">${municipio}</option>`;
    }
    text += '</select>';
    document.getElementById("divSeletorMunicipios").innerHTML = text;



    document.querySelector("#seletorMunicipios").onchange = function () {

        // fazer desaparecer o resto 
        document.querySelector("input").value = '';
        document.getElementById("seletorOperadores").selectedIndex = 0;
        document.querySelector("#linhasConvertidasOperador").innerHTML = '';
        document.getElementById("listaNovasLinhas").innerHTML = '';
        document.getElementById("seletorNovasLinhasMunicipio").selectedIndex = 0;
        document.getElementById('carreiras').innerHTML = '';
        document.querySelector("#divOperadoresLinhas").innerHTML = '';

        //-------------------------------------------------------------------------------
        // Cria o seletor de linhas do municipio 
        //-------------------------------------------------------------------------------
        document.getElementById("linhasConvertidasMunicipio").innerHTML = '';

        let municipio = document.querySelector("#seletorMunicipios").value;

        let text = '<b>Linha atual</b><br><select id="seletorLinhasMunicipio"><option value="">escolha</option>'; // escolha

        for (const carreira in diretorio[municipio]) {
            if (carreira != 'Nova') {
                text += `<option value="${carreira}">${carreira}</option>`;
            }
        }
        text += '</select>';
        document.getElementById("divMunicipiosLinhas").innerHTML = text;

    }

    //-------------------------------------------------------------------------------
    // Lista novos numeros duma linha antiga  
    //-------------------------------------------------------------------------------

    document.querySelector("#divMunicipiosLinhas").onchange = function () {

        let linha = document.querySelector("#seletorLinhasMunicipio").value;
        let municipio = document.querySelector("#seletorMunicipios").value;
        let text;

        if (diretorio[municipio][linha].length == 1)
            text = '<b>Linha correspondente</b><br>';
        else
            text = '<b>Linhas correspondentes</b><br>';

        for (let i in diretorio[municipio][linha]) {
            text +=
                `<span class='conv'><bl>${diretorio[municipio][linha][i][0]}</bl> <bt>${diretorio[municipio][linha][i][1]}</bt></span><br>`;
        }
        document.getElementById("linhasConvertidasMunicipio").innerHTML = text;
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function converteDeOperadorLinhaAntiga() {
    //-------------------------------------------------------------------------------
    // Cria o seletor de municípios
    //-------------------------------------------------------------------------------

    let text = '<b>Pesquisa por Operador</b><br><select id="seletorOperadores" onfocus="this.size=5;" onblur="this.size=1;" onchange="this.size=1; this.blur();"><option value="">escolha</option>'

    for (let operador in diretorio_operadores) {
        if (operador != 'Nova')
            text += `<option value="${operador}">${operador}</option>`;
    }
    text += '</select>';
    document.getElementById("divSeletorOperadores").innerHTML = text;



    document.querySelector("#seletorOperadores").onchange = function () {

        // fazer desaparecer o resto 
        document.querySelector("input").value = '';
        document.getElementById("seletorMunicipios").selectedIndex = 0;
        document.querySelector("#linhasConvertidasMunicipio").innerHTML = '';
        document.getElementById("listaNovasLinhas").innerHTML = '';
        document.querySelector("#divMunicipiosLinhas").innerHTML = '';
        document.getElementById("seletorNovasLinhasMunicipio").selectedIndex = 0;
        document.getElementById('carreiras').innerHTML = '';

        //-------------------------------------------------------------------------------
        // Cria o seletor de linhas do operador 
        //-------------------------------------------------------------------------------
        document.getElementById("linhasConvertidasOperador").innerHTML = '';
        document.getElementById("divOperadoresLinhas").innerHTML = '';

        let operador = document.querySelector("#seletorOperadores").value;

        let text = '<b>Linha atual</b><br><select id="seletorLinhasOperador"><option value="">escolha</option>';

        for (const carreira in diretorio_operadores[operador]) {
            if (carreira != 'Nova') {
                text += `<option value="${carreira}">${carreira}</option>`;
            }
        }
        text += '</select>';
        document.getElementById("divOperadoresLinhas").innerHTML = text;

    }

    //-------------------------------------------------------------------------------
    // Lista novos numeros duma linha antiga  
    //-------------------------------------------------------------------------------

    document.querySelector("#divOperadoresLinhas").onchange = function () {

        let linha = document.querySelector("#seletorLinhasOperador").value;
        let operador = document.querySelector("#seletorOperadores").value;
        let text;

        if (diretorio_operadores[operador][linha].length == 1)
            text = '<b>Linha correspondente</b><br>';
        else
            text = '<b>Linhas correspondentes</b><br>';

        for (let i in diretorio_operadores[operador][linha]) {
            text +=
                `<span class='conv'><bl>${diretorio_operadores[operador][linha][i][0]}</bl> <bt>${diretorio_operadores[operador][linha][i][1]}</bt></span><br>`
        }
        document.getElementById("linhasConvertidasOperador").innerHTML = text;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Cria lista de Novas Linhas De um Municipio 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function listaNovasLinhasDeMunicipio() {


    // Cria seletor de municipios ------------------------------------------------------------------------------

    let text = '<b>Lista das novas linhas por Município</b><br>';
    text += '<select id="seletorNovasLinhasMunicipio"><option value="">escolha</option>';

    linhas = [];
    for (let municipio in diretorio) {
        for (let velhaLinha in diretorio[municipio]) {
            if (diretorio[municipio][velhaLinha] != 'Nova');

        }
        text += `<option value="${municipio}">${municipio}</option>`;
    }
    text += '</select><div id="listaNovasLinhas"></div>';

    document.querySelector("#novasLinhasMunicipio").innerHTML = text;

    // Cria lista de novas linhas ------------------------------------------------------------------------------

    document.querySelector("#seletorNovasLinhasMunicipio").onchange = function () {

        // fecha tudo
        document.getElementById("seletorOperadores").selectedIndex = 0;
        document.querySelector("#linhasConvertidasOperador").innerHTML = '';
        document.getElementById("listaNovasLinhas").innerHTML = '';
        document.querySelector("#divOperadoresLinhas").innerHTML = '';
        document.getElementById("seletorMunicipios").selectedIndex = 0;
        document.querySelector("#linhasConvertidasMunicipio").innerHTML = '';
        document.getElementById("listaNovasLinhas").innerHTML = '';
        document.querySelector("#divMunicipiosLinhas").innerHTML = '';


        let municipio = document.querySelector("#seletorNovasLinhasMunicipio").value;

        let text = '<br>';

        for (let i in diretorio[municipio]['Nova']) {
            text +=
                `<span class='conv'><bl>${diretorio[municipio]['Nova'][i][0]}</bl> <bt>${diretorio[municipio]['Nova'][i][1]}</bt></span><br>`
        }
        if (diretorio[municipio]['Nova'].length > 0)
            document.getElementById("listaNovasLinhas").innerHTML = text;
    }
}

////////////////////////////////////////////////////////////////////////////////////////------------------------

function pesquisaMunicipio() {
    var m = document.getElementById('meuMunicipio').value;

    meuMunicipio = m.charAt(0).toUpperCase() + m.slice(1).toLowerCase();

    if (meuMunicipio in diretorio) {
        document.getElementById('municipio').innerHTML = meuMunicipio + ' é um municipio do diretorio';
    } else {
        document.getElementById('municipio').innerHTML = ' ';
    }
}

////////////////////////////////////////////////////////////////////////////////////////

function pesquisaNovaCarreira() {

    // fecha tudo
    document.getElementById("seletorOperadores").selectedIndex = 0;
    document.querySelector("#linhasConvertidasOperador").innerHTML = '';
    document.getElementById("listaNovasLinhas").innerHTML = '';
    document.querySelector("#divOperadoresLinhas").innerHTML = '';
    document.getElementById("seletorMunicipios").selectedIndex = 0;
    document.querySelector("#linhasConvertidasMunicipio").innerHTML = '';
    document.getElementById("listaNovasLinhas").innerHTML = '';
    document.querySelector("#divMunicipiosLinhas").innerHTML = '';


    var carreira_a_pesquisar = document.getElementById('minhaCarreira').value;

    var subDiretorio = {}

    for (let municipio in diretorio) {
        if (carreira_a_pesquisar in diretorio[municipio]) {
            for (let carreira in diretorio[municipio][carreira_a_pesquisar]) {
                c = diretorio[municipio][carreira_a_pesquisar][carreira][0];
                d = diretorio[municipio][carreira_a_pesquisar][carreira][1];
                subDiretorio[c] = d;
            }
        }
    }

    var tamanho = Object.keys(subDiretorio).length;

    if (tamanho == 0) {
        text = "";
    } else {
        var text;

        if (tamanho == 1) {
            text = "<b>Linha correspondente</b><br>";
        } else {
            text = "<b>Linhas correspondentes</b><br>";
        }

        for (let carreira in subDiretorio) {
            text += `<span class='conv'><bl>${carreira}</bl> <bt>${subDiretorio[carreira]}</bt></span><br>`
        }
        text += "</div>";
    }

    document.getElementById('carreiras').innerHTML = text;
}