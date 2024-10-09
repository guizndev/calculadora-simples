document.addEventListener('DOMContentLoaded', function() {
    const dataInput = document.getElementById('data');
    
    // Seleciona automaticamente o campo de data ao carregar a página
    dataInput.focus();

    // Formata a entrada de data enquanto o usuário digita
    dataInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        if (value.length > 5) {
            value = value.slice(0, 5) + '/' + value.slice(5, 9);
        }
        e.target.value = value;
    });

    document.getElementById('dataForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const dataStr = dataInput.value;
        const resultadoDiv = document.getElementById('resultado');
        
        const dataInicial = new Date(dataStr.split('/').reverse().join('-'));
        
        if (isNaN(dataInicial.getTime())) {
            resultadoDiv.innerHTML = "<p style='color: red;'>Formato de data inválido. Por favor, use o formato DD/MM/AAAA.</p>";
            return;
        }
        
        const data365Dias = new Date(dataInicial);
        data365Dias.setFullYear(data365Dias.getFullYear() + 1);
        
        const data730Dias = new Date(dataInicial);
        data730Dias.setFullYear(data730Dias.getFullYear() + 2);
        
        const data1826Dias = new Date(dataInicial);
        data1826Dias.setFullYear(data1826Dias.getFullYear() + 5);
        
        resultadoDiv.innerHTML = `
            <h2>Resultados:</h2>
            <p>Data após um ano: <strong>${formatarData(data365Dias)}</strong></p>
            <p>Data após dois anos: <strong>${formatarData(data730Dias)}</strong></p>
            <p>Data após cinco anos: <strong>${formatarData(data1826Dias)}</strong></p>
        `;
    });
});

function formatarData(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}
