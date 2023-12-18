console.log(API_URL);

const res_data = { r: {} }
let filtered_data = {}
function renderDynamicContent() {
    getdata().then(r => {
        res_data.r = r
        console.log(res_data)
        // document.getElementById('dynamic-content').innerHTML = JSON.stringify(r)
        document.querySelector('.submit').style.display = "block"
        document.querySelector('.submit').click()
    })
}



function search(e, tab = "places") {
    const v = document.querySelector(".search_input").value
    if (e == null) {
        if (v) {
            const data = res_data.r.find(d => d.name.toLowerCase().startsWith(v))
            if (data == null) return
            setTitle(data)
            setSuggestionBox(data)
            setBg(data)
            return
        }
    }

    const data = filtered_data = res_data.r.find(d => d.name.toLowerCase().startsWith(v))
    if (filtered_data == null) return

    setTitle(data)
    setSuggestionBox(null)
    setBg(data)
    setWeather(data.weather)
    tabClick(tab)
    return false;
}

function setWeather(data) {
    document.querySelector(".weather>img").src=data.icon
    document.querySelector(".weather>.temp").innerHTML=data.temp
    document.querySelector(".weather>.desc").innerHTML=data.main
}

function tabClick(tab) {
    const all_data = filtered_data.categories[tab]
    var content = document.querySelector('template').content
    document.querySelector(".tab-contents").innerHTML = ""
    all_data.forEach(data => {
        const tabNode = document.importNode(content, true).querySelector(".tab-container")
        tabNode.querySelector('&>.tab-image').style.backgroundImage = "url('" + data.imageUrl + "')";
        tabNode.querySelector('&>.tab-description>h2').innerHTML = data.name;
        tabNode.querySelector('&>.tab-description>.stars').innerHTML = data.rating;
        tabNode.querySelector('&>.tab-description>p').innerHTML = data.desc || "";
        tabNode.querySelector('&>.opens-at>div').innerHTML = data.openAt || data.checkIn;
        tabNode.querySelector('&>.closes-at>div').innerHTML = data.closeAt || data.checkOut;
        tabNode.querySelector('&>.entry-fee>div').innerHTML = data.entryFee || data.price;
        tabNode.style.display = "block";
        document.querySelector(".tab-contents").appendChild(tabNode)
    })

    document.querySelector(".tabs>.tab-menu>div").style.borderBottom = "none";
    document.querySelector(".tabs>.tab-menu>." + tab).style.borderBottom = "solid 1px purple";
}

function setBg(data) {
    document.querySelector('body').style.backgroundImage = "url('" + data.backgroundUrl + "')"
}


function setTitle(data) {
    document.querySelector('.title').innerHTML = data.name;
}

function setSuggestionBox(data) {
    if (!data) {
        document.querySelector(".suggestion_box").style.display = "none"
        return
    }
    document.querySelector(".suggestion_box").querySelectorAll("div>b").forEach(e => e.innerHTML = data.name)
    document.querySelector(".suggestion_box").style.display = "block"
}





