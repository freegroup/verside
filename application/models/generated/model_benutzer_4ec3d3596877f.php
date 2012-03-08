<?php
/**
* @Entity @HasLifecycleCallbacks
* @Table(name="users")
*/
class Model_benutzer_4ec3d3596877f  {
 
   /**
    * @Id
    * @Column(name="`id`", type="integer", nullable=false)
    * @GeneratedValue(strategy="AUTO")
    */
    public $id;

   /**
    * @Column(name="`name`", type="string", length=100, nullable=false)
    */
    public $name;

   /**
    * @Column(name="`email`", type="string", length=200, nullable=false)
    */
    public $email;

    public function getIdFieldName(){ return 'id';}

    public function getRepresentativeFieldName(){ return 'name';}

    public function getTableName(){ return 'users';}

} //end class


?>