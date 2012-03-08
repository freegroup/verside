<?php
/**
 * http://codeigniter.com/user_guide/libraries/file_uploading.html
 */
class Controller_upload extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		$this->load->helper(array('form', 'url'));
	}

	function index()
	{
	    var_dump($_POST);  
	
		$config['upload_path'] = './uploads/';
		$config['allowed_types'] = 'png';
		$config['max_size']	= '100';
		$config['max_width']  = '1024';
		$config['max_height']  = '768';

		$this->load->library('upload', $config);

		if ( ! $this->upload->do_upload("userfile"))
		{
			echo $this->upload->display_errors();
		}
		else
		{
			$data = array('upload_data' => $this->upload->data());

			foreach ($data as $item => $value){
                 echo $item." =>". $value."\n";
            }
			echo "success";
		}
	}
}
?>


