async function AdminCalc(id) { // Отправление запроса на получение наигранного админом времени через прокси. Подсчет наигранного времени и вывод результата. (Для рядовой администрации)
    elem = document.getElementById("CopyTimeBox");
    if (id == 'freeze') {
        elem.rows = "2.5";
        elem.style = "border: 3px solid red; background-color: lightcoral";
        elem.value = "= ⚠️ = Ошибка! = ⚠️ =\nАдминистратор временно заморожен!";
        hide('timer');
        hide('result');
        return 0;
    }
    elem.rows = "7";
    elem.style = "border: 3px solid orange; background-color: lightgoldenrodyellow";
    // window.open('http://rushogwarts.myarena.ru/time/'+id, '_blank');
    // elem.value = " ";
    elem.value = "\n\n\n= 🌐 = Получение информации = 🌐 =";
    let response = await fetch('https://dsi3hmj2hf.execute-api.us-east-1.amazonaws.com/dev/time/'+id);
    var data = await response.text();
    if (data == "Unable to reach upstream server") {
        // alert('Ошибка! \nЗа эту неделю данный администратор не был в профессии админа!');
        elem.rows = "2.5";
        elem.value = "= ⚠️ = Ошибка! = ⚠️ =\nЗа эту неделю данный администратор ещё не был в профессии админа!";
        elem.style = "border: 3px solid red; background-color: lightcoral";
        hide('timer');
        hide('result');
        data = 0;
        return 0;
    }
    elem.value = data;
    calculate();
    show('timer');
    show('result');
  }
  // AdminCalc().then(data => console.log(data));

async function ProxyCalc(id) { // Отправление запроса на получение наигранного админом времени через прокси. Подсчет наигранного времени и вывод результата. (Для Proxy и Stazher)
    elem = document.getElementById("CopyTimeBox");
    if (id == 'freeze') {
        elem.rows = "2.5";
        elem.style = "border: 3px solid red; background-color: lightcoral";
        elem.value = "= ⚠️ = Ошибка! = ⚠️ =\nАдминистратор временно заморожен!";
        hide('timer');
        hide('result');
        return 0;
    }
    elem.rows = "7";
    elem.style = "border: 3px solid orange; background-color: lightgoldenrodyellow";
    // window.open('http://rushogwarts.myarena.ru/time/'+id, '_blank');
    // elem.value = " ";
    elem.value = "\n\n\n= 🌐 = Получение информации = 🌐 =";
    let response = await fetch('https://dsi3hmj2hf.execute-api.us-east-1.amazonaws.com/dev/time/'+id);
    var data = await response.text();
    if (data == "Unable to reach upstream server") {
        // alert('Ошибка! \nЗа эту неделю данный администратор не был в профессии админа!');
        elem.rows = "2.5";
        elem.style = "border: 3px solid red; background-color: lightcoral";
        elem.value = "= ⚠️ = Ошибка! = ⚠️ =\nЗа эту неделю данный администратор ещё не был в профессии админа!";
        hide('timer');
        hide('result');
        data = 0;
        return 0;
    }
    elem.value = data;
    calculateProxy();
    show('timer');
    show('result');
  }
  // ProxyCalc().then(data => console.log(data));

function playlist (vol) { // переключение муз. файлов.
    audio.innerHTML = `<audio id="backgroundMusic" style="width: 100%;" controls autoplay src="audio/${sound_id}.mp3"></audio>`;
    audioNumber.innerHTML = `🎵 Трек № ${sound_id} 🎵`;
    var aud = document.getElementById("backgroundMusic");
	aud.volume = vol;


	aud.onended = function() {
		if (sound_id == 22) {
            sound_id = 1;
            vol = aud.volume;
			console.log('Переключение музыки. Играет № '+sound_id+' из 22.');
		} else {
            sound_id = sound_id + 1;
            vol = aud.volume;
			console.log('Переключение музыки. Играет № '+sound_id+' из 22.');
		}
		playlist(vol);
	}

}

function enterAdminNick(name) {
    nick = document.getElementById("adminNick");
    adminNick.innerHTML = name;
    show('adminNick');
}


// Если кто-то читает это, то отправь такой кристалик 💎 в личные сообщения https://vk.com/serfersmith, и я пойму, что ты читал этот код)


var calculate = function () { // Калькулятор времени для администрации
    elem = document.getElementById("CopyTimeBox");
    var str = document.getElementById('CopyTimeBox').value;
    //console.log(a);
    var t1 = [];
    var hrs = 0;
    var min = 0;
    var sec = 0;
    var arr = [];
    document.getElementById('hrs').innerHTML = hrs;
    document.getElementById("min").innerHTML = min;
    document.getElementById("sec").innerHTML = sec;
    if (str == 0) {alert("Поле для ввода времени пустое! \nВставьте свое время!")}
    t1 = str.match(/\|\|\| (\d\d:\d\d:\d\d)(?:\n|$)/g);
    //console.log(t1);
    t1.forEach(function(item, i, t1) {
        //console.log(item);
         arr = item.replace(/(\|\|\|\s)|\n/, "").split(":");
         //console.log(arr);
         hrs += parseInt(arr[0], 10);
         min += parseInt(arr[1], 10);
         sec += parseInt(arr[2], 10);
    });
    
    if (sec >= 3600) { hrs += Math.trunc(sec/3600); sec = sec % 3600 }
    if (sec >= 60) { min += Math.trunc(sec/60); sec = sec % 60 }
    if (min >= 60) { hrs += Math.trunc(min/60); min = min % 60 }

    // console.log(hrs);
    // console.log(min);
    // console.log(sec);

    let AdminTime = '';
    if (hrs < 15) {
        AdminTime = `<table id="table1">
                    <tr>
                        <td>
                            <p class="time">
                                <h1 class="d-inline-block .center-block">Часы: &#160</h1><h1 id="hrs" class="d-inline align-center"></h1>
                                <h2 class="d-inline-block">&#160 Минуты: &#160</h2><h1 id="min" class="d-inline"></h1>
                                <h2 class="d-inline-block">&#160 Секунды: &#160</h2><h1 id="sec" class="d-inline"></h1>
                            </p>
                        </td>
                    </tr>
                    </table>`;
        elem.style = "border: 4px solid #009200; background-color: lightgreen"};
    // if (hrs < 15 ) {  // Окраска рамки в красный или зеленый, в зависимости от выполненной нормы.
    //     AdminTime = `<table id="table1">
    //                 <tr>
    //                     <td>
    //                         <p class="time">
    //                             <h1 class="d-inline-block .center-block">Часы: &#160</h1><h1 id="hrs" class="d-inline align-center"></h1>
    //                             <h2 class="d-inline-block">&#160 Минуты: &#160</h2><h1 id="min" class="d-inline"></h1>
    //                             <h2 class="d-inline-block">&#160 Секунды: &#160</h2><h1 id="sec" class="d-inline"></h1>
    //                         </p>
    //                     </td>
    //                 </tr>
    //                 </table>`;
    //     elem.style = "border: 4px solid red"};
    if (hrs >= 15) {
        AdminTime = `<table id="table1">
                    <tr>
                        <td>
                            <p class="time">
                                <h1 class="d-inline-block .center-block">Часы: &#160</h1><h1 id="hrs" class="d-inline align-center"></h1>
                                <h2 class="d-inline-block">&#160 Минуты: &#160</h2><h1 id="min" class="d-inline"></h1>
                                <h2 class="d-inline-block">&#160 Секунды: &#160</h2><h1 id="sec" class="d-inline"></h1>
                            </p>
                        </td>
                    </tr>
                    </table>`;
        elem.style = "border: 4px solid #009200; background-color: lightgreen"};
    if (hrs == 15 && min == 0 && sec == 0) {
        AdminTime = `<table id="table1">
                    <tr>
                        <td>
                            <p class="time">
                                <h1 class="d-inline-block .center-block">Часы: &#160</h1><h1 id="hrs" class="d-inline align-center"></h1>
                                <h2 class="d-inline-block">&#160 Минуты: &#160</h2><h1 id="min" class="d-inline"></h1>
                                <h2 class="d-inline-block">&#160 Секунды: &#160</h2><h1 id="sec" class="d-inline"></h1>
                            </p>
                        </td>
                    </tr>
                    </table>`;
        elem.style = "border: 4px solid darkviolet; background-color: violet"}

    timer.innerHTML = AdminTime;


    document.getElementById('hrs').innerHTML = hrs;
    document.getElementById("min").innerHTML = min;
    document.getElementById("sec").innerHTML = sec;
    

    let resultat = (hrs <= 14) ? '<div style="color: #2ce614;">Норма временно отменена</div>' :
    // let resultat = (hrs <= 14) ? '<div style="color: red;">Нормы нет</div>' :
                   (hrs == 15 && min == 0 && sec == 0) ? '<div style="color: mediumorchid;">⭐️ 💎 ⭐️ Шедеврально! Ювелирно! Оргазм! ⭐️ 💎 ⭐️</div>' :
                   (hrs == 15 && min == 0 && sec <= 4) ? '<div style="color: mediumorchid;">Ну бл*... Почти ювелир💎</div>' :
                   (hrs < 20) ? '<div style="color: #2ce614;">Норма есть</div>' :
                   (hrs < 27) ? '<img src="images/star.png" width="50px" height="50px">' :
                   (hrs < 35) ? '<img src="images/star.png" width="50px" height="50px">&#8195<img src="images/star.png" width="50px" height="50px">' :
                   (hrs < 42) ? '<img src="images/star.png" width="50px" height="50px">&#8195<img src="images/star.png" width="50px" height="50px">&#8195<img src="images/star.png" width="50px" height="50px">' :
                   (hrs < 50) ? '<img src="images/star.png" width="50px" height="50px">&#8195<img src="images/star.png" width="50px" height="50px">&#8195<img src="images/star.png" width="50px" height="50px">&#8195<img src="images/star.png" width="50px" height="50px">' :
                   (hrs < 70) ? '<img src="images/star.png" width="50px" height="50px">&#8195<img src="images/star.png" width="50px" height="50px">&#8195<img src="images/star.png" width="50px" height="50px">&#8195<img src="images/star.png" width="50px" height="50px">&#8195<img src="images/star.png" width="50px" height="50px">' : 
                   (hrs < 90) ? '<img src="images/star.png" width="75px" height="75px">&#8195 &#8195 &#8195 &#8195 &#8195 &#8195 &#8195<img src="images/star.png" width="50px" height="50px">&#8195 &#8195 &#8195<img src="images/star.png" width="50px" height="50px">&#8195 &#8195 &#8195 &#8195 &#8195 &#8195 &#8195<img src="images/star.png" width="75px" height="75px"><div style="color: mediumorchid;">Ты человек или как?</div><img src="images/star.png" width="75px" height="75px">&#8195 &#8195 &#8195<img src="images/star.png" width="50px" height="50px">&#8195 &#8195<img src="images/star.png" width="50px" height="50px">&#8195 &#8195 &#8195<img src="images/star.png" width="75px" height="75px">' :
                   '<img src="images/star.png" width="75px" height="75px">&#8195 &#8195 &#8195 &#8195 &#8195 &#8195 &#8195<img src="images/star.png" width="50px" height="50px">&#8195 &#8195 &#8195<img src="images/star.png" width="50px" height="50px">&#8195 &#8195 &#8195 &#8195 &#8195 &#8195 &#8195<img src="images/star.png" width="75px" height="75px"><div style="color: red;">💎Ебать ты долбаёб, братишка, земля тебе пухом💎</div><img src="images/star.png" width="75px" height="75px">&#8195 &#8195 &#8195<img src="images/star.png" width="50px" height="50px">&#8195 &#8195<img src="images/star.png" width="50px" height="50px">&#8195 &#8195 &#8195<img src="images/star.png" width="75px" height="75px">';
    
    
    result.innerHTML = resultat;
    
};

var calculateProxy = function () { // Калькулятор времени для Прокси и Стажеров
    var str = document.getElementById('CopyTimeBox').value;
    //console.log(a);
    var t1 = [];
    var hrs = 0;
    var min = 0;
    var sec = 0;
    var arr = [];
    document.getElementById('hrs').innerHTML = hrs;
    document.getElementById("min").innerHTML = min;
    document.getElementById("sec").innerHTML = sec;
    if (str == 0) {alert("Поле для ввода времени пустое! \nВставьте свое время!")}
    t1 = str.match(/\|\|\| (\d\d:\d\d:\d\d)(?:\n|$)/g);
    //console.log(t1);
    t1.forEach(function(item, i, t1) {
        //console.log(item);
         arr = item.replace(/(\|\|\|\s)|\n/, "").split(":");
         //console.log(arr);
         hrs += parseInt(arr[0], 10);
         min += parseInt(arr[1], 10);
         sec += parseInt(arr[2], 10);
    });
    
    if (sec >= 3600) { hrs += Math.trunc(sec/3600); sec = sec % 3600 }
    if (sec >= 60) { min += Math.trunc(sec/60); sec = sec % 60 }
    if (min >= 60) { hrs += Math.trunc(min/60); min = min % 60 }

    // console.log(hrs);
    // console.log(min);
    // console.log(sec);

    let AdminTime = '';
    if (hrs < 13) {  // Норма отменена
        AdminTime = `<table id="table1">
                    <tr>
                        <td>
                            <p class="time">
                                <h1 class="d-inline-block .center-block">Часы: &#160</h1><h1 id="hrs" class="d-inline align-center"></h1>
                                <h2 class="d-inline-block">&#160 Минуты: &#160</h2><h1 id="min" class="d-inline"></h1>
                                <h2 class="d-inline-block">&#160 Секунды: &#160</h2><h1 id="sec" class="d-inline"></h1>
                            </p>
                        </td>
                    </tr>
                    </table>`;
        elem.style = "border: 4px solid #009200; background-color: lightgreen"};
    // if (hrs < 13 ) { // Нормы нет
    //     AdminTime = `<table id="table1">
    //                 <tr>
    //                     <td>
    //                         <p class="time">
    //                             <h1 class="d-inline-block .center-block">Часы: &#160</h1><h1 id="hrs" class="d-inline align-center"></h1>
    //                             <h2 class="d-inline-block">&#160 Минуты: &#160</h2><h1 id="min" class="d-inline"></h1>
    //                             <h2 class="d-inline-block">&#160 Секунды: &#160</h2><h1 id="sec" class="d-inline"></h1>
    //                         </p>
    //                     </td>
    //                 </tr>
    //                 </table>`;
    //     elem.style = "border: 4px solid red"};
    if (hrs >= 13) {  // Норма есть
        AdminTime = `<table id="table1">
                    <tr>
                        <td>
                            <p class="time">
                                <h1 class="d-inline-block .center-block">Часы: &#160</h1><h1 id="hrs" class="d-inline align-center"></h1>
                                <h2 class="d-inline-block">&#160 Минуты: &#160</h2><h1 id="min" class="d-inline"></h1>
                                <h2 class="d-inline-block">&#160 Секунды: &#160</h2><h1 id="sec" class="d-inline"></h1>
                            </p>
                        </td>
                    </tr>
                    </table>`;
        elem.style = "border: 4px solid #009200; background-color: lightgreen"};
    if (hrs == 13 && min == 0 && sec == 0) { // Ювелир
        AdminTime = `<table id="table1">
                    <tr>
                        <td>
                            <p class="time">
                                <h1 class="d-inline-block .center-block">Часы: &#160</h1><h1 id="hrs" class="d-inline align-center"></h1>
                                <h2 class="d-inline-block">&#160 Минуты: &#160</h2><h1 id="min" class="d-inline"></h1>
                                <h2 class="d-inline-block">&#160 Секунды: &#160</h2><h1 id="sec" class="d-inline"></h1>
                            </p>
                        </td>
                    </tr>
                    </table>`;
        elem.style = "border: 4px solid darkviolet; background-color: violet"}

    timer.innerHTML = AdminTime;


    document.getElementById('hrs').innerHTML = hrs;
    document.getElementById("min").innerHTML = min;
    document.getElementById("sec").innerHTML = sec;
    

    let resultat = (hrs <= 12) ? '<div style="color: #2ce614;">Норма временно отменена</div>' :
    // let resultat = (hrs <= 12) ? '<div style="color: red;">Нормы нет</div>' :
                   (hrs == 13 && min == 0 && sec == 0) ? '<div style="color: mediumorchid;">⭐️ 💎 ⭐️ Шедеврально! Ювелирно! Оргазм! ⭐️ 💎 ⭐️</div>' :
                   (hrs == 13 && min == 0 && sec <= 4) ? '<div style="color: mediumorchid;">Ну бл*... Почти ювелир💎</div>' :
                   (hrs < 20) ? '<div style="color: #2ce614;">Норма есть</div>' :
                   (hrs < 27) ? '<img src="images/star.png" width="50px" height="50px">' :
                   (hrs < 35) ? '<img src="images/star.png" width="50px" height="50px">&#8195<img src="images/star.png" width="50px" height="50px">' :
                   (hrs < 42) ? '<img src="images/star.png" width="50px" height="50px">&#8195<img src="images/star.png" width="50px" height="50px">&#8195<img src="images/star.png" width="50px" height="50px">' :
                   (hrs < 50) ? '<img src="images/star.png" width="50px" height="50px">&#8195<img src="images/star.png" width="50px" height="50px">&#8195<img src="images/star.png" width="50px" height="50px">&#8195<img src="images/star.png" width="50px" height="50px">' :
                   (hrs < 70) ? '<img src="images/star.png" width="50px" height="50px">&#8195<img src="images/star.png" width="50px" height="50px">&#8195<img src="images/star.png" width="50px" height="50px">&#8195<img src="images/star.png" width="50px" height="50px">&#8195<img src="images/star.png" width="50px" height="50px">' : 
                   (hrs < 90) ? '<img src="images/star.png" width="75px" height="75px">&#8195 &#8195 &#8195 &#8195 &#8195 &#8195 &#8195<img src="images/star.png" width="50px" height="50px">&#8195 &#8195 &#8195<img src="images/star.png" width="50px" height="50px">&#8195 &#8195 &#8195 &#8195 &#8195 &#8195 &#8195<img src="images/star.png" width="75px" height="75px"><div style="color: mediumorchid;">Ты человек или как?</div><img src="images/star.png" width="75px" height="75px">&#8195 &#8195 &#8195<img src="images/star.png" width="50px" height="50px">&#8195 &#8195<img src="images/star.png" width="50px" height="50px">&#8195 &#8195 &#8195<img src="images/star.png" width="75px" height="75px">' :
                   '<img src="images/star.png" width="75px" height="75px">&#8195 &#8195 &#8195 &#8195 &#8195 &#8195 &#8195<img src="images/star.png" width="50px" height="50px">&#8195 &#8195 &#8195<img src="images/star.png" width="50px" height="50px">&#8195 &#8195 &#8195 &#8195 &#8195 &#8195 &#8195<img src="images/star.png" width="75px" height="75px"><div style="color: red;">💎Ебать ты долбаёб, братишка, земля тебе пухом💎</div><img src="images/star.png" width="75px" height="75px">&#8195 &#8195 &#8195<img src="images/star.png" width="50px" height="50px">&#8195 &#8195<img src="images/star.png" width="50px" height="50px">&#8195 &#8195 &#8195<img src="images/star.png" width="75px" height="75px">';
    
    
    result.innerHTML = resultat;
};


function resetValue(elem) { // Очистка элемента
        elem = document.getElementById(elem);
        elem.rows = "2";
        elem.style = "border: 3px solid orange; background-color: lightgoldenrodyellow;"
        elem.value = "";
}
function hide(elem) {
           one = document.getElementById(elem);
           one.style.display = "none";
}
function show(elem) {
           two = document.getElementById(elem);
           two.style.display = "block";
}
function showHide(element_id) {
           if (document.getElementById(element_id)) { 
               var obj = document.getElementById(element_id); 
               if (obj.style.display != "flex") { 
                   obj.style.display = "flex"; //Показываем элемент
               }
               else obj.style.display = "none"; //Скрываем элемент
           }
           else alert("Элемент с id: " + element_id + " не найден!"); 
}

