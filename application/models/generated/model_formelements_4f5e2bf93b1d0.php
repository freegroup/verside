<?php
/**
* @Entity @HasLifecycleCallbacks
* @Table(name="core_formelement")
*/
class Model_formelements_4f5e2bf93b1d0  {
 
   /**
    * @Id
    * @Column(name="`id`", type="integer", nullable=false)
    * @GeneratedValue(strategy="AUTO")
    */
    public $id;

   /**
    * @Column(name="`css`", type="string", length=400, nullable=true)
    */
    public $css;

   /**
    * @Column(name="`tag`", type="string", length=50, nullable=true)
    */
    public $tag;

   /**
    * @Column(name="`parent_id`", type="integer", nullable=true)
    */
    public $parent_id;

   /**
    * @Column(name="`innerHTML`", type="text", nullable=true)
    */
    public $innerHTML;

   /**
    * @Column(name="`model_class`", type="string", length=400, nullable=true)
    */
    public $model_class;

   /**
    * @Column(name="`column`", type="string", length=200, nullable=true)
    */
    public $column;

   /**
    * @Column(name="`extra_attributes`", type="string", length=400, nullable=true)
    */
    public $extra_attributes;

   /**
    * @Column(name="`type`", type="string", length=50, nullable=true)
    */
    public $type;

    public function getIdFieldName(){ return 'id';}

    public function getRepresentativeFieldName(){ return 'id';}

    public function getTableName(){ return 'core_formelement';}

} //end class


?>