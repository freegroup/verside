<?php
//define('PHPASS_HASH_STRENGTH', 8);
//define('PHPASS_HASH_PORTABLE', false);

class Controller_core_secure extends CI_Controller {
 
    public $emExternal;
    public $emInternal;
  
   public function __construct() {
		parent::__construct();
		$this->emExternal = $this->doctrine->emExternal;
		$this->emInternal = $this->doctrine->emInternal;
		$this->load->model("Model_user");

        $this->load->library('SimpleLoginSecure');
	}


	public function isLoggedIn(){
		//Check if already logged in
		if($this->session->userdata('logged_in') == true){
			return true;
		}
		return false;
	}
	
	public function createInitialUser($username , $password) {
		
		$qb = $this->emInternal->createQueryBuilder();
        $qb->select('count(u.id)')
           ->from("Model_user", 'u');
		$count = $qb->getQuery()->getSingleScalarResult();
        
        if($count >0){
        	echo "Default user already exists. It is not possible to create an aditional account.";
        	return;
        }

	    try {
           //Hash user_pass using phpass
		   $hasher = new PasswordHash(PHPASS_HASH_STRENGTH, PHPASS_HASH_PORTABLE);
		   $user_pass_hashed = $hasher->HashPassword($password);

           $obj = new Model_user();
           $obj->username = $username;
           $obj->password = $user_pass_hashed;
           $this->emInternal->persist($obj);
           $this->emInternal->flush();
		  
           echo 'Account created successfully!';
		}
		catch(Exception $ex){
		    echo 'Exception abgefangen: ',  $ex->getMessage(), "\n";
        }
    }
    
	/**
	 * Login and sets session variables
	 *
	 * @access	public
	 * @param	string
	 * @param	string
	 * @return	bool
	 */
	public function login($username = '', $password = '') 
	{
		if($username == '' OR $password == ''){
			return false;
		}

		//Check if already logged in
		if($this->session->userdata('username') == $username){
			return true;
		}
		
		$qb = $this->emInternal->createQueryBuilder();
        $qb->select('u')
           ->from("Model_user", 'u')
           ->where('u.username = :username')
           ->setParameter('username', $username);
           
		$account = $qb->getQuery()->getSingleResult();

		
		if ($account) 
		{
			$hasher = new PasswordHash(PHPASS_HASH_STRENGTH, PHPASS_HASH_PORTABLE);

			if(!$hasher->CheckPassword($password, $account->password)){
				return false;
			}

			//Destroy old session
			$this->session->sess_destroy();
			
			//Create a fresh, brand new session
			$this->session->sess_create();

			//Set session data
			unset($account->password);
			$user_data['username'] = $account->username;
			$user_data['logged_in'] = true;
			$this->session->set_userdata($user_data);
			return true;
		} 
		return false;

	}


	/**
	 * Logout user
	 *
	 * @access	public
	 * @return	void
	 */
	function logout() {
		$this->session->sess_destroy();
	}

} //end class

?>