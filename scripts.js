const form = document.querySelector('.forme');

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function calcularPercentual(valor, percentual) {
    return (valor * percentual) / 100;
}

function adicionarZero(numero) {
    return numero < 10 ? `0${numero}` : numero;
}

function formatarData(data) {
    const d = new Date(data);
    return `${adicionarZero(d.getDate() + 1)}/${adicionarZero(d.getMonth() + 1)}/${d.getFullYear()}`;
}

function calcular() {
    const resultado = document.querySelector('#resultado');
    const resultadoCliente = document.querySelector('#resultadoCliente');
    const dados = [];

    form.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const get = (selector, parseFn = (v) => v) => parseFn(form.querySelector(selector).value) || (parseFn === parseFloat ? 0 : 'Sem valor');

        const processo = get('.nprocesso') || '0000.0000';
        const cliente = get('.cliente') || 'Cliente';
        const via = get('.via');
        const dataDer = get('.der') || new Date().toLocaleDateString();
        const dataDib = get('.dib') || new Date().toLocaleDateString();
        const dataDip = get('.dip') || new Date().toLocaleDateString();
        const valorCausa = get('.vcausa', parseFloat);
        const valorAcao = get('.vsentenca', parseFloat);
        const acao = get('.acao', parseFloat);
        const meses = get('.meses');
        const valorMeses = get('.vmeses', parseFloat);
        const desconto = get('.desc', parseFloat);
        const escritorio = get('.escritorio', parseFloat);
        const nomeParceiro = get('.nomeparceiro') || 'Sem parceiro';
        const parceiro = get('.parceiro', parseFloat);
        const nomeParceiro2 = get('.nomeparceiro2') || 'Sem parceiro';
        const parceiro2 = get('.parceiro2', parseFloat);

        dados.push([
            processo, cliente, dataDer, dataDib, dataDip, via, valorCausa, valorAcao, acao, meses,
            valorMeses, escritorio, nomeParceiro, parceiro, nomeParceiro2, parceiro2
        ]);

        const bruto = calcularPercentual(valorAcao, acao);
        const brutoTotal = bruto + (meses * valorMeses);
        const liquido = brutoTotal - desconto;
        const liquidoCliente = formatarMoeda(valorAcao - liquido);
        const saldoLiquido = formatarMoeda(liquido);

        const saldoEscritorio = calcularPercentual(liquido, escritorio);
        const saldoParceiro = calcularPercentual(liquido, parceiro);
        const saldoParceiro2 = calcularPercentual(liquido, parceiro2);
        const saldoLivre = liquido - (saldoEscritorio + saldoParceiro + saldoParceiro2);

        const porcentagemLivre = (100 - (escritorio + parceiro + parceiro2)).toFixed(2);

        const valores = {
            vcausa: formatarMoeda(valorCausa),
            vacao: formatarMoeda(valorAcao),
            vdesc: formatarMoeda(desconto),
            rmi: formatarMoeda(valorMeses),
            esc: formatarMoeda(saldoEscritorio),
            par: formatarMoeda(saldoParceiro),
            par2: formatarMoeda(saldoParceiro2),
            livre: formatarMoeda(saldoLivre),
        };

        const datasFormatadas = {
            der: formatarData(dataDer),
            dib: formatarData(dataDib),
            dip: formatarData(dataDip),
        };

        // Exibição para administrador
        resultado.innerHTML += `
            <p>N° do processo: <b>${processo}</b></p>
            <p>Via: ${via}</p>
            <p>Valor da causa: ${valores.vcausa}</p>
            <p>Sentença: <b>${valores.vacao}</b></p>
            <p>Desconto concedido: ${valores.vdesc}</p>
            <p>${meses} meses de ${valores.rmi}</p>
            <p>Receber de <b>${cliente}</b>: <b>${saldoLiquido}</b></p>
            <p>Escritório ${escritorio}%: ${valores.esc}</p>
            <p>${nomeParceiro} ${parceiro}%: ${valores.par}</p>
            <p>${nomeParceiro2} ${parceiro2}%: ${valores.par2}</p>
            <p>Hariana ${porcentagemLivre}%: ${valores.livre}</p>
            <p>-------------------------------------------------</p>`;

        // Exibição para cliente
        resultadoCliente.innerHTML += `
            <p>N° do processo: <b>${processo}</b></p>
            <p><b>${cliente}</b></p>
            <p>Via: ${via}</p>
            <p>RMI: <b>${valores.rmi}</b></p>
            <p>DER: <b>${datasFormatadas.der}</b></p>
            <p>DIB: <b>${datasFormatadas.dib}</b></p>
            <p>DIP: <b>${datasFormatadas.dip}</b></p>
            <p>Valor da causa: ${valores.vcausa}</p>
            <p>Sentença: <b>${valores.vacao}</b></p>
            <p>Valor líquido: <b>${liquidoCliente}</b></p>
            <p>Valor escritório: <b>${saldoLiquido}</b></p>
            <p>-------------------------------------------------</p>`;
    });
}

calcular();

// Máscara moeda
String.prototype.reverse = function () {
    return this.split('').reverse().join('');
};

function mascaraMoeda(campo, evento) {
    const tecla = (!evento) ? window.event.keyCode : evento.which;
    let valor = campo.value.replace(/[^\d]+/gi, '').reverse();
    const mascara = "########.##".reverse();
    let resultado = "";

    for (let x = 0, y = 0; x < mascara.length && y < valor.length;) {
        if (mascara.charAt(x) !== '#') {
            resultado += mascara.charAt(x++);
        } else {
            resultado += valor.charAt(y++);
            x++;
        }
    }
    campo.value = resultado.reverse();
}

// Impressão
function printDIV(id) {
    let imp = window.open('', 'div', `width=${window.innerWidth},height=${window.innerWidth}`);
    let estilos = [...document.querySelectorAll("link[rel='stylesheet']")]
        .map(link => `<link rel="stylesheet" href="${link.href}">`)
        .join('');

    imp.document.write(`<html><head><title>${document.title}</title>${estilos}</head><body>`);
    imp.document.write(document.getElementById(id).innerHTML);
    imp.document.write('</body></html>');

    setTimeout(() => {
        imp.print();
        imp.close();
    }, 500);
}
