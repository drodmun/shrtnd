<?php 
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: POST, GET');
  header('Access-Control-Allow-Headers: Content-Type, Authorization');
?>

<?php
  $return = array('errors' => array(), 'value' => '' );

	# Access data
	$db_server 	 = '';
	$db_user 	 = '';
	$db_passwort = '';
	$db_name 	 = '';

	# Connection establishment
	if(mysql_connect($db_server, $db_user, $db_password)) {
		// echo 'Server connection successful, select database...';

		if(mysql_select_db($db_name)) {
			// echo 'Server connection successful, select database ...';
  
      $key= mysql_real_escape_string($_REQUEST["key"]);
    
      $sql = 'SELECT * FROM SHRTND_URL WHERE UNIQUE_KEY = "$key"';
    
      $result = mysql_query($sql);
    
      while($row = mysql_fetch_array($result)) {
        $res = $row['url'];
        header("location:".$res);
      }

			mysql_close($con);
		} else {
			array_push($return['errors'],'The specified database could not be selected, please check the information you have entered!');
		}
	} else {
		array_push($return['errors'],'Connection not possible, please check data! MYSQL-error: '.mysql_error());
	}
	
	header('Content-type: application/json');
	echo json_encode($return);
?>