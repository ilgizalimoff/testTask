let getZakazyBtn = document.getElementById('getZakazy')
let zakazBox = document.querySelector('.zakazBox')
let getDopParams = document.querySelector('#showDopPar')

getZakazyBtn.addEventListener('click', function () {
    zakazBox.style.display = 'flex'
    addZakazDiv.style.display = 'none'

    fetch('http://localhost:3000/zgalovok')
        .then(response => response.json())
        .then(data => renderZakazov(data))

    function renderZakazov(data) {
        let content = ''
        data.forEach(element => {
            content += `<div id='${element.id}' class="cart">
            <li><h1>Цех производителя:</h1> ${element.cehProizv}</li>
            <li><h1>Дата начала: </h1> ${element.dateBegin}</li>
            <li><h1>Дата окончания: </h1> ${element.dateEnd}</li>
            <li><h1>Статус: </h1> ${element.status}</li>
        </div>`
        });
        zakazBox.innerHTML = content
    }
    showDopPar.style.display ='inline'
})
getDopParams.addEventListener('click', function () {
    fetch('http://localhost:3000/zgalovok')
        .then(response => response.json())
        .then(data => getDopPosiZakazov(data))

    function getDopPosiZakazov(data) {
        fetch('http://localhost:3000/position')
            .then(response => response.json())
            .then(dopData => getDopPos(dopData))

        function getDopPos(dopData) {
            data.forEach(element => {
                dopData.forEach(el => {
                    let dopContent = ``
                    if (element.id == el.numPosition) {
                        dopContent = `<div class="showDopParams">
                                        <li><h1>Марка стали: </h1> ${el.celevCharacterMaterial.markaStali}</li>
                                        <li><h1>Диаметр: </h1> ${el.celevCharacterMaterial.diametr}</li>
                                        <li><h1>Стенка: </h1> ${el.celevCharacterMaterial.stenka}</li>
                                        <li><h1>Объем позиции: </h1> ${el.ObPoszakaza}</li>
                                        <li><h1>Единица измерения: </h1> ${el.edinIzm}</li>
                                        <li><h1>Статус: </h1> ${el.status}</li>
                                        </div>`
                        let cardParent = document.getElementById(element.id)
                        let div = document.createElement('div');
                        div.innerHTML = dopContent
                        cardParent.append(div)
                    }
                })
            })
        }
    }
})