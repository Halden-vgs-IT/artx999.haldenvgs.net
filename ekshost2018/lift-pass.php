<?php
$root = "";
require $root . "structure/head.php";
echo "<script>giveTitle('Heiskort')</script>";
require $root . "structure/nav.php";
?>
<body>
<h1>Bestill heiskort for en person:</h1>
<label for="age">Hvor gammel er du?</label><br/>
<input name="age" id="age" type="number" max="100" min="0"><p id="ageInfo"></p><br/>
<label for="days">Hvor mange dager skal du stå på ski?</label><br/>
<input name="days" id="days" type="number" max="7" min="1">
<p id="priceOut"></p>
<p id="discount"></p>
</body>