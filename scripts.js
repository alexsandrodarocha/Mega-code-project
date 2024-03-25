const buttonStart = document.getElementById('start');
const buttonRegister = document.getElementById('register');
const buttonList = document.getElementById('list');
const buttonFinish = document.getElementById('finish');
const buttonResults = document.getElementById('results');
const buttonReset = document.getElementById('reset');
const buttonAward = document.getElementById('award');

const bets = [
    // {
    //     id: 1,
    //     name: 'teste1',
    //     cpf: '11111111111',
    //     numbers: [1, 49, 3, 5, 40]
    // },
    // {
    //     id: 1,
    //     name: 'teste2',
    //     cpf: '11111111111',
    //     numbers: [1, 49, 3, 5, 40]
    // },

]

let id = 1000
let drawnNumbers = []
let qtyWinners = 0
let winners = ''
let extraDraws = 0

let winnerTest = false

buttonRegister.addEventListener('click', (e) => {
    e.preventDefault();

    let name = prompt("Informe seu nome: ")
    while (name.trim() === "" || /[0-9]/.test(name)) {
        name = prompt("Por favor, informe seu nome corretamente: ")
    }
    let cpf = prompt("Informe seu CPF: ")
    while (cpf.trim() === "" || cpf.length !== 11) {
        cpf = prompt("Por favor, informe seu CPF corretamente contendo 11 dígitos: ")
    }
    let numbers = []
    let option = Number(prompt(`Opções:
    1 - Informar os 5 números da aposta;
    2 - Aposta surpresinha (números sorteados);`))
    if (option == 1) {
        alert(`***Informe os 5 números que deseja apostar sucessivamente*** 
        Obs.: são aceitos apenas números de 1 a 50`)

        let numberOne = Number(prompt(`Informe o primeiro número: `))
        while (numberOne < 1 || numberOne > 50 || isNaN(numberOne) || numbers.includes(numberOne)) {
            numberOne = Number(prompt("Por favor, informe um número entre 1 e 50 que não tenha sido escolhido anteriormente: "))

        }
        numbers.push(numberOne)

        let numberTwo = Number(prompt("Informe o segundo número: "))
        while (numberTwo < 1 || numberTwo > 50 || isNaN(numberTwo) || numbers.includes(numberTwo)) {
            numberTwo = Number(prompt("Por favor, informe um número entre 1 e 50 que não tenha sido escolhido anteriormente: "))
        }
        numbers.push(numberTwo)

        let numberThree = Number(prompt("Informe o terceiro número: "))
        while (numberThree < 1 || numberThree > 50 || isNaN(numberThree) || numbers.includes(numberThree)) {
            numberThree = Number(prompt("Por favor, informe um número entre 1 e 50 que não tenha sido escolhido anteriormente: "))
        }
        numbers.push(numberThree)

        let numberFour = Number(prompt("Informe o quarto número: "))
        while (numberFour < 1 || numberFour > 50 || isNaN(numberFour) || numbers.includes(numberFour)) {
            numberFour = Number(prompt("Por favor, informe um número entre 1 e 50 que não tenha sido escolhido anteriormente: "))
        }
        numbers.push(numberFour)

        let numberFive = Number(prompt("Informe o quinto número: "))
        while (numberFive < 1 || numberFive > 50 || isNaN(numberFive) || numbers.includes(numberFive)) {
            numberFive = Number(prompt("Por favor, informe um número entre 1 e 50 que não tenha sido escolhido anteriormente: "))
        }
        numbers.push(numberFive)

    } else if (option == 2) {

        while (numbers.length < 5) {
            let number = Math.floor(Math.random() * 50) + 1;
            if (!numbers.includes(number)) {
                numbers.push(number)
            }
        }

    } else if (option > 2) {
        while (option > 2) {
            option = Number(prompt(`Opção inválida, por favor escolha uma das seguintes pções:
        1 - Informar os 5 números da aposta;
        2 - Aposta surpresinha (números sorteados);`))
        }
    }

    bets.push({
        id: id++,
        name: name,
        cpf: cpf,
        numbers: numbers
    })

})


buttonList.addEventListener('click', (e) => {
    e.preventDefault();

    const modalContentList = document.querySelector('.modal-content-list')

    let listPrint = ''
    for (let bet of bets) {
        listPrint += `ID: ${bet.id}, Nome: ${bet.name}, CPF: ${bet.cpf}, Bilhete: ${bet.numbers} <br>`

    }

    modalContentList.innerHTML = `
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Lista de apostas</h1>
            </div>
            <div class="modal-body">
                        <p>${listPrint}</p>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            </div>
        `


})

buttonFinish.addEventListener('click', (e) => {
    e.preventDefault();

    const containerBody = document.getElementById('containerBody')
    const wrapper = document.createElement('div')
    wrapper.innerHTML += `
        <div class="alert alert-success alert-style alert-dismissible" role="alert">
            <div>Apuração realidada com sucesso!</div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`

    containerBody.append(wrapper)

    let getNumbers = []
    while (getNumbers.length < 5) {
        let number = Math.floor(Math.random() * 50) + 1;
        if (!getNumbers.includes(number)) {
            getNumbers.push(number);
        }
    }

    drawnNumbers = getNumbers;

    winners = bets.filter(bet => drawnNumbers.every(number => bet.numbers.includes(number)));
    qtyWinners = winners.length;

    if (qtyWinners > 0) {
        winnerTest = true
    } else {
        while (!winnerTest === true && extraDraws < 24) {
            if (extraDraws === 25) {
                break
            } else {
                let extraNumber = Math.floor(Math.random() * 50) + 1;
                while (drawnNumbers.includes(extraNumber)) {
                    extraNumber = Math.floor(Math.random() * 50) + 1;
                }
                drawnNumbers.push(extraNumber);

                winners = bets.filter(bet => bet.numbers.every(number => drawnNumbers.includes(number)));
                qtyWinners = winners.length;

                if (qtyWinners > 0) {
                    winnerTest = true
                } else {
                    winnerTest = false
                    extraDraws++;

                }
            }
        }
    }

})

let winnersPrint = ''

buttonResults.addEventListener("click", (e) => {
    e.preventDefault();

    const modalContentResults = document.querySelector('.modal-content-results')

    if (winners.length > 0) {
        for (let winner of winners) {
            winnersPrint += `Nome: ${winner.name}, CPF: ${winner.cpf}, Bilhete: ${winner.numbers} <br>`
            console.log(`ID: ${winner.id}, Nome: ${winner.name}, CPF: ${winner.cpf}, Bilhete: ${winner.numbers}`)
        }
    } else {
        winnersPrint = `Não houve vencedores mesmo após o 25º número extra sorteado.`
    }

    let betNumbers = bets.flatMap(bet => bet.numbers);
    let countNumber = {};
    betNumbers.forEach(number => {
        countNumber[number] = (countNumber[number] || 0) + 1;
    });
    let orderedNumber = Object.entries(countNumber).sort((a, b) => b[1] - a[1]);
    let orderedNumberPrint = ''
    let orderedNumberPrintX = ''
    orderedNumber.forEach(([number, qty]) => {
        orderedNumberPrint += `${number}<br>`
        orderedNumberPrintX += `${qty}<br>`
    });

    modalContentResults.innerHTML = `
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Resultados da apuração</h1>
            </div>
            <div class="modal-body">
                        <p>Números sorteados: ${drawnNumbers}</p>
                        <hr>
                        <p>Quantidade de rodadas extras de sorteio realizadas: ${extraDraws + 1}</p>
                        <hr>
                        <p>Quantidade de apostas vencedoras: ${qtyWinners}</p>
                        <hr>
                        <p>Lista de apostas vencedoras: </p>
                        <p>${winnersPrint}</p>
                        <hr>
                        <p>Lista de todos os números apostados: </p>
                        <div class="row">
                        <div class="col">
                            <p>Nro apostado</p>
                            <p>${orderedNumberPrint}<p>
                        </div>
                        <div class="col">
                            <p>Qtd de apostas</p>
                            <p>${orderedNumberPrintX}<p>
                        </div>
                    </div>
                    </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            </div>
        `

})

buttonAward.addEventListener('click', (e) => {
    e.preventDefault;

    const modalContentAward = document.querySelector('.modal-content-award')
    let amountBets = parseFloat(bets.length * 5)
    let awardAmount = parseFloat(amountBets * 0.5)
    let awardValue = ''
    if (winners.length === 1) {
        awardValue = parseFloat(awardAmount)
    } else if (winners.length === 0) {
        awardValue = parseFloat(0)
    } else {
        awardValue = parseFloat(awardAmount / winners.length)
    }

    modalContentAward.innerHTML = `
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Premiação 🎰</h1>
            </div>
            <div class="modal-body">
                        <p>Lista de apostas vencedoras: </p>
                        <p>${winnersPrint}</p>
                        <hr>
                        
                        <p>Total arrecadado: R$${amountBets.toFixed(2)}</p>
                        <hr>
                        <p>Total prêmio: R$${awardAmount.toFixed(2)}</p>
                        <hr>
                        <p>Valor do prêmio para cada vencedor:  R$${awardValue.toFixed(2)}</p>
                        <hr>
                        <h3>Parabéns aos vencedores!</h3>
                        <p>Obs.: Caso haja o vencedor ou vencedores, os mesmos devem entrar em contato conosco para a retirada do prêmio.</p>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            </div>
        `

})
