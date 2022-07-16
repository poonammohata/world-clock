const countryDetails = [
    {
        name : "Seattle",
        timezone: '-7.0'
    },
    {
        name : "India",
        timezone: '+5.5'
    },
    {
        name : "London",
        timezone: '+1.0'
    },
    {
        name : "Toronto",
        timezone: '-4.0'
    },
    {
        name : "Frankfurt",
        timezone: '+2.0'
    },
    {
        name : "UTC",
        timezone: '+0.0'
    },
    {
        name : "Maldives",
        timezone: '+5.0'
    },
    {
        name: "Australia",
        timezone: '+8.0'
    }
]

// 9pm - 5am => Black 21 to 24 0 to 5
// 5am - 9am => Yellow - 5 to 9
// 9am - 5pm => Green - 9 to 17
// 5pm - 9pm => Yellow - 17 to 21

function colorFunc(hour, minutes) {
    if (hour>=5 && hour < 9) {
        color = 'orange'
    } else if (hour >= 9 && hour < 17) {
        color = 'green'
    } else if (hour >= 17 && hour < 21) {
        color = 'orange'
    } else {
        color = 'black'
    }
    return color;
}

function calcTime(offset) {
    d = new Date();
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    nd = new Date(utc + (3600000*offset));
    var hours = nd.getHours();
    var minutes = nd.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    const margin = (((hours + minutes / 60) / 24) * 100 - 20);
    const barColor = colorFunc(hours, minutes);
    hours = nd.getHours() % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;

    if (hours < 10) {
        hours = "0" + hours;
   }
  if (margin < 0) {
    margin+=100;
  }

    const time = {
        hours: hours,
        minutes: minutes,
        meridian: ampm,
        color: barColor, 
        margin: margin
    }
     return time;

}

function countryContainer(name,timezone, amPm, barColor, marginLeft) {
    const countryContainer = document.createElement('div');
    const country = document.createElement('div');
    const countryBar = document.createElement('div');
    const countryName = document.createElement('span');
    const countryTime = document.createElement('span');
    const timeBlock = document.createElement('div');
    const time = document.createElement('div');
    const meridian = document.createElement('span');
    countryBar.style.backgroundColor = barColor;
    country.append(countryBar);
    country.append(countryName);
    countryName.append(name);
    timeBlock.append(time);
    time.append(countryTime);
    time.append(meridian);
    countryTime.append(timezone);
    meridian.append(amPm);
    countryContainer.append(country);
    countryContainer.append(timeBlock);
    countryContainer.className = 'country-container'
    country.className = 'country';
    countryBar.className = 'country-bar';
    countryName.className = 'country-info';
    timeBlock.className = 'time-block';
    time.className = 'time';
    meridian.className = 'time-meridian';
    countryTime.className = 'country-info'
 
    const timeBar = document.createElement('div');
    const timeBarBlock = document.createElement('div');
    const verticalLine = document.createElement('div');
    timeBlock.append(timeBar);
    timeBar.append(timeBarBlock);
    timeBar.append(verticalLine);
    timeBar.className = 'time-bar';
    timeBarBlock.className = 'time-bar-block';
    const timeBarBlock2 = document.createElement('div');
    timeBarBlock2.className = 'time-bar-block-two';
    timeBar.append(timeBarBlock2);
    timeBarBlock.style.marginLeft = '-'+ marginLeft + '%';
    verticalLine.className = 'vertical-line';
    const barClasses = ['bar-1','bar-2','bar-3','bar-4','bar-5'];
    const barClassesTwo = ['bar-1','bar-2','bar-3','bar-4','bar-5'];
    barClasses.forEach(bar=>{
        const b1 = document.createElement('div');
        b1.className = bar;
        timeBarBlock.append(b1);
    });
    barClassesTwo.forEach(bar=>{
        const b1 = document.createElement('div');
        b1.className = bar;
        timeBarBlock2.append(b1);
    });
    return countryContainer;
}

const mainContainer = document.getElementById('main-container');

countryDetails.forEach(country=> {
    const time = calcTime(country.timezone);
    const timeFormat = `${time.hours}:${time.minutes}`;
    const countryBlock = countryContainer(country.name, timeFormat, time.meridian, time.color, time.margin);
    mainContainer.append(countryBlock);
    
})



