

const CnpjValidator = (cnpj: string): boolean => {
        const cnpjOnlyNumber = cnpj.replace(/[^\d]+/g,'');
     
        if(cnpjOnlyNumber == '') return false;
         
        if (cnpjOnlyNumber.length != 14)
            return false;
     
        // Elimina CNPJs invalidos conhecidos
        if (cnpjOnlyNumber == "00000000000000" || 
            cnpjOnlyNumber == "11111111111111" || 
            cnpjOnlyNumber == "22222222222222" || 
            cnpjOnlyNumber == "33333333333333" || 
            cnpjOnlyNumber == "44444444444444" || 
            cnpjOnlyNumber == "55555555555555" || 
            cnpjOnlyNumber == "66666666666666" || 
            cnpjOnlyNumber == "77777777777777" || 
            cnpjOnlyNumber == "88888888888888" || 
            cnpjOnlyNumber == "99999999999999")
            return false;
             
        // Valida DVs
        let tamanho = cnpjOnlyNumber.length - 2
        let numeros = cnpjOnlyNumber.substring(0,tamanho);
        const digitos = cnpjOnlyNumber.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
          soma += Number(numeros.charAt(tamanho - i)) * pos--;
          if (pos < 2)
                pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado.toString() !== digitos.charAt(0))
            return false;
             
        tamanho = tamanho + 1;
        numeros = cnpjOnlyNumber.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
          soma += Number(numeros.charAt(tamanho - i)) * pos--;
          if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado.toString() !== digitos.charAt(1))
              return false;
               
        return true;
        
}

export {CnpjValidator}