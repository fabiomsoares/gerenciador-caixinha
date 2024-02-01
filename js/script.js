function retrieveListStorage(key){
    listStorage = localStorage.getItem(key);
    try{
        listStorage = JSON.parse(listStorage);
        if(listStorage===null){
            result = [];
        }
        else{
            console.log(listStorage);
        }
    }
    catch(error){
        result = [];
    }
    return result;
}

function writeListStorage(key,value){
    console.log(value);
    localStorage.setItem(key,JSON.stringify(value));
}

function maxId(list){
    mappedList = list.map(q=>q.Id);
    console.log(mappedList);
    result = Math.max(...mappedList);
    if(result===undefined || result===null)
        result=0;
    return result;
}

class Contribuinte {
    static storageList = `List${this.prototype.constructor.name}s`;
    constructor(nome, quotas, dataInicio) {
        this.Id = null;
        this.Nome = nome;
        this.Quotas = quotas;
        this.DataInicio = dataInicio;
        this.className = this.constructor.name;
        this.storageList = `List${this.className}s`
    }
    addToList(list) {
        let newId = maxId(list);
        this.Id = newId+1;
        list.push(this);
    }
    persist() {
        let listContribuintes = retrieveListStorage(this.storageList);
        console.log(listContribuintes);
        this.addToList(listContribuintes);
        writeListStorage(this.storageList, listContribuintes);
    }
    static getAll(){
        return retrieveListStorage(this.storageList);
    }
}

localStorage.setItem("ListContribuintes",null);

c1 = new Contribuinte("João",1,new Date(2024,0,1));
c2 = new Contribuinte("Ana",1,new Date(2024,0,1));
c1.persist();
c2.persist();
let allContribuintes = Contribuinte.getAll();
allContribuintes.forEach(element => {
    console.log(element);
});