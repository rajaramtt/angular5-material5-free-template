<?php 
include_once "headers.php";

$myObj = (object)[];

$myObj->status = "success";
$myObj->msg = "Settings Updated Successfully";
$myJSON = json_encode($myObj);
echo $myJSON;

?>