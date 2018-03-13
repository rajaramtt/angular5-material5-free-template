<?php 
include_once "headers.php";

$myObj = (object)[];

$myObj->status = "success";
$myObj->email = "raja@test.com";
$myObj->name = "raja";
$myObj->id = 1;
$myObj->token = "123456789";
$myJSON = json_encode($myObj);
echo $myJSON;

?>