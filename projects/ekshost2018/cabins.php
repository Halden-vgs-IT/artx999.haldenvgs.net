<?php
$root = "";
require $root . "structure/head.php";
echo "<script>giveTitle('Hytter')</script>";
require $root . "structure/nav.php";
?>
<body>
<main>
    <div id="container1">
        <select id="select">
            <option value="all" selected>Alle</option>
            <option value="Jul">Jul</option>
            <option value="Vinterferie">Vinterferie</option>
            <option value="Påske">Påske</option>
        </select>
        <div id="grantoppen" class="available"></div>
        <div id="granbo" class="available"></div>
        <div id="granstua" class="available"></div>
        <div id="granhaug" class="available"></div>
        <img src="images/menybilde.jpg" alt="Menybilde">
    </div>
    <div id="container2">
        <i id="back" class="uil uil-multiply"></i>
        <h1 id="cabin"></h1>
        <div id="slideshow-container"></div>
        <p id="beds"></p>
        <p id="standard"></p>
        <p id="sauna"></p>
        <button id="book"></button>
    </div>
    <div id="container3">
        <i id="back2" class="uil uil-multiply"></i>
        <h1 id="cabin2"></h1>
        <table id="bookingTable">
            <tr id="holidays">
                <th>Jul</th>
                <th>Vinterferie</th>
                <th>Påske</th>
            </tr>
            <tr id="status">
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </table>
        <p id="info"></p>
        <button id="book2">Book</button>
    </div>
</main>
<div id="video-container">
    <video controls>
        <source type="video/mp4" src="hyttefelt.mp4">
    </video>
</div>
</body>