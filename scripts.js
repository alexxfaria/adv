const form = document.querySelector('.forme');
function calcular() {
    const resultado = document.querySelector('#resultado');
    const resultadoCliente = document.querySelector('#resultadoCliente');

    const dados = []

    function recebeEventoForm(evento) {
        evento.preventDefault();
        const processo = form.querySelector('.nprocesso').value || '0000.0000';
        const cliente = form.querySelector('.cliente').value || 'Cliente';
        const via = form.querySelector('.via').value;
        const dataDer = form.querySelector('.der').value || new Date().toLocaleDateString();
        const dataDib = form.querySelector('.dib').value || new Date().toLocaleDateString()
        const dataDip = form.querySelector('.dip').value || new Date().toLocaleDateString();
        const valorCausa = parseFloat(form.querySelector('.vcausa').value) || 0;
        const valorAcao = parseFloat(form.querySelector('.vsentenca').value) || 0;
        const acao = parseFloat(form.querySelector('.acao').value) || 0;
        const meses = form.querySelector('.meses').value || 0;
        const valorMeses = parseFloat(form.querySelector('.vmeses').value) || 0;
        const desconto = parseFloat(form.querySelector('.desc').value) || 0;
        const escritorio = parseFloat(form.querySelector('.escritorio').value) || 0;
        const nomeParceiro = form.querySelector('.nomeparceiro').value || 'Sem parceiro';
        const parceiro = parseFloat(form.querySelector('.parceiro').value) || 0;
        const nomeParceiro2 = form.querySelector('.nomeparceiro2').value || 'Sem parceiro';
        const parceiro2 = parseFloat(form.querySelector('.parceiro2').value) || 0;

        dados.push([
            processo,
            cliente,
            dataDer,
            dataDib,
            dataDip,
            via,
            valorCausa,
            valorAcao,
            acao,
            meses,
            valorMeses,
            escritorio,
            nomeParceiro,
            parceiro,
            nomeParceiro2,
            parceiro2,
        ])
        function divisao(valor, percertual) {
            const resultado = (valor * percertual) / 100;
            return resultado
        }
        const bruto = (valorAcao * acao) / 100;
        const bruto2 = bruto + (meses * valorMeses);
        const liquido = bruto2 - desconto;
        const liquidoCliente = (valorAcao - liquido).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        const saldoliq = liquido.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

        const saldoesc = divisao(liquido, escritorio);
        const esc = saldoesc.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        const saldopar = divisao(liquido, parceiro);
        const par = saldopar.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        const saldopar2 = divisao(liquido, parceiro2);
        const par2 = saldopar2.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        const saldolivre = liquido - (saldoesc + saldopar + saldopar2);
        const livre = saldolivre.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        const vcausa = valorCausa.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        const rmi = valorMeses.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });


        const vacao = valorAcao.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        const vdesc = (desconto).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

        const pesc = escritorio
        const ppar = parceiro
        const ppar2 = parceiro2
        const plivre = (100 - (escritorio + parceiro + parceiro2));

        // Inicio da conversão de datas

        function adicionaZero(numero) {
            if (numero <= 9)
                return "0" + numero;
            else
                return numero;
        }
        function converteDatas(data) {
            const datarec = new Date(data)
            const datas = ((adicionaZero(datarec.getDate() + 1).toString()) + "/" +
                (adicionaZero(datarec.getMonth() + 1).toString()) + "/" +
                datarec.getFullYear());
            return datas;
        }
        const der = converteDatas(dataDer)
        const dib = converteDatas(dataDib)
        const dip = converteDatas(dataDip)
        
        // Fim da conversão de datas

        // Impressão na tela
        resultado.innerHTML += `<p>N° do processo: <b>${processo}</b></p>`
        resultado.innerHTML += `<p>Via: ${via}</p>`
        resultado.innerHTML += `<p>Valor da causa: ${vcausa}</p>`
        resultado.innerHTML += `<p>Sentença: <b>${vacao}</p>`
        resultado.innerHTML += `<p>Desconto concedido: ${vdesc}</p>`
        resultado.innerHTML += `<p>${meses} meses de ${rmi}</p>`
        resultado.innerHTML += `<p>Receber de <b>${cliente}</b> a quantia de: <b>${saldoliq}</b></p>`
        resultado.innerHTML += `<p>Escritorio ${escritorio}%: ${esc}</p>`
        resultado.innerHTML += `<p>${nomeParceiro} ${parceiro}%: ${par}</p>`
        resultado.innerHTML += `<p>${nomeParceiro2} ${parceiro2}%: ${par2}</p>`
        resultado.innerHTML += `<p>Hariana ${plivre}%: ${livre}</p>`
        resultado.innerHTML += `<p>-------------------------------------------------</p>`

        resultadoCliente.innerHTML += `<p>N° do processo: <b>${processo}</b></p>`
        resultadoCliente.innerHTML += `<p><b>${cliente}</b></p>`
        resultadoCliente.innerHTML += `<p>Via:${via}</p>`
        resultadoCliente.innerHTML += `<p>RMI:<b>${rmi}</b></p>`
        resultadoCliente.innerHTML += `<p>DER:<b>${der}</b></p>`
        resultadoCliente.innerHTML += `<p>DIB:<b>${dib}</b></p>`
        resultadoCliente.innerHTML += `<p>DIP:<b>${dip}</b></p>`
        resultadoCliente.innerHTML += `<p>Valor da causa: ${vcausa}</p>`
        resultadoCliente.innerHTML += `<p>Sentença: <b>${vacao}</p>`
        resultadoCliente.innerHTML += `<p>Valor liquido: <b>${liquidoCliente}</p>`
        resultadoCliente.innerHTML += `<p>Valor escritorio: <b>${saldoliq}</p>`
        resultadoCliente.innerHTML += `<p>-------------------------------------------------</p>`

    }

    form.addEventListener('submit', recebeEventoForm)
}
calcular();


String.prototype.reverse = function () {
    return this.split('').reverse().join('');
};

function mascaraMoeda(campo, evento) {
    var tecla = (!evento) ? window.event.keyCode : evento.which;
    var valor = campo.value.replace(/[^\d]+/gi, '').reverse();
    var resultado = "";
    var mascara = "########.##".reverse();
    for (var x = 0, y = 0; x < mascara.length && y < valor.length;) {
        if (mascara.charAt(x) != '#') {
            resultado += mascara.charAt(x);
            x++;
        } else {
            resultado += valor.charAt(y);
            y++;
            x++;
        }
    }
    campo.value = resultado.reverse();
}


function printDIV(i) {
    var cssEstilos = '';
    var imp = window.open('', 'div', 'width=' + window.innerWidth + ',height=' + window.innerWidth);

    var cSs = document.querySelectorAll("link[rel='stylesheet']");
    for (x = 0; x < cSs.length; x++) {
        cssEstilos += '<link rel="stylesheet" href="' + cSs[x].href + '">';
    }

    imp.document.write('<html><head><title>' + document.title + '</title>');
    imp.document.write(cssEstilos + '</head><body>');
    imp.document.write(document.getElementById(i).innerHTML);
    imp.document.write('</body></html>');

    setTimeout(function () {
        imp.print();
        imp.close();
    }, 500);
}
