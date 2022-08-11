<?php
require("phpMQTT.php"); 

$host   = "***.cloudmqtt.com"; 
$port     = 80;
$username = "";
$password = "";

$mqtt = new bluerhinos\phpMQTT($host, $port, "ClientID".rand());

if(!$mqtt->connect(true,NULL,$username,$password)){
  exit(1);
}

//currently subscribed topics
$topics['topic'] = array("qos"=>0, "function"=>"procmsg");
$mqtt->subscribe($topics,0);

while($mqtt->proc()){
}

$mqtt->close();
function procmsg($topic,$msg){
  echo "Msg Recieved: $msg";
}