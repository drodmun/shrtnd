<?php 
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: POST,GET');
  header('Access-Control-Allow-Headers: Content-Type, Authorization');
?>

<?php

	$return = array(
		'errors' => array(),
		'value'  => ''
	);

	# Access data
	$db_server 	 = '';
	$db_user 	 = '';
	$db_passwort = '';
	$db_name 	 = '';

	# Connection establishment
	if(mysql_connect($db_server, $db_user, $db_passwort)) {
		// echo 'Server connection successful, select database...';

		if(mysql_select_db($db_name)) {
			// echo 'Server connection successful, select database ...';

			$url	= mysql_real_escape_string($_REQUEST['url']); 
			$id		= rand(10000,99999);
			$key 	= base_convert($id, 20, 36);
			$sql 	= "INSERT INTO SHRTND_URL VALUES('$id','$url','$key', NOW())";
			
			mysql_query($sql, $con);
			mysql_close($con);

			$return['value'] = $key;
		} else {
			array_push($return['errors'],'The specified database could not be selected, please check the information you have entered!');
		}
	} else {
		array_push($return['errors'],'Connection not possible, please check data! MYSQL-error: '.mysql_error());
	}

	header('Content-type: application/json');
	echo json_encode($return);
?>