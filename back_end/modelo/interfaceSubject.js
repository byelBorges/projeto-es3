export default class InterfaceSubject{
    constructor() {
        if (new.target === InterfaceSubject) {//Se tentar dar new na classe 'interface', erro
            throw new Error("Não é possível instanciar uma interface.");
        }
    }

    registerObserver(){}//permite um observador registrar-se para receber atualizacoes de estado de um sujetio
    removeObserver(){}
    notifyObserver(){}//permite que o sujeito notifique todo os observadores registrados em sua lista
}
//sujeito deve manter uma lista de observadores registrados
//metodos getState e setState na classe sujeito concreta