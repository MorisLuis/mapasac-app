import codebartypes from './codebarTypes.json';

export const identifyBarcodeType = (codebar?: string) => {
    if (!codebar) return null; // Verificación rápida para cadenas undefined o null
    // Verificar la longitud del código
    if (codebar.length === 12) {
        return "UPC-A";
    } else if (codebar.length === 13) {
        if (codebar.startsWith("0") && codebar.substring(1).match(/^\d{12}$/)) {
            return "UPC-A convertido a EAN-13";
        } else {
            return "EAN-13";
        }
    } else {
        return "Código de barras inválido";
    }
};
