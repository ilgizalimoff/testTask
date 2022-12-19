let addBtn = document.getElementById('addBtn')
let addZakazy = document.getElementById('addZakazy')
let addZakazDiv = document.querySelector('.addZakazDiv')

addZakazy.addEventListener('click', function () {
    addZakazDiv.style.display = 'block'
    zakazBox.style.display = 'none'
    showDopPar.style.display ='none'
})
addBtn.addEventListener('click', function () {
    addZakaz()
})

function addZakaz() {
    fetch('http://localhost:3000/zgalovok')
        .then(response => response.json())
        .then(data => redsad(data))
    function redsad(data) {
        let cehProizv = document.getElementById('cehProizv').value
        let date1 = document.getElementById('date1').value
        let date2 = document.getElementById('date2').value
        let status = document.getElementById('status').value
        let markaStali = document.getElementById('markaStali').value
        let diametr = document.getElementById('diametr').value
        let stenka = document.getElementById('stenka').value
        let obPosic = document.getElementById('obPosic').value
        let edIZm = document.getElementById('edIZm').value
        let body1 = {
            id: data.length + 1,
            cehProizv: cehProizv,
            dateBegin: date1,
            dateEnd: date2,
            status: status
        }
        let body2 = {
            numPosition: data.length + 1,
            celevCharacterMaterial: {
                markaStali: markaStali,
                diametr: diametr,
                stenka: stenka
            },
            ObPoszakaza: obPosic,
            edinIzm: edIZm,
            status: 'Новый'
        }
        fetch('http://localhost:3000/zgalovok', {
            method: 'POST',
            body: JSON.stringify(body1),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        fetch('http://localhost:3000/position', {
            method: 'POST',
            body: JSON.stringify(body2),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}