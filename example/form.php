<?php
if (isset($_POST['name'])) {
	$data = array();
	foreach ($_POST as $key => $value) {
		$data[$key] = $value;
	}
	echo json_encode($data);
	exit();
}

if (isset($_GET['name'])) {
	$data = array();
	foreach ($_GET as $key => $value) {
		$data[$key] = $value;
	}
	echo json_encode($data);
	exit();
}
