<?php
/**
* @Entity @HasLifecycleCallbacks
* @Table(name="user")
*/
class Model_user  {
 
   /**
    * @Id
    * @Column(name="`id`", type="integer", nullable=false)
    * @GeneratedValue(strategy="AUTO")
    */
    public $id;
	
   /**
    * @Column(name="`username`", type="string", length=255, nullable=false)
    */
    public $username;
	
   /**
    * @Column(name="`password`", type="string", length=60, nullable=false)
    */
    public $password;

} //end class


?>