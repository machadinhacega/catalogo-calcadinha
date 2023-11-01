class Catalogo {
    #id = 1
    
    constructor(){
        this.listaItens = [];
        this.edit = false
        this.classe;
    }
    get id(){
        return this.#id
    }
    set id(id){
        this.#id = id
    }
    
    formPetisco(){
        document.getElementById('btn-petisco').classList.add('btn-active')
        document.getElementById('btn-bebida').classList.remove('btn-active')
        
        this.classe = Petisco
    }
    
    formBebida(){
        document.getElementById('btn-bebida').classList.add('btn-active')
        document.getElementById('btn-petisco').classList.remove('btn-active')

        this.classe =  Bebida        
    }

    
    salvar(){
        if (this.classe != undefined){
            this.adicionarItem()
            this.classe.mostrarTabela()
            this.exportar()
        } else {alert('Escolha o tipo do item')}
    }
    exportar(){
        console.log(catalogo.listaItens);
        return catalogo.listaItens
    }
    
    adicionarItem(){
        if (this.edit === false){
            if(this.classe.validarDados()){
                this.listaItens.push(this.classe.lerDados())
                this.limparCampos()
            }
        } else {
            this.atualizarItem()
            this.limparCampos()
        }
    }

    limparCampos(){
        document.getElementById('nomeProduto').value = ''
        document.getElementById('descProduto').value = ''
        document.getElementById('valorProduto').value = ''
        document.getElementById('imgProduto').value = ''

        document.getElementById('btn-bebida').classList.remove('btn-active')
        document.getElementById('btn-petisco').classList.remove('btn-active')
    }


    deletarItem(id, nome){
        if(confirm(`Tem certeza que deseja excluir o item ${id} (${nome})?`)){

            for (let i = 0; i < this.listaItens.length; i++) {
                if(this.listaItens[i].id === id){
                    this.listaItens.splice(i,1)
                    document.getElementById('tbody').deleteRow(i)
                }
            }
        }
    }

    editarItem(id, nome){
        this.edit = true
        document.getElementById('btn-save').innerText = 'Atualizar'
        for (let i = 0; i < this.listaItens.length; i++) {
            if(this.listaItens[i].id === id){
                document.getElementById('nomeProduto').value = this.listaItens[i].nome;
                document.getElementById('descProduto').value = this.listaItens[i].desc;
                document.getElementById('valorProduto').value = this.listaItens[i].valor;
                document.getElementById('imgProduto').value = this.listaItens[i].img;
            }
        }
        this.id = id
    }
    
    atualizarItem(){
        for (let i = 0; i < this.listaItens.length; i++) {
            if(this.listaItens[i].id === this.id){
                if(document.getElementById('nomeProduto').value){
                    this.listaItens[i].nome = document.getElementById('nomeProduto').value
                }
                this.listaItens[i].desc = document.getElementById('descProduto').value
                if(document.getElementById('valorProduto').value){
                    this.listaItens[i].valor = document.getElementById('valorProduto').value
                }
                this.listaItens[i].img = document.getElementById('imgProduto').value
            }
            
        }
        


        this.edit = false
        document.getElementById('btn-save').innerText = 'Salvar'

    }

}



class Item {
    constructor(){
    }
    


    static lerDados(){
        let item = {}
        item.id = catalogo.id++
        item.nome = document.getElementById('nomeProduto').value;
        item.desc = document.getElementById('descProduto').value;
        item.valor = parseFloat(document.getElementById('valorProduto').value);
        item.img = document.getElementById('imgProduto').value;
        
        return item

    }


    

    static validarDados(){
        let mensagem = 'Você precisa preencher: \n'
        if(document.getElementById('nomeProduto').value === ''){
            mensagem += '• Nome do item \n'
        }
        if(document.getElementById('valorProduto').value === ''){
            mensagem += '• Valor do item \n'
        }
        if (mensagem != 'Você precisa preencher: \n'){
            alert(mensagem)
        } else {
            return true
        }
        return false
    }

    static mostrarTabela(){
        let tbody = document.getElementById('tbody')
        tbody.innerHTML = '';

        for (let i = 0; i < catalogo.listaItens.length; i++) {
            tbody.innerHTML += `
            <tr class="align-baseline">
            <td class="text-corPrimeira">${catalogo.listaItens[i].id}</td>
            <td class="text-corPrimeira">${catalogo.listaItens[i].nome}</td>
            <td class="text-corPrimeira">${catalogo.listaItens[i].desc}</td>
            <td class="text-corPrimeira">${catalogo.listaItens[i].valor}</td>
            <td><img src="${catalogo.listaItens[i].img}" height="50px" alt=""></td>
            <td>
                <button onclick="catalogo.editarItem(${catalogo.listaItens[i].id},'${catalogo.listaItens[i].nome}')"class="border-0"><img src="./assets/img/edit.svg" alt="editar"></button>
                <!-- Aqui cada botão deletar recebe o id do item q ele pertence -->
                <button onclick="catalogo.deletarItem(${catalogo.listaItens[i].id},'${catalogo.listaItens[i].nome}')" class="border-0"><img src="./assets/img/delete.svg" alt="deletar"></button>
            </td>
        </tr>
        `
            
        }

    }
}

class Petisco extends Item {}

class Bebida extends Item {}

const catalogo = new Catalogo

