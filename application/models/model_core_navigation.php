<?php

/**
* @Entity @HasLifecycleCallbacks
* @Table(name="core_navigation")
*/class Model_core_navigation {
 
   /**
    * @Id
    * @Column(type="integer", nullable=false)
    * @GeneratedValue(strategy="AUTO")
    */
    public $id;

    /**
     * @Column(type="integer", nullable=true)
     */
    public $parent_id;


  /**
    * @Column(name="`order`", type="integer", nullable=false)
    */
    public $order;

    /**
     * @Column(type="string", length=512, nullable=true)
     */
    public $name;


    /**
     * @Column(type="string", length=512, nullable=true)
     */
    public $type;

    /**
     * @Column(type="string", length=512, nullable=true)
     */
    public $controller;

    /**
     * @Column(type="string", length=512, nullable=true)
     */
    public $model;
}

?>