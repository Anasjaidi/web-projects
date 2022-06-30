var	pT = document.getElementsByClassName("pageTime")[0];
var strt = document.getElementById("strt");
var stp = document.getElementById("stp");
var rst = document.getElementById("rst");
var h = 0, m = 0, s = 0, ms = 0;
var rt;

function add(){
	ms++;
	if (ms == 60)
	{
		ms = 0;
		s++;
		if (s == 60)
		{
			s = 0;
			m++;
			if (m == 60)
			{
				m = 0;
				h++;
			}
		}
	}
}

function getH(n)
{
	if (n < 10)
		return "0" + n;
	else
		return n;
}

function	putTime()
{
	add();
	pT.textContent = getH(h) +  ":" + getH(m) +  ":" + getH(s) +  ":" + getH(ms);
	timer();
}

function	timer()
{
	rt = setTimeout(putTime, 1000 / 60);
}

function stop()
{
	clearTimeout(rt);
}

function resete()
{
	stop();
	pT.innerHTML = "00:00:00:00";
	h = m = s = ms = 0;
}

strt.addEventListener("click", timer);
stp.addEventListener("click", stop);
rst.addEventListener("click", resete);
