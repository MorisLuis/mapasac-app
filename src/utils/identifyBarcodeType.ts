import codebartypes from './codebarTypes.json';

export const identifyBarcodeType = (codebar?: string) => {
    const barcodeData = codebartypes;

    for (let i = barcodeData.barcodes.length - 1; i >= 0; i--) {
        let barcode = barcodeData.barcodes[i];
        let regex = new RegExp(barcode.regex);
        if (regex.test(codebar as string)) {
            return {
                type: barcode.type,
                id: barcode.id,
                errorMessage: barcode.errorMessage,
                keyboardType: barcode.keyboardType,
                maxLength: barcode.maxLength
            };
        }
    }
    return null;
};