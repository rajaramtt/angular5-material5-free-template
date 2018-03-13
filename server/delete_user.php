<?php 
include_once "headers.php";
$myObj = (object)[];

$myObj->status = "success";
$myObj->msg = "User Deleted Successfully";
$myJSON = json_encode($myObj);
echo $myJSON;

?>