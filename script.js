const content = document.getElementById('content'), year = document.querySelector('#year').childNodes[0]
const observer = new MutationObserver(showData)
const config = { attributes: true, childList: false, characterData: true };
showData()

// Observe perubahan data pada tulisan tahun
observer.observe(year, config)

function showData() {
    while (content.hasChildNodes()) {
        content.removeChild(content.firstChild)
    }
    let newYear = year.textContent
    if (newYear.length == 4)
        getData(`https://api-harilibur.vercel.app/api?year=${newYear}`, success)
    else content.append(document.createTextNode('Tolong masukkan tahun dengan benar'))
}

// AJAX dengan Vanilla JS
function getData(url, success) {
    const data = new XMLHttpRequest()

    data.onreadystatechange = function () {
        if (data.readyState = 4 && data.status === 200) success(data.response)
    }

    data.open('get', url)
    data.send()
}

function success(result) {
    let hari_libur_data = JSON.parse(result), date, content_item, first_bold_content, content_text, second_bold_content
    hari_libur_data.reverse().forEach(hari_libur => {
        date = new Date(hari_libur.holiday_date)
        content_item = document.createElement('li')

        first_bold_content = document.createElement('strong')
        first_bold_content.innerText = hari_libur.holiday_name
        first_bold_content.style.color = 'red'

        second_bold_content = document.createElement('strong')
        second_bold_content.innerText = date.toLocaleDateString('id-ID', { dateStyle: 'long' })

        content_text = document.createTextNode(' di tanggal ')

        content_item.append(first_bold_content, content_text, second_bold_content)
        content.appendChild(content_item)
    })
    if (!content.hasChildNodes())
        content.append(document.createTextNode(`Belum ada data untuk hari libur di tahun ${year.textContent}`))
}