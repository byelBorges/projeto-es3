export default class InterfaceObserver{
    constructor() {
        if (new.target === InterfaceObserver) {//Se tentar dar new na classe 'interface', erro
            throw new Error("Não é possível instanciar uma interface.");
        }
    }

    update(){}
}