//получаем доступ к местам
const casino = document.getElementById('casino');
const construction = document.getElementById('construction');
const bar = document.getElementById('bar');
const forest = document.getElementById('forest');

//получаем доступ к действиям
const actionLog =  document.getElementById('actionDescription');
const rolletRed = document.getElementById('rolletRed');
const rolletBlack = document.getElementById('rolletBlack');
const hit = document.getElementById('hit');
const leave = document.getElementById('leave');
const work = document.getElementById('work');
const steal = document.getElementById('steal');
const smoke = document.getElementById('smoke');
const noSmoke = document.getElementById('noSmoke');
const edge = document.getElementById('edge');
const trail = document.getElementById('trail');

//магазин
const buttonForShop = document.getElementById('buttonForShop');
const shop = document.getElementById('shop');

//получаем статы и превращаем их в цифры
const hunger = document.getElementById('hunger');
let hungerNumb = parseInt(hunger.textContent);

const health = document.getElementById('health');
let healthNumb = parseInt(health.textContent);

const reputation = document.getElementById('reputation');
let reputationNumb = parseInt(reputation.textContent);

const money = document.getElementById('money');
let moneyNumb = parseInt(money.textContent);

//начало
const begining =  document.getElementById('begining');
const startButton =  document.getElementById('startButton');
const mainBlock =  document.getElementById('mainBlock');
startButton.addEventListener('click', () => {
  begining.classList.add('hidden');
  mainBlock.classList.remove('hidden');
});

//функция принудительной перезагрузки
function reloadWithReason(reasonCode) {
  localStorage.setItem('reloadReason', reasonCode);
  location.reload();
}

//кнопка для перезагрузки
const deadToggle = document.getElementById('deadToggle');
const deadWindow = document.getElementById('deadWindow');
const heandRestart = document.getElementById('heandRestart');

deadToggle.addEventListener('click', () => {
  deadWindow.classList.toggle('hidden');
});
heandRestart.addEventListener('click', () => {
  reloadWithReason('handDeath');
});



//конец игры и причины конца
window.addEventListener('DOMContentLoaded', () => {
  const firstText =  document.getElementById('firstText');
  const reason = localStorage.getItem('reloadReason');
  if (reason) {
    switch (reason) {
      case 'hungerDeath':
        firstText.textContent = 'Голодно и холодно стало( Попробуй ещё раз';
        break;
      case 'healthDeath':
        firstText.textContent = 'Здоровье беречь нужно, начнём заново?';
        break;
      case 'reputationDeath':
        firstText.textContent = 'Подпорчена репутация конечно у тебя была, но ничего, можно начать заново';
        break;
      case 'moneyDeath':
        firstText.textContent = 'Денег нет - но вы держитесь, к сожалению, тут не работает, нужно попробовать за ними внимательнее следить, попробуешь ещё?';
        break;
      case 'handDeath':
        firstText.textContent = 'Суицид - это не выход:D Ещё попробуешь?';
        break;
      default:
        firstText.textContent = 'Вижу, что не первый раз играешь, ты там будь поосторожнее, хорошо?)';
    }
  localStorage.removeItem('reloadReason');
  } else {
    firstText.innerHTML = 'Привет, ты только вышел вышел из тюряги и нужно как-то жить дальше. Из хорошего - у тебя осталась квартирка, но район такой себе, с повышенной преступностью. Нет времени объяснять, тут разобраться не сложно. Всё, что тебе нужно знать: <br> <br> 1. Каждый поход в одно из четырёх мест уменьшает сытость на 1. <br> <br>2. Как только любая из характеристик станет равна нулю - игра закончится. <br> <br>Удачи!'
  };
});

//функция проверки статов на ноль
function checkStatsAndEndGameIfNeed() {
  if (hungerNumb <= 0) return reloadWithReason('hungerDeath');
  if (healthNumb <= 0) return reloadWithReason('healthDeath');
  if (reputationNumb <= 0) return reloadWithReason('reputationDeath');
  if (moneyNumb <= 0) return reloadWithReason('moneyDeath');
}

//функция для изменения статов 
function changeStat(changes) {
  if (changes.hunger !== undefined) {
    hungerNumb += changes.hunger;
    hunger.textContent = hungerNumb;
  }

  if (changes.health !== undefined) {
    healthNumb += changes.health;
    health.textContent = healthNumb;
  }

  if (changes.reputation !== undefined) {
    reputationNumb += changes.reputation;
    reputation.textContent = reputationNumb;
  }

  if (changes.money !== undefined) {
    moneyNumb += changes.money;
    money.textContent = moneyNumb;
  }

  checkStatsAndEndGameIfNeed();
}

//функция для отключения кнопок с местом, что б их нельзя было тыкнуть пока не сделаешь выбор
function disablingButtons() {
  casino.disabled = true
  construction.disabled = true
  bar.disabled = true
  forest.disabled = true
}

//функция для включения кнопок что б можно было пойти
function turningOnButtons() {
  casino.disabled = false
  construction.disabled = false
  bar.disabled = false
  forest.disabled = false
}

//функция для добавления текста вниз в журнал
function addText(message) {
  const newText = document.createElement('p');
  newText.textContent = message;
  actionLog.appendChild(newText);
  actionLog.scrollTop = actionLog.scrollHeight;
}

//удаление hidden в кнопках действий
function removeClasslistHidden(firstButton, secondButton) {
  firstButton.classList.remove('hidden');
  secondButton.classList.remove('hidden');
}

//добавление hidden к кнопкам действий
function addClasslistHidden(firstButton, secondButton) {
  firstButton.classList.add('hidden');
  secondButton.classList.add('hidden');
  turningOnButtons();
}

//функция для каждого из пяти действий с вероятностью появления злодеев
function actionWithRandom(specialAction) {
  disablingButtons();

  if (Math.random() < 0.8) {
    specialAction();
  } else {
    addText('Упс, по пути на тебя нападает парочка гопников и в тебя летит мощный хук справа. Ударить в ответ или уйти?');
    removeClasslistHidden(hit, leave);
  }

  changeStat({ hunger: -1 });
}

//тут удар
hit.addEventListener('click', () => {
  if (Math.random() < 0.6) {
    addText('Нарываться не хорошо, -5 здоровья, -2 репутации');
    changeStat({ health: -5, reputation: -2 });
  } else {
    addText('Тебе повезло, попались слабаки. От удара твоё здоровье не восстановить, -2 здоровья, но + 5 к репутации заслуженно');
    changeStat({ health: -2, reputation: 5 });
  }
  addClasslistHidden(hit, leave);
});


//тут уйти
leave.addEventListener('click', () => {
  if (Math.random() < 0.95) {
    addText('Ты уходишь, получив минимальные потери. -2 здоровья и -1 репутация');
    changeStat({ health: -2, reputation: -1 })
  } else {
    addText('Тебя догнали и ещё украли денех, не мы такие - жизнь такая. Итого: -2 здоровья и -5$');
    changeStat({ health: -2, money: -5 })
  }
  addClasslistHidden(hit, leave);
});


// казино
casino.addEventListener('click', () => {
  actionWithRandom(() => {
    addText('Стандартный турецкий казик. Лудомания - зло, да и денег у тебя маловато - доступна только рулетка, обычно минимальные ставки на цвет выше, но для тебя исключение. Красный или чёрный?');
    removeClasslistHidden(rolletRed, rolletBlack);
  });
});

//для красного и чёрного
function colorClick() {
  if (Math.random() < 0.5) {
    addText('Повезло, держи денюжку, +1$');
    changeStat({ money: 1 });
  } else {
    addText('Повезёт в любви, -1$');
    changeStat({ money: -1 });
  }
  addClasslistHidden(rolletRed, rolletBlack);
};

rolletRed.addEventListener('click', colorClick);
rolletBlack.addEventListener('click', colorClick);

// стройка
construction.addEventListener('click', () => {
  actionWithRandom(() => {
    addText('Ты пришёл поработать на стройку, уважаемо. Можно конечно не надрывать спину и получить лёгкие деньги, но спалить могут...');
    removeClasslistHidden(work, steal);
  });
});

//тут работать
work.addEventListener('click', () => {
  addText('Ты молодец, не вставать на те же грабли - это похвально, репутация +1, вот твоя зп за сегодня +5$, но после ношения на своём горбу тяжёлых блоков - спина побаливает. -1 здоровья');
  changeStat({ reputation: 1, money: 5, health: -1, });
  addClasslistHidden(work, steal);
});

//тут украсть
steal.addEventListener('click', () => {
  if (Math.random() < 0.6) {
    addText('Повезло, повезло. Ты крадёшь медь, продаёшь её и получаешь деньги. +5$');
    changeStat({ money: 5 });
  } else {
    addText('Как только ты собираешься уходить с мотком меди - тебя палят и наказывают. -5 здоровья и -3 репутации');
    changeStat({ health: -5, reputation: -3 });
  }
  addClasslistHidden(work, steal);
});

// бар
bar.addEventListener('click', () => {
  actionWithRandom(() => {
    addText('Обычный недорогой бар, стаканчик пенного ты берёшь на автомате, оно тут, кстати, дешевле, чем в магазине(но в чём подвох?), тут пахнет алкоголем и сушёной рыбкой, кто-то зажимается с красотками, кто-то проводит время в объятиях унитаза, по телевизору показывают футбольный матч. Незнакомец предлагает тебе курнуть, или можешь допить своё пиво и уйти. Что делаешь?');
    changeStat({ money: -2 });
    removeClasslistHidden(smoke, noSmoke);
  });
});

//тут курить
smoke.addEventListener('click', () => {
  addText('Ты попадаешь под влияние незнакомца, расслабляешься по полной. +2 здоровья, -2 сытости');
  changeStat({ health: 2, hunger: -2 });
  addClasslistHidden(smoke, noSmoke);
});

//тут не курить 
noSmoke.addEventListener('click', () => {
  addText('Правильный выбор, пивко каллорийное, но не такое, как в магазине, поэтому держи +2 к сытости');
  changeStat({ hunger: 2 });
  addClasslistHidden(smoke, noSmoke);
});

// лес
forest.addEventListener('click', () => {
  actionWithRandom(() => {
    addText('Весенний лес, весенний лес ... (кто шарит, тот молодец). В лесу есть два вида грибов, на опушке один, на тропинке другой, что выберешь?');
    removeClasslistHidden(edge, trail);
  });
});

//функия для действий в лесу
function actionInForest() {
  if (Math.random() < 0.5) {
    addText('Лес - это единственное место, где у тебя выбор без выбора, шанс 50/50)) Ты находишь волшебные грибочки. Они добавляют к сытости +1, но на здоровье влияют, здоровье -2');
    changeStat({ hunger: 1, health: -2 });

  } else {
    addText('Лес - это единственное место, где у тебя выбор без выбора, шанс 50/50)) Опята попадаются тебе на пути. Сытость +2');
    changeStat({ hunger: 2 });
  };
  addClasslistHidden(edge, trail);
};

edge.addEventListener('click', actionInForest);
trail.addEventListener('click', actionInForest);

//функция покупки в магазине
function byInShop() {
  const value = Number(shop.value);

  switch (value) {
  case 1:
    if (moneyNumb <= 2) {
      addText('Бабок в обрез');
    } else {
      addText('Не очень свежий хлебушек, но червячка замарить пойдёт, +2 к сытости');
      changeStat({ hunger: 2, money: -2 });
    }
    break;
  case 2:
    if (moneyNumb <= 5) {
      addText('Сухо по бабкам');
    } else {
      addText('Картофель нынче дорогой, да, голод утоляет хорошо, +5 к сытости');
      changeStat({ hunger: 5, money: -5 });
    }
    break;
  case 3:
    if (moneyNumb <= 6) {
      addText('Монеты нет');
    } else {
      addText('А пилюля не простая, а пилюля золотая, и здоровье +2 восстанавливет, и сытость добавляет +3 ');
      changeStat({ health: 2, hunger: 3, money: -6 });
    }
    break;
  case 4:
    if (moneyNumb <= 3) {
      addText('Пусто в кармане');
    } else {
      addText('Дороже, чем на баре, но и к сытости +3');
      changeStat({ hunger: 3, money: -3 });
    }
    break;
  case 5:
    if (moneyNumb <= 8) {
      addText('На мели');
    } else {
      addText('Раз можешь позволить такое купить, то и репутацию держи +1, каллорийность данного напитка прибавляет сытость +4, но ухудшает здоровье -2, у нас тут настоящая жизнь, а не сказки какие-то');
      changeStat({ reputation: 1, health: -2, hunger: 4, money: -8 });
    }
    break;
  default:
    addText('Что-то не то ввёл, нужна цифра от 1 до 5, попробуй по-другому');
}
};

buttonForShop.addEventListener('click', byInShop);

shop.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      byInShop();
    }
});