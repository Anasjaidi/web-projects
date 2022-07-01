var	pt = document.getElementById("pt");

var t, h , m , s, str, tt;

function putdate()
{
	t = new Date();
	h = t.getHours();
	m = t.getMinutes();
	s = t.getSeconds();
	str = h >= 12 ? 'PM' : 'AM';
	h %= 12;
	pt.innerHTML = checkTime(h) + ":" + checkTime(m) + ":" + checkTime(s) + " " + str;
	timer();
}

function checkTime(i) {
	if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
	return i;
}

function timer()
{
	tt = setTimeout(putdate, 1000);
}

timer();