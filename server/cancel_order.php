<?php 
include_once "headers.php";
$myObj = (object)[];

$myObj->status = "success";
$myObj->msg = "Order Canceled  Successfully";
$myJSON = json_encode($myObj);
echo $myJSON;

?>